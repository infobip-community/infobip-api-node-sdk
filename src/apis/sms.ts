import { Http } from '../utils/http';
import { InfobipAuth } from '../utils/auth';
import { validateSMSMessage } from '../utils/validators/sms';
import { validateSmsV3SendRequest, validateSmsReportsQuery, validateSmsLogsQuery } from '../utils/validators/sms-v3';
import { SendSmsV3Request, SendSmsV3Response, SmsReportsQuery, SmsLogsQuery } from '../types/sms';
import { createSmsErrorFromResponse, SmsError, SmsApiError } from '../errors/sms-errors';

import { Validator } from '../utils/validator';

const sendEndpoints: any = {
  text: '/sms/2/text/advanced', // DEPRECATED - Use v3 unified endpoint
  binary: '/sms/2/binary/advanced', // DEPRECATED - Use v3 unified endpoint
  query: '/sms/1/text/query', // DEPRECATED - Use v3 query endpoint
};

// v3 API endpoints (current/recommended)
const v3Endpoints = {
  messages: '/sms/3/messages', // Unified endpoint for text and binary messages
  query: '/sms/3/text/query',
  reports: '/sms/3/reports',
  logs: '/sms/3/logs',
};

const endpoints: any = {
  preview: '/sms/1/preview',
  get: '/sms/1/inbox/reports',
  reports: '/sms/1/reports', // DEPRECATED - Use v3 reports endpoint
  logs: '/sms/1/logs', // DEPRECATED - Use v3 logs endpoint
  schedule: '/sms/1/bulks',
  status: '/sms/1/bulks/status',
};

class SMS {
  http: Http;
  username?: string;
  password?: string;
  reports: any;
  logs: any;
  scheduled: any;
  status: any;
  // v3 API methods (recommended)
  v3: {
    send: (request: SendSmsV3Request) => Promise<SendSmsV3Response>;
    sendQuery: (query: any) => Promise<any>;
    getReports: (query?: SmsReportsQuery) => Promise<any>;
    getLogs: (query?: SmsLogsQuery) => Promise<any>;
  };
  // Bulk operations
  bulk: {
    cancel: (bulkId: string) => Promise<any>;
    getStatus: (bulkIds: string[]) => Promise<any>;
  };

  constructor(credentials: InfobipAuth) {
    this.http = new Http(credentials.baseUrl, credentials.authorization);
    this.username = credentials.username;
    this.password = credentials.password;

    // Legacy API methods (deprecated but maintained for backward compatibility)
    this.reports = {
      get: this.getDeliveryReports.bind(this),
    };
    this.logs = {
      get: this.getMessageLogs.bind(this),
    };
    this.scheduled = {
      get: this.getScheduledMessage.bind(this),
      reschedule: this.rescheduleMessage.bind(this),
    };
    this.status = {
      get: this.getMessageStatus.bind(this),
      update: this.updateMessageStatus.bind(this),
    };

    // v3 API methods (current/recommended)
    this.v3 = {
      send: this.sendV3.bind(this),
      sendQuery: this.sendQueryV3.bind(this),
      getReports: this.getDeliveryReportsV3.bind(this),
      getLogs: this.getMessageLogsV3.bind(this),
    };

    // Bulk operations
    this.bulk = {
      cancel: this.cancelScheduledMessages.bind(this),
      getStatus: this.getBulkStatus.bind(this),
    };
  }

  /**
   * Send SMS messages using the v3 unified API (RECOMMENDED)
   * 
   * This method uses the current Infobip SMS v3 API which supports both text and binary messages
   * through a single unified endpoint. This is the recommended method for sending SMS messages.
   * 
   * @param request - SMS v3 send request containing messages and options
   * @returns Promise<SendSmsV3Response> - Response with bulk ID and message statuses
   * 
   * @example
   * ```typescript
   * const response = await sms.sendV3({
   *   messages: [{
   *     from: "InfoSMS",
   *     destinations: [{ to: "+1234567890" }],
   *     text: "Hello World!"
   *   }]
   * });
   * ```
   */
  async sendV3(request: SendSmsV3Request): Promise<SendSmsV3Response> {
    try {
      // Validate request using comprehensive v3 validators
      validateSmsV3SendRequest(request);

      // Send request to v3 unified endpoint
      const response = await this.http.post(v3Endpoints.messages, request);
      
      return response.data as SendSmsV3Response;
    } catch (error) {
      // Handle different types of errors appropriately
      if (error instanceof SmsError) {
        throw error;
      }

      // Handle HTTP errors from the API
      if ((error as any).response) {
        const smsError = createSmsErrorFromResponse(
          (error as any).response.status,
          (error as any).response.data,
          error
        );
        throw smsError;
      }

      // Handle network errors
      if ((error as any).request) {
        const { SmsNetworkError } = await import('../errors/sms-errors');
        throw new SmsNetworkError('Network error occurred while sending SMS', error as Error);
      }

      // Handle other errors
      throw new SmsApiError('Unexpected error occurred', 500, 'SMS_UNKNOWN_ERROR', (error as Error).message);
    }
  }

  /**
   * Send SMS messages (DEPRECATED - Use sendV3 instead)
   * 
   * @deprecated This method uses deprecated v2 API endpoints. Use sendV3() instead.
   * The v2 endpoints (/sms/2/text/advanced and /sms/2/binary/advanced) were deprecated on 2024-10-09.
   * 
   * @param message - SMS message object
   * @returns Promise<any> - API response
   */
  async send(message: any): Promise<any> {
    // Add deprecation warning
    console.warn(
      '⚠️  DEPRECATION WARNING: The send() method uses deprecated v2 API endpoints. ' +
      'Please migrate to sendV3() which uses the current v3 unified API. ' +
      'The v2 endpoints were deprecated on 2024-10-09 and may be removed in future versions.'
    );

    try {
      if (!message.type) message.type = 'text';
      if (!sendEndpoints[message.type])
        throw new Error(
          `Invalid message type ${
            message.type
          }. Supported types are: ${Object.keys(sendEndpoints).join(', ')}.`
        );

      let response;
      if (message.type === 'query') {
        if (this.username && this.password) {
          message.username = this.username;
          message.password = this.password;
        }

        validateSMSMessage(message);
        message.to = message.to.join(',');

        response = await this.http.get(sendEndpoints[message.type], message);
      } else {
        validateSMSMessage(message);

        response = await this.http.post(sendEndpoints[message.type], message);
      }

      return response;
    } catch (error) {
      return error;
    }
  }

  async preview(message: any) {
    try {
      Validator.requiredString(message.text, 'message.text');
      const response = await this.http.post(endpoints.preview, message);
      return response;
    } catch (error) {
      return error;
    }
  }

  async get(limit?: number) {
    try {
      const response = await this.http.get(endpoints.get, { limit });
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * See the status and the scheduled time of your SMS messages.
   *
   * @param { string } bulkId - ID of the scheduled message
   * @return { AxiosResponse<any, any> } response - Return Axios Response
   */
  private async getScheduledMessage(bulkId: string) {
    try {
      Validator.requiredString(bulkId, 'bulkId');

      const response = await this.http.get(endpoints.schedule, { bulkId });
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * Change the date and time for sending scheduled messages.
   *
   * @param { string } bulkId - ID of the scheduled message
   * @param { string } sendAt - Date and time when the message is to be sent.
   * @return { AxiosResponse<any, any> } response - Return Axios Response
   */
  private async rescheduleMessage(bulkId: string, sendAt: string) {
    try {
      Validator.requiredString(bulkId, 'bulkId');
      Validator.requiredString(sendAt, 'sendAt');

      const queryString = new URLSearchParams({ bulkId });
      const response = await this.http.put(
        endpoints.schedule + `/?${queryString}`,
        { sendAt }
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * See the status of scheduled messages.
   *
   * @param { string } bulkId - ID of the scheduled message
   * @return { AxiosResponse<any, any> } response - Return Axios Response
   */
  private async getMessageStatus(bulkId: string) {
    try {
      Validator.requiredString(bulkId, 'bulkId');

      const response = await this.http.get(endpoints.status, { bulkId });
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * Change status or completely cancel sending of scheduled messages.
   *
   * @param { string } bulkId - ID of the scheduled message
   * @param { string } status - The status of the message(s).
   * @return { AxiosResponse<any, any> } response - Return Axios Response
   */
  private async updateMessageStatus(bulkId: string, status: string) {
    try {
      Validator.requiredString(bulkId, 'bulkId');
      Validator.requiredString(status, 'status');

      const queryString = new URLSearchParams({ bulkId });
      const response = await this.http.put(
        endpoints.status + `/?${queryString}`,
        { status }
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * Get SMS delivery reports using v3 API (RECOMMENDED)
   * 
   * Retrieves delivery reports for sent SMS messages using the enhanced v3 API
   * with comprehensive filtering options.
   * 
   * @param query - Query parameters for filtering reports
   * @returns Promise<any> - Delivery reports response
   */
  async getDeliveryReportsV3(query: SmsReportsQuery = {}): Promise<any> {
    try {
      // Validate query parameters
      validateSmsReportsQuery(query);

      const response = await this.http.get(v3Endpoints.reports, query);
      return response.data;
    } catch (error) {
      if (error instanceof SmsError) {
        throw error;
      }

      if ((error as any).response) {
        const smsError = createSmsErrorFromResponse(
          (error as any).response.status,
          (error as any).response.data,
          error
        );
        throw smsError;
      }

      const { SmsNetworkError } = await import('../errors/sms-errors');
      throw new SmsNetworkError('Network error occurred while fetching delivery reports', error as Error);
    }
  }

  /**
   * Get SMS message logs using v3 API (RECOMMENDED)
   * 
   * Retrieves message logs for sent SMS messages using the enhanced v3 API
   * with comprehensive filtering options. Note: Only retrieves messages from the last 48 hours,
   * with a maximum of 1000 records per call.
   * 
   * @param query - Query parameters for filtering logs
   * @returns Promise<any> - Message logs response
   */
  async getMessageLogsV3(query: SmsLogsQuery = {}): Promise<any> {
    try {
      // Validate query parameters
      validateSmsLogsQuery(query);

      const response = await this.http.get(v3Endpoints.logs, query);
      return response.data;
    } catch (error) {
      if (error instanceof SmsError) {
        throw error;
      }

      if ((error as any).response) {
        const smsError = createSmsErrorFromResponse(
          (error as any).response.status,
          (error as any).response.data,
          error
        );
        throw smsError;
      }

      const { SmsNetworkError } = await import('../errors/sms-errors');
      throw new SmsNetworkError('Network error occurred while fetching message logs', error);
    }
  }

  /**
   * Cancel scheduled SMS messages (DELETE bulk operation)
   * 
   * Cancels all scheduled messages associated with the given bulk ID.
   * Only messages that are still pending can be cancelled.
   * 
   * @param bulkId - ID of the bulk to cancel
   * @returns Promise<any> - Cancellation response
   */
  async cancelScheduledMessages(bulkId: string): Promise<any> {
    try {
      if (!bulkId || typeof bulkId !== 'string') {
        const { SmsValidationError } = await import('../errors/sms-errors');
        throw new SmsValidationError('bulkId is required and must be a string');
      }

      const response = await this.http.delete(`${endpoints.schedule}/${bulkId}`);
      return response.data;
    } catch (error) {
      if (error instanceof SmsError) {
        throw error;
      }

      if ((error as any).response) {
        const smsError = createSmsErrorFromResponse(
          (error as any).response.status,
          (error as any).response.data,
          error
        );
        throw smsError;
      }

      const { SmsNetworkError } = await import('../errors/sms-errors');
      throw new SmsNetworkError('Network error occurred while cancelling scheduled messages', error);
    }
  }

  /**
   * Get status of multiple bulk IDs
   * 
   * @param bulkIds - Array of bulk IDs to check
   * @returns Promise<any> - Status information for all bulk IDs
   */
  async getBulkStatus(bulkIds: string[]): Promise<any> {
    try {
      if (!Array.isArray(bulkIds) || bulkIds.length === 0) {
        const { SmsValidationError } = await import('../errors/sms-errors');
        throw new SmsValidationError('bulkIds must be a non-empty array');
      }

      const bulkIdParam = bulkIds.join(',');
      const response = await this.http.get(endpoints.status, { bulkId: bulkIdParam });
      return response.data;
    } catch (error) {
      if (error instanceof SmsError) {
        throw error;
      }

      if ((error as any).response) {
        const smsError = createSmsErrorFromResponse(
          (error as any).response.status,
          (error as any).response.data,
          error
        );
        throw smsError;
      }

      const { SmsNetworkError } = await import('../errors/sms-errors');
      throw new SmsNetworkError('Network error occurred while fetching bulk status', error);
    }
  }

  /**
   * Send SMS via query parameters using v3 API (RECOMMENDED)
   * 
   * @deprecated The query-based sending method is generally not recommended.
   * Use sendV3() with POST method instead for better reliability and features.
   * 
   * @param query - Query parameters for sending SMS
   * @returns Promise<any> - Send response
   */
  async sendQueryV3(query: any): Promise<any> {
    console.warn(
      '⚠️  WARNING: Query-based SMS sending is not recommended. ' +
      'Use sendV3() with POST method instead for better reliability and access to all features.'
    );

    try {
      // Basic validation for query parameters
      if (!query.from) {
        const { SmsValidationError } = await import('../errors/sms-errors');
        throw new SmsValidationError('from parameter is required');
      }

      if (!query.to) {
        const { SmsValidationError } = await import('../errors/sms-errors');
        throw new SmsValidationError('to parameter is required');
      }

      if (!query.text) {
        const { SmsValidationError } = await import('../errors/sms-errors');
        throw new SmsValidationError('text parameter is required');
      }

      const response = await this.http.get(v3Endpoints.query, query);
      return response.data;
    } catch (error) {
      if (error instanceof SmsError) {
        throw error;
      }

      if ((error as any).response) {
        const smsError = createSmsErrorFromResponse(
          (error as any).response.status,
          (error as any).response.data,
          error
        );
        throw smsError;
      }

      const { SmsNetworkError } = await import('../errors/sms-errors');
      throw new SmsNetworkError('Network error occurred while sending SMS via query', error);
    }
  }

  /**
   * Get delivery reports (DEPRECATED - Use getDeliveryReportsV3 instead)
   * 
   * @deprecated This method uses deprecated v1 API endpoint. Use getDeliveryReportsV3() instead.
   */
  private async getDeliveryReports(filter: any) {
    console.warn(
      '⚠️  DEPRECATION WARNING: This method uses deprecated v1 API endpoint. ' +
      'Use getDeliveryReportsV3() instead for enhanced filtering and better performance.'
    );

    try {
      const response = await this.http.get(endpoints.reports, filter);
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * Get message logs (DEPRECATED - Use getMessageLogsV3 instead)
   * 
   * @deprecated This method uses deprecated v1 API endpoint. Use getMessageLogsV3() instead.
   */
  private async getMessageLogs(filter: any) {
    console.warn(
      '⚠️  DEPRECATION WARNING: This method uses deprecated v1 API endpoint. ' +
      'Use getMessageLogsV3() instead for enhanced filtering and better performance.'
    );

    try {
      const response = await this.http.get(endpoints.logs, filter);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export { SMS };

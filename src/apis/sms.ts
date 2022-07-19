import { Http } from '../utils/http';
import { InfobipAuth } from '../utils/auth';
import { validateSMSMessage } from '../utils/validators/sms';

import { Validator } from '../utils/validator';

const sendEndpoints: any = {
  text: '/sms/2/text/advanced',
  binary: '/sms/2/binary/advanced',
  query: '/sms/1/text/query',
};

const endpoints: any = {
  preview: '/sms/1/preview',
  get: '/sms/1/inbox/reports',
  reports: '/sms/1/reports',
  logs: '/sms/1/logs',
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

  constructor(credentials: InfobipAuth) {
    this.http = new Http(credentials.baseUrl, credentials.authorization);
    this.username = credentials.username;
    this.password = credentials.password;

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
  }

  async send(message: any) {
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

  private async getDeliveryReports(filter: any) {
    try {
      const response = await this.http.get(endpoints.reports, filter);
      return response;
    } catch (error) {
      return error;
    }
  }

  private async getMessageLogs(filter: any) {
    try {
      const response = await this.http.get(endpoints.logs, filter);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export { SMS };

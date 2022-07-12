import { Http } from '../utils/http';
import { InfobipAuth } from '../utils/auth';
import {
  validateBodyParameters,
  validateQueryParameters,
  validateSMSMessage,
} from '../utils/validators/sms';

const endpoints: any = {
  send: '/sms/2/text/advanced',
  sendBinary: '/sms/2/binary/advanced',
  preview: '/sms/1/preview',
  sendQuery: '/sms/1/text/query',
  get: '/sms/1/inbox/reports',
};

const reschedule: any = {
  scheduledMessages: '/sms/1/bulks',
  scheduledStatus: '/sms/1/bulks/status',
};

class SMS {
  http: Http;

  constructor(credentials: InfobipAuth) {
    this.http = new Http(credentials.baseUrl, credentials.authorization);
  }

  async send(message: any) {
    try {
      if (!endpoints[message.type])
        throw new Error(
          `Invalid message type ${
            message.type
          }. Supported types are: ${Object.keys(endpoints).join(', ')}.`
        );

      validateSMSMessage(message);

      const response = await this.http.post(endpoints[message.type], message);
      return response;
    } catch (error) {
      return error;
    }
  }

  async sendQuery(message: any) {
    try {
      if (!endpoints[message.type])
        throw new Error(
          `Invalid message type ${
            message.type
          }. Supported types are: ${Object.keys(endpoints).join(', ')}.`
        );

      validateSMSMessage(message);
      const response = await this.http.getQuery(
        endpoints[message.type],
        message
      );
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
   * @param { any } query - Query object
   * @return { AxiosResponse<any, any> } response - Return Axios Response
   */
  async getScheduledMessage(query: any) {
    try {
      validateQueryParameters(query);

      const queryString = new URLSearchParams(query);
      const response = await this.http.get(
        reschedule.scheduledMessages + `/?${queryString}`
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * Change the date and time for sending scheduled messages.
   *
   * @param { any } query - Query object
   * @param { any } body - Body object
   * @return { AxiosResponse<any, any> } response - Return Axios Response
   */
  async rescheduleMessage(query: any, body: any) {
    try {
      validateQueryParameters(query);
      validateBodyParameters(body);

      const queryString = new URLSearchParams(query);
      const response = await this.http.put(
        reschedule.scheduledMessages + `/?${queryString}`,
        body
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * See the status of scheduled messages.
   *
   * @param { any } query - Query object
   * @return { AxiosResponse<any, any> } response - Return Axios Response
   */
  async getMessageStatus(query: any) {
    try {
      validateQueryParameters(query);

      const queryString = new URLSearchParams(query);
      const response = await this.http.get(
        reschedule.scheduledStatus + `/?${queryString}`
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * Change status or completely cancel sending of scheduled messages.
   *
   * @param { any } query - Query object
   * @param { any } body - Body object
   * @return { AxiosResponse<any, any> } response - Return Axios Response
   */
  async updateMessageStatus(query: any, body: any) {
    try {
      validateQueryParameters(query);
      validateBodyParameters(body);

      const queryString = new URLSearchParams(query);
      const response = await this.http.put(
        reschedule.scheduledStatus + `/?${queryString}`,
        body
      );
      return response;
    } catch (error) {
      return error;
    }
  }
}

export { SMS };

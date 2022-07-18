import { Http } from '../utils/http';
import { InfobipAuth } from '../utils/auth';
import {
  validateBodyParameters,
  validateQueryParameters,
  validateSMSMessage,
  validatePreview
} from '../utils/validators/sms';

const sendEndpoints: any = {
  text: '/sms/2/text/advanced',
  binary: '/sms/2/binary/advanced',
  query: '/sms/1/text/query',
};

const endpoints: any = {
  preview: '/sms/1/preview',
  get: '/sms/1/inbox/reports',
};

const reschedule: any = {
  scheduledMessages: '/sms/1/bulks',
  scheduledStatus: '/sms/1/bulks/status',
};

class SMS {
  http: Http;
  username?: string;
  password?: string;

  constructor(credentials: InfobipAuth) {
    this.http = new Http(credentials.baseUrl, credentials.authorization);

    this.username = credentials.username;
    this.password = credentials.password;
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
      validatePreview(message);
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

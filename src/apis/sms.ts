import { Http } from '../utils/http';
import { InfobipAuth } from '../utils/auth';
import { validateSMSMessage } from '../utils/validators/sms';

const endpoints: any = {
  send: '/sms/2/text/advanced',
  sendBinary: '/sms/2/binary/advanced',
  preview: '/sms/1/preview',
  sendQuery: '/sms/1/text/query',
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
}

export { SMS };

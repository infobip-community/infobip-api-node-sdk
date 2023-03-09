import FormData from 'form-data';
import { Http } from '../utils/http';
import { FormDataBuilder } from '../utils/form-data';
import { InfobipAuth } from '../utils/auth';
import { validateMMSMessage } from '../utils/validators/mms';

const sendEndpoints: any = {
  advanced: '/mms/1/advanced',
  single: '/mms/1/single',
};

const endpoints: any = {
  get: '/mms/1/inbox/reports',
  reports: '/mms/1/reports',
  binary: '/mms/1/content',
};

class MMS {
  http: Http;
  username?: string;
  password?: string;
  reports: any;

  constructor(credentials: InfobipAuth) {
    this.http = new Http(credentials.baseUrl, credentials.authorization);
    this.username = credentials.username;
    this.password = credentials.password;

    this.reports = {
      get: this.getDeliveryReports.bind(this),
    };
  }

  async send(message: any) {
    try {
      if (!message.type) message.type = 'advanced';
      if (!sendEndpoints[message.type])
        throw new Error(
          `Invalid message type ${
            message.type
          }. Supported types are: ${Object.keys(sendEndpoints).join(', ')}.`
        );

      validateMMSMessage(message);

      return await this.http.post(sendEndpoints[message.type], message);
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

  private async getDeliveryReports(filter: any) {
    try {
      const response = await this.http.get(endpoints.reports, filter);
      return response;
    } catch (error) {
      return error;
    }
  }

  async uploadBinaryContent(file: any) {
    try {
      let form = new FormData();
      FormDataBuilder(form, file);

      const response = await this.http.post(endpoints.binary, form, {
        headers: form.getHeaders(),
      });

      return response;
    } catch (error) {
      return error;
    }
  }
}

export { MMS };

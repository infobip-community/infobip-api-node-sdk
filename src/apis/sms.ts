import { Http } from '../utils/http';
import { InfobipAuth } from '../utils/auth';
import { validateSMSSend } from '../utils/validators/sms';

const endpoints: any = {
  send: '/sms/2/text/advanced',
  get: '/sms/1/inbox/reports',
  reports: '/sms/1/reports',
};

class SMS {
  http: Http;
  reports: any;

  constructor(credentials: InfobipAuth) {
    this.http = new Http(credentials.baseUrl, credentials.authorization);
    this.reports = {
      get: this.getReports.bind(this),
    };
  }

  async send(message: any) {
    try {
      validateSMSSend(message);
      const response = await this.http.post(endpoints.send, message);
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

  private async getReports(
    bulkId?: string,
    messageId?: string,
    limit?: number
  ) {
    try {
      const response = await this.http.get(endpoints.reports, {
        bulkId,
        messageId,
        limit,
      });
      return response;
    } catch (error) {
      return error;
    }
  }
}

export { SMS };

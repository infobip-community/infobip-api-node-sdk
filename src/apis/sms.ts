import { Http } from '../utils/http';
import { InfobipAuth } from '../utils/auth';
import { validateSMSSend } from '../utils/validators/sms';

const endpoints: any = {
  send: '/sms/2/text/advanced',
  get: '/sms/1/inbox/reports',
  reports: '/sms/1/reports',
  logs: '/sms/1/logs',
};

class SMS {
  http: Http;
  reports: any;
  logs: any;

  constructor(credentials: InfobipAuth) {
    this.http = new Http(credentials.baseUrl, credentials.authorization);
    this.reports = {
      get: this.getDeliveryReports.bind(this),
    };
    this.logs = {
      get: this.getMessageLogs.bind(this),
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

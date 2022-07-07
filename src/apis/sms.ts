import { Http } from '../utils/http';
import { InfobipAuth } from '../utils/auth';
import { validateSMSSend } from '../utils/validators/sms';

const endpoints: any = {
  send: '/sms/2/text/advanced',
  get: '/sms/1/inbox/reports',
};

class SMS {
  http: Http;

  constructor(credentials: InfobipAuth) {
    this.http = new Http(credentials.baseUrl, credentials.authorization);
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
}

export { SMS };

import { Http } from '../utils/http';
import { InfobipAuth } from '../utils/auth';

const endpoints: any = {
  send: '/sms/2/text/advanced',
};

class SMS {
  http: Http;

  constructor(credentials: InfobipAuth) {
    this.http = new Http(credentials.baseUrl, credentials.authorization);
  }

  async send(message: any) {
    try {
      // Validate

      const response = await this.http.post(endpoints.send, message);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export { SMS };

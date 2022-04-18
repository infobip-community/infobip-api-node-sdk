import { Http } from '../utils/http';
import { InfobipAuth } from '../utils/auth';

const endpoints: any = {
  text: '/whatsapp/1/message/text',
};

class WhatsApp {
  http: Http;
  constructor(credentials: InfobipAuth) {
    this.http = new Http(credentials.baseUrl, credentials.authorization);
  }

  async send(message: any) {
    try {
      const response = await this.http.post(endpoints[message.type], message);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export { WhatsApp };

import { Http } from '../utils/http';
import { InfobipAuth } from '../utils/auth';
import { Validator } from '../utils/validator';

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

      Validator.array(message.messages, "message.messages")
      message.messages.forEach((message: any) => {
        Validator.object(message, "message.messages.message")
      })

      const response = await this.http.post(endpoints.send, message);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export { SMS };

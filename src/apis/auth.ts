import { Http } from '../utils/http';
import { InfobipAuth } from '../utils/auth';
import { AuthType } from '../utils/auth-type';
import { URLSearchParams } from 'url';
import { Validator } from '../utils/validator';

const endpoints: any = {
  session: '/auth/1/session',
  oauth2: '/auth/1/oauth2/token',
};

class Auth {
  ibsso: any;
  oauth2: any;
  credentials: InfobipAuth;

  constructor(credentials: InfobipAuth) {
    this.credentials = credentials;
    this.ibsso = {
      create: this.createSession.bind(this),
      destroy: this.destroySession.bind(this),
    };

    this.oauth2 = {
      create: this.createToken.bind(this),
    };
  }

  private async createSession() {
    try {
      Validator.required(this.credentials.password, 'Infobip.password');
      Validator.required(this.credentials.username, 'Infobip.username');

      const http = new Http(this.credentials.baseUrl);
      const response = await http.post(endpoints.session, {
        password: this.credentials.password,
        username: this.credentials.username,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  private async destroySession(ibssoToken: string) {
    try {
      const http = new Http(
        this.credentials.baseUrl,
        `${AuthType.IBSSO} ${ibssoToken}`
      );
      const response = await http.delete(endpoints.session);
      return response;
    } catch (error) {
      return error;
    }
  }

  private async createToken() {
    try {
      Validator.required(this.credentials.password, 'Infobip.password');
      Validator.required(this.credentials.username, 'Infobip.username');

      const http = new Http(this.credentials.baseUrl);
      const response = await http.post(
        `${endpoints.oauth2}?${new URLSearchParams({
          client_secret: this.credentials.password as string,
          client_id: this.credentials.username as string,
          grant_type: 'client_credentials',
        }).toString()}`,
        {},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      return response;
    } catch (error) {
      return error;
    }
  }
}

export { Auth };

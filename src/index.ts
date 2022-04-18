import { AuthType } from './utils/auth-type';
import { InfobipAuth } from './utils/auth';
import { WhatsApp } from './apis/whatsapp';
import { Auth } from './apis/auth';

class Infobip {
  /**
   *
   * @param {InfobipAuth} config - Configuration object for Infobip API
   *
   */

  credentials: InfobipAuth;
  channels: any;
  auth: any;

  constructor({
    baseUrl,
    authType,
    apiKey,
    username,
    password,
    oauthToken,
    ibssoToken,
  }: InfobipAuth) {
    this.credentials = new InfobipAuth({
      baseUrl,
      authType,
      apiKey,
      username,
      password,
      oauthToken,
      ibssoToken,
    });
    this.channels = {
      whatsapp: new WhatsApp(this.credentials),
    };
    this.auth = new Auth(this.credentials);
  }
}

export { Infobip, AuthType };

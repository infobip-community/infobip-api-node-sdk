import { AuthType } from './utils/auth-type';
import { InfobipAuth } from './utils/auth';
import { WhatsApp } from './apis/whatsapp';

class Infobip {
  /**
   *
   * @param {InfobipAuth} config - Configuration object for Infobip API
   *
   */

  credentials: InfobipAuth;
  channels: any;

  constructor({ baseUrl, authType, apiKey }: InfobipAuth) {
    this.credentials = new InfobipAuth({ baseUrl, authType, apiKey });
    this.channels = {
      whatsapp: new WhatsApp(this.credentials),
    };
  }
}

export { Infobip, AuthType };

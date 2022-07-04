import { AuthType } from './utils/auth-type';
import { InfobipAuth } from './utils/auth';
import { Validator } from './utils/validator';
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
    Validator.required(baseUrl, 'Infobip.baseUrl');
    Validator.required(authType, 'Infobip.authType');

    password && Validator.string(password, 'Infobip.password');
    username && Validator.string(username, 'Infobip.username');
    apiKey && Validator.string(apiKey, 'Infobip.apiKey');
    oauthToken && Validator.string(oauthToken, 'Infobip.oauthToken');
    ibssoToken && Validator.string(ibssoToken, 'Infobip.ibssoToken');

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

import { AuthType } from './utils/auth-type';
import { EmailStatus } from './utils/email-status-type';
import { InfobipAuth } from './utils/auth';
import { Validator } from './utils/validator';
import { Http } from './utils/http';
import { API } from './apis';
import { Auth } from './apis/auth';
import {
  TwoFAApplication,
  TwoFAMessageTemplate,
  TwoFAPinCode,
  Pin,
  TwoFAVerificationStatus,
} from './models/2fa-models';

class Infobip {
  /**
   *
   * @param { InfobipAuth } config - Configuration object for Infobip API
   *
   */

  credentials: InfobipAuth;
  service: any;
  channels: any;
  auth: Auth;
  http: Http;
  api: API;

  constructor(InfobipObject: InfobipAuth | Http) {
    this.credentials = {
      baseUrl: ''
    };
    if (InfobipObject instanceof InfobipAuth) {
      const {
        baseUrl,
        authType,
        apiKey,
        username,
        password,
        oauthToken,
        ibssoToken,
      } = Infobip;
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
      this.http = new Http(this.credentials.baseUrl, this.credentials.authorization);
    } else if (InfobipObject instanceof Http) {
      this.http = InfobipObject;
      this.credentials = {
        baseUrl: this.http.baseUrl
      }
    }


    this.api = new API(this);
    this.channels = {
      whatsapp: this.api.whatsapp,
      email: this.api.email,
      sms: this.api.sms,
    };
    this.service = {
      twoFA: this.api.twoFA,
    };
    this.auth = this.api.auth;
  }
}

export {
  Infobip,
  AuthType,
  Http,
  EmailStatus,
  TwoFAApplication,
  TwoFAMessageTemplate,
  TwoFAPinCode,
  Pin,
  TwoFAVerificationStatus,
};

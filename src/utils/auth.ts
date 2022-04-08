import { AuthType } from './auth-type';

class InfobipAuth {
  /**
   *
   *
   */

  baseUrl: string;
  authType: AuthType;
  apiKey?: string;
  username?: string;
  password?: string;
  ibssoToken?: string;
  oauthToken?: string;
  authorization?: string;

  constructor({
    baseUrl,
    authType,
    apiKey,
    username,
    password,
    ibssoToken,
    oauthToken,
  }: InfobipAuth) {
    this.baseUrl = baseUrl;
    this.authType = authType;
    this.apiKey = apiKey;
    this.username = username;
    this.password = password;
    this.ibssoToken = ibssoToken;
    this.oauthToken = oauthToken;

    switch (authType) {
      case AuthType.ApiKey:
        this.authorization = `${authType} ${apiKey}`;
        break;

      default:
        this.authorization = '';
        break;
    }
  }
}

export { InfobipAuth };

import { AuthType } from './auth-type';

class InfobipAuth {
  /**
   *
   *
   */

  baseUrl: string;
  authType?: AuthType;
  apiKey?: string;
  username?: string;
  password?: string;
  ibssoToken?: string;
  oauthToken?: string;
  authorization?: string;

  constructor({
    baseUrl,
    authType = AuthType.ApiKey,
    apiKey = '',
    username = '',
    password = '',
    ibssoToken = '',
    oauthToken = '',
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

      case AuthType.Basic:
        this.authorization = `${authType} ${Buffer.from(
          `${username}:${password}`,
          'base64'
        ).toString()}`;
        break;

      case AuthType.IBSSO:
        this.authorization = `${authType} ${ibssoToken}`;
        break;

      case AuthType.OAuth:
        this.authorization = `${authType} ${oauthToken}`;
        break;

      default:
        this.authorization = '';
        throw new Error(
          `Invalid authentication type: ${authType}. The only supported types are: ${AuthType.ApiKey}, ${AuthType.Basic}, ${AuthType.IBSSO}, ${AuthType.OAuth}`
        );
    }
  }
}

export { InfobipAuth };

import { AuthType } from './auth-type';
import { Validator } from './validator';

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
        Validator.required(
          apiKey,
          'When using AuthType.ApiKey, Infobip.apiKey'
        );

        this.authorization = `${authType} ${apiKey}`;
        break;

      case AuthType.Basic:
        Validator.required(
          username,
          'When using AuthType.Basic, Infobip.username'
        );
        Validator.required(
          password,
          'When using AuthType.Basic, Infobip.password'
        );

        this.authorization = `${authType} ${Buffer.from(
          `${username}:${password}`
        ).toString('base64')}`;

        break;

      case AuthType.IBSSO:
        Validator.required(
          ibssoToken,
          'When using AuthType.IBSSO, Infobip.ibssoToken'
        );

        this.authorization = `${authType} ${ibssoToken}`;
        break;

      case AuthType.OAuth:
        Validator.required(
          oauthToken,
          'When using AuthType.OAuth, Infobip.oauthToken'
        );

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

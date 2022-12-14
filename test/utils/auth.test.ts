import { InfobipAuth } from '../../src/utils/auth';
import { AuthType } from '../../src/utils/auth-type';
import { v4 as uuid } from 'uuid';

const BASE_URL = 'https://example.org';
const PASSWORD = uuid();

describe('InfobipAuth', () => {
  it('only requires a baseUrl', () => {
    let auth = new InfobipAuth({
      baseUrl: BASE_URL,
      authType: AuthType.ApiKey,
      apiKey: PASSWORD,
    });

    expect(auth.baseUrl).toEqual(BASE_URL);
    expect(auth.authType).toEqual('App');
    expect(auth.password).toEqual('');
    expect(auth.username).toEqual('');
    expect(auth.apiKey).toEqual(PASSWORD);
    expect(auth.ibssoToken).toEqual('');
    expect(auth.oauthToken).toEqual('');
  });

  it('does not create authorization for invalid auth types', () => {
    try {
      let auth = new InfobipAuth({ baseUrl: BASE_URL, authType: '' as any });

      expect(auth.authorization).toEqual('');
    } catch (error) {
      expect(error).toEqual(
        new Error(
          'Invalid authentication type: . The only supported types are: App, Basic, IBSSO, Bearer'
        )
      );
    }
  });

  it('creates authorization for api keys', () => {
    let auth = new InfobipAuth({ baseUrl: BASE_URL, apiKey: PASSWORD });

    expect(auth.authorization).toEqual(`App ${PASSWORD}`);
  });

  it('creates authorization for username and password', () => {
    const USERNAME = uuid();
    let auth = new InfobipAuth({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let [type, encoded] = auth.authorization?.split(' ') as Array<string>;

    expect(type).toEqual('Basic');
    expect(Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64')).toEqual(
      encoded
    );
  });

  it('creates authorization for ibsso', () => {
    let auth = new InfobipAuth({
      baseUrl: BASE_URL,
      authType: AuthType.IBSSO,
      ibssoToken: PASSWORD,
    });

    expect(auth.authorization).toEqual(`IBSSO ${PASSWORD}`);
  });

  it('creates authorization for oauth', () => {
    let auth = new InfobipAuth({
      baseUrl: BASE_URL,
      authType: AuthType.OAuth,
      oauthToken: PASSWORD,
    });

    expect(auth.authorization).toEqual(`Bearer ${PASSWORD}`);
  });
});

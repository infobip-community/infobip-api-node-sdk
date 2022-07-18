import { InfobipAuth } from '../../src/utils/auth';
import { AuthType } from '../../src/utils/auth-type';

const BASE_URL = 'https://example.org';

describe('InfobipAuth', () => {
  it('only requires a baseUrl', () => {
    let auth = new InfobipAuth({
      baseUrl: BASE_URL,
      authType: AuthType.ApiKey,
      apiKey: 's3creT',
    });

    expect(auth.baseUrl).toEqual(BASE_URL);
    expect(auth.authType).toEqual('App');
    expect(auth.password).toEqual('');
    expect(auth.username).toEqual('');
    expect(auth.apiKey).toEqual('s3creT');
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
    let auth = new InfobipAuth({ baseUrl: BASE_URL, apiKey: 's3cr3t' });

    expect(auth.authorization).toEqual('App s3cr3t');
  });

  it('creates authorization for username and password', () => {
    let auth = new InfobipAuth({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: 'infobip',
      password: 's3cr3t',
    });
    let [type, encoded] = auth.authorization?.split(' ') as Array<string>;

    expect(type).toEqual('Basic');
    expect(Buffer.from(`infobip:s3cr3t`).toString('base64')).toEqual(encoded);
  });

  it('creates authorization for ibsso', () => {
    let auth = new InfobipAuth({
      baseUrl: BASE_URL,
      authType: AuthType.IBSSO,
      ibssoToken: 's3cr3t',
    });

    expect(auth.authorization).toEqual('IBSSO s3cr3t');
  });

  it('creates authorization for oauth', () => {
    let auth = new InfobipAuth({
      baseUrl: BASE_URL,
      authType: AuthType.OAuth,
      oauthToken: 's3cr3t',
    });

    expect(auth.authorization).toEqual('Bearer s3cr3t');
  });
});

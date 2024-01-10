import { v4 as uuid } from 'uuid';
import { Infobip, AuthType, EmailStatus, Http } from '../src';

const BASE_URL = 'https://api.infobip.com';
const API_KEY = uuid();

describe('infobip', () => {
  it('creates credentials object', () => {
    let infobip = new Infobip({
      baseUrl: BASE_URL,
      apiKey: API_KEY,
      authType: AuthType.ApiKey,
    });

    expect(infobip.credentials.baseUrl).toEqual('https://api.infobip.com');
  });

  it('exports an EmailStatus util', () => {
    expect(EmailStatus).toBeDefined();
  });

  it('exports an Http util', () => {
    expect(Http).toBeDefined();
  });

  it('exposes an auth object', () => {
    let infobip = new Infobip({
      baseUrl: BASE_URL,
      apiKey: API_KEY,
      authType: AuthType.ApiKey,
    });

    expect(infobip.auth).toBeDefined();
  });

  it('validates password', () => {
    expect(() => {
      new Infobip({
        baseUrl: BASE_URL,
        authType: AuthType.ApiKey,
        password: (10 as unknown) as string,
      });
    }).toThrow('Infobip.password must be a string.');
  });

  it('validates username', () => {
    expect(() => {
      new Infobip({
        baseUrl: BASE_URL,
        authType: AuthType.ApiKey,
        username: (10 as unknown) as string,
      });
    }).toThrow('Infobip.username must be a string.');
  });

  it('validates apiKey', () => {
    expect(() => {
      new Infobip({
        baseUrl: BASE_URL,
        authType: AuthType.ApiKey,
        apiKey: (10 as unknown) as string,
      });
    }).toThrow('Infobip.apiKey must be a string.');
  });

  it('validates oauthToken', () => {
    expect(() => {
      new Infobip({
        baseUrl: BASE_URL,
        authType: AuthType.ApiKey,
        oauthToken: (10 as unknown) as string,
      });
    }).toThrow('Infobip.oauthToken must be a string.');
  });

  it('validates ibssoToken', () => {
    expect(() => {
      new Infobip({
        baseUrl: BASE_URL,
        authType: AuthType.ApiKey,
        ibssoToken: (10 as unknown) as string,
      });
    }).toThrow('Infobip.ibssoToken must be a string.');
  });
});

describe('infobip.channels', () => {
  it('creates a whatsapp object', () => {
    let infobip = new Infobip({
      baseUrl: BASE_URL,
      apiKey: API_KEY,
      authType: AuthType.ApiKey,
    });

    expect(infobip.channels.whatsapp).toBeDefined();
  });

  it('creates an email object', () => {
    let infobip = new Infobip({
      baseUrl: BASE_URL,
      apiKey: API_KEY,
      authType: AuthType.ApiKey,
    });

    expect(infobip.channels.email).toBeDefined();
  });
});

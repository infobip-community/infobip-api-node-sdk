import { Infobip, AuthType } from '../src';

const BASE_URL = 'https://api.infobip.com';
const API_KEY = 's3cr3t';

describe('infobip', () => {
  it('creates credentials object', () => {
    let infobip = new Infobip({
      baseUrl: BASE_URL,
      apiKey: API_KEY,
      authType: AuthType.ApiKey,
    });

    expect(infobip.credentials.baseUrl).toEqual('https://api.infobip.com');
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
});

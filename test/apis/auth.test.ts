import { v4 as uuid } from 'uuid';
import { Auth } from '../../src/apis/auth';

import axios from 'axios';
import { AuthType, Infobip } from '../../src';
jest.mock('axios');

beforeAll(() => {
  (axios as any).create.mockReturnThis();
});

const BASE_URL = 'https://example.org';
const USERNAME = 'infobip';
const PASSWORD = uuid();

describe('Auth', () => {
  it('exposes an ibsso create method', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let auth = new Auth(infobip);
    await auth.ibsso.create();

    expect(axios.post).toHaveBeenCalledWith(
      '/auth/1/session',
      {
        username: USERNAME,
        password: PASSWORD,
      },
      undefined
    );
  });

  it('exposes an ibsso create method that can throw an error', async () => {
    expect.assertions(1);
    (axios as any).post.mockRejectedValue({ message: 'error' });

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let auth = new Auth(infobip);
    try {
      await auth.ibsso.create();
    } catch (error) {
      expect(error).toEqual({ message: 'error' });
    }
  });

  it('exposes an ibsso destroy method', async () => {
    expect.assertions(1);
    (axios as any).delete.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let auth = new Auth(infobip);
    await auth.ibsso.destroy();

    expect(axios.delete).toHaveBeenCalledWith('/auth/1/session', {
      data: undefined,
    });
  });

  it('exposes an ibsso destroy method that can throw an error', async () => {
    expect.assertions(1);
    (axios as any).delete.mockRejectedValue({ message: 'error' });

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let auth = new Auth(infobip);
    let error = await auth.ibsso.destroy();

    expect(error).toEqual({ message: 'error' });
  });

  it('exposes an oauth2 create method', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let auth = new Auth(infobip);
    await auth.oauth2.create();

    expect(axios.post).toHaveBeenCalledWith(
      `/auth/1/oauth2/token?client_secret=${PASSWORD}&client_id=infobip&grant_type=client_credentials`,
      {},
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
  });

  it('exposes an oauth2 create method that can throw an error', async () => {
    expect.assertions(1);
    (axios as any).post.mockRejectedValue({ message: 'error' });

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let auth = new Auth(infobip);
    try {
      await auth.oauth2.create();
    } catch (error) {
      expect(error).toEqual({ message: 'error' });
    }
  });
});

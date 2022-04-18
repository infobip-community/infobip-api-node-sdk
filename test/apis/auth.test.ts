import { Auth } from '../../src/apis/auth';

import axios from 'axios';
jest.mock('axios');

beforeAll(() => {
  (axios as any).create.mockReturnThis();
});

const BASE_URL = 'https://example.org';
const USERNAME = 'infobip';
const PASSWORD = 's3cr3t';

describe('Auth', () => {
  it('exposes an ibsso create method', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let auth = new Auth({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
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

    let auth = new Auth({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    let error = await auth.ibsso.create();

    expect(error).toEqual({ message: 'error' });
  });

  it('exposes an ibsso destroy method', async () => {
    expect.assertions(1);
    (axios as any).delete.mockResolvedValue({});

    let auth = new Auth({
      baseUrl: BASE_URL,
      ibssoToken: PASSWORD,
    });
    await auth.ibsso.destroy();

    expect(axios.delete).toHaveBeenCalledWith('/auth/1/session', {
      data: undefined,
    });
  });

  it('exposes an ibsso destroy method that can throw an error', async () => {
    expect.assertions(1);
    (axios as any).delete.mockRejectedValue({ message: 'error' });

    let auth = new Auth({
      baseUrl: BASE_URL,
      ibssoToken: PASSWORD,
    });
    let error = await auth.ibsso.destroy();

    expect(error).toEqual({ message: 'error' });
  });

  it('exposes an oauth2 create method', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let auth = new Auth({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    await auth.oauth2.create();

    expect(axios.post).toHaveBeenCalledWith(
      '/auth/1/oauth2/token?client_secret=s3cr3t&client_id=infobip&grant_type=client_credentials',
      {},
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
  });

  it('exposes an oauth2 create method that can throw an error', async () => {
    expect.assertions(1);
    (axios as any).post.mockRejectedValue({ message: 'error' });

    let auth = new Auth({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    let error = await auth.oauth2.create();

    expect(error).toEqual({ message: 'error' });
  });
});

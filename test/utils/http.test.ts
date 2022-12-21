import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { Http } from '../../src/utils/http';

jest.mock('axios');

beforeAll(() => {
  (axios as any).create.mockReturnThis();
});

const BASE_URL = 'https://example.org';
const AUTHORIZATION = uuid();

describe('Http', () => {
  it('creates a baseUrl', () => {
    let http = new Http(BASE_URL, AUTHORIZATION);

    expect(http.baseUrl).toEqual(BASE_URL);
  });

  it('appends https to baseUrl', () => {
    let http = new Http('api.infobip.com', AUTHORIZATION);

    expect(http.baseUrl).toEqual('https://api.infobip.com');
  });

  it('exposes a post method', async () => {
    (axios as any).post.mockResolvedValue({
      config: { headers: { Authorization: AUTHORIZATION } },
    });

    let http = new Http(BASE_URL, AUTHORIZATION);
    let response = await http.post('/', {});

    expect(axios.post).toHaveBeenCalledWith('/', {}, undefined);
    expect(response.config.headers?.Authorization).toEqual(AUTHORIZATION);
  });

  it('exposes a put method', async () => {
    (axios as any).put.mockResolvedValue({
      config: { headers: { Authorization: AUTHORIZATION } },
    });

    let http = new Http(BASE_URL, AUTHORIZATION);
    let response = await http.put('/', {});

    expect(axios.put).toHaveBeenCalledWith('/', {});
    expect(response.config.headers?.Authorization).toEqual(AUTHORIZATION);
  });

  it('exposes a get method', async () => {
    (axios as any).get.mockResolvedValue({
      config: { headers: { Authorization: AUTHORIZATION } },
    });

    let http = new Http(BASE_URL, AUTHORIZATION);
    let response = await http.get('/');

    expect(axios.get).toHaveBeenCalledWith('/', { params: undefined });
    expect(response.config.headers?.Authorization).toEqual(AUTHORIZATION);
  });

  it('exposes a download method', async () => {
    (axios as any).get.mockResolvedValue({
      config: { headers: { Authorization: AUTHORIZATION } },
    });

    let http = new Http(BASE_URL, AUTHORIZATION);
    let response = await http.download('/');

    expect(axios.get).toHaveBeenCalledWith('/', {
      params: undefined,
      responseType: 'stream',
    });
    expect(response.config.headers?.Authorization).toEqual(AUTHORIZATION);
  });

  it('exposes a head method', async () => {
    (axios as any).head.mockResolvedValue({
      config: { headers: { Authorization: AUTHORIZATION } },
    });

    let http = new Http(BASE_URL, AUTHORIZATION);
    let response = await http.head('/');

    expect(axios.head).toHaveBeenCalledWith('/', { params: undefined });
    expect(response.config.headers?.Authorization).toEqual(AUTHORIZATION);
  });

  it('exposes a delete method', async () => {
    (axios as any).delete.mockResolvedValue({
      config: { headers: { Authorization: AUTHORIZATION } },
    });

    let http = new Http(BASE_URL, AUTHORIZATION);
    let response = await http.delete('/', {});

    expect(axios.head).toHaveBeenCalledWith('/', {});
    expect(response.config.headers?.Authorization).toEqual(AUTHORIZATION);
  });
});

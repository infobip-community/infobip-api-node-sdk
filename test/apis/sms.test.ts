import { SMS } from '../../src/apis/sms';
import { basicTextMessage, sendQueryMessage } from '../fixtures/sms';
import axios from 'axios';

jest.mock('axios');

beforeAll(() => {
  (axios as any).create.mockReturnThis();
});

const BASE_URL = 'https://example.org';
const USERNAME = 'infobip';
const PASSWORD = 's3cr3t';

describe('SMS', () => {
  it('will throw an error method parameters are wrong', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let sms = new SMS({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    let error: Error = (await sms.send(1)) as Error;

    expect(error).toBeInstanceOf(Error);
  });

  it('can send a text message', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let sms = new SMS({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    await sms.send(basicTextMessage);

    expect(axios.post).toHaveBeenCalledWith(
      '/sms/2/text/advanced',
      basicTextMessage,
      undefined
    );
  });

  it('will throw an error method query parameters are wrong', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let sms = new SMS({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    let error: Error = (await sms.sendQuery(1)) as Error;

    expect(error).toBeInstanceOf(Error);
  });

  it('can send a query text message', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    let sms = new SMS({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    await sms.sendQuery(sendQueryMessage);

    expect(axios.get).toHaveBeenCalledWith(
      '/sms/1/text/query/' +
        '?username=Some%2520User&password=Some%2520Password&' +
        'to=41793026727%2C41793026728%2C41793026729'
    );
  });
});

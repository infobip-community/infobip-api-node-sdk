import { SMS } from '../../src/apis/sms';
import { basicTextMessage } from '../fixtures/sms';
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

  it('will throw an error when getting SMS messages fails', async () => {
    expect.assertions(1);
    (axios as any).get.mockRejectedValue({ message: 'error' });

    let sms = new SMS({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    let error = await sms.get();
    expect(error).toEqual({ message: 'error' });
  });

  it('can get SMS messages', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    let sms = new SMS({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    await sms.get();

    expect(axios.get).toHaveBeenCalledWith('/sms/1/inbox/reports', {
      params: { limit: undefined },
    });
  });

  it('will throw an error when getting SMS delivery reports fails', async () => {
    expect.assertions(1);
    (axios as any).get.mockRejectedValue({ message: 'error' });

    let sms = new SMS({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    let error = await sms.reports.get();
    expect(error).toEqual({ message: 'error' });
  });

  it('can get SMS delivery reports ', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    let sms = new SMS({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    await sms.reports.get({ limit: 10 });

    expect(axios.get).toHaveBeenCalledWith('/sms/1/reports', {
      params: { limit: 10 },
    });
  });

  it('will throw an error when getting SMS message logs fails', async () => {
    expect.assertions(1);
    (axios as any).get.mockRejectedValue({ message: 'error' });

    let sms = new SMS({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    let error = await sms.logs.get();
    expect(error).toEqual({ message: 'error' });
  });

  it('can get SMS message logs ', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    let sms = new SMS({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    await sms.logs.get({ from: 'TestSender' });

    expect(axios.get).toHaveBeenCalledWith('/sms/1/logs', {
      params: { from: 'TestSender' },
    });
  });
});

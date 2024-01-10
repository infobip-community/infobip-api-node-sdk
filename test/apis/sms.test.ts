import { AuthType, Infobip } from '../../src';
import { SMS } from '../../src/apis/sms';
import {
  basicTextMessage,
  previewMessage,
  sendQueryMessage,
  bulkId,
} from '../fixtures/sms';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

jest.mock('axios');

beforeAll(() => {
  (axios as any).create.mockReturnThis();
});

const BASE_URL = 'https://example.org';
const USERNAME = 'infobip';
const PASSWORD = uuid();

describe('SMS', () => {
  it('sending will throw an error when method parameters are wrong', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let sms = new SMS(infobip);
    let error: Error = (await sms.send(1)) as Error;

    expect(error).toBeInstanceOf(Error);
  });

  it('sending will throw an error when the message type is unsupported', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let sms = new SMS(infobip);
    let error: Error = (await sms.send({ type: 'something' })) as Error;

    expect(error.message).toEqual(
      'Invalid message type something. Supported types are: text, binary, query.'
    );
  });

  it('can send a text message', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let sms = new SMS(infobip);
    await sms.send(basicTextMessage);

    expect(axios.post).toHaveBeenCalledWith(
      '/sms/2/text/advanced',
      basicTextMessage,
      undefined
    );
  });

  it('can send a query text message', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let sms = new SMS(infobip);

    await sms.send(sendQueryMessage);

    expect(axios.get).toHaveBeenCalledWith('/sms/1/text/query', {
      params: {
        password: PASSWORD,
        to: '41793026727,41793026728,41793026729',
        type: 'query',
        username: 'infobip',
      },
    });
  });

  it('can preview a text message', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let sms = new SMS(infobip);
    await sms.preview(previewMessage);

    expect(axios.post).toHaveBeenCalledWith(
      '/sms/1/preview',
      previewMessage,
      undefined
    );
  });

  it('will throw an error when preivewing a text message fails', async () => {
    expect.assertions(1);
    (axios as any).post.mockRejectedValue({ message: 'error' });

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let sms = new SMS(infobip);

    let error = await sms.preview(previewMessage);
    expect(error).toEqual({ message: 'error' });
  });

  it('will throw an error when getting SMS messages fails', async () => {
    expect.assertions(1);
    (axios as any).get.mockRejectedValue({ message: 'error' });

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let sms = new SMS(infobip);

    let error = await sms.get();
    expect(error).toEqual({ message: 'error' });
  });

  it('can get SMS messages', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let sms = new SMS(infobip);
    await sms.get();

    expect(axios.get).toHaveBeenCalledWith('/sms/1/inbox/reports', {
      params: { limit: undefined },
    });
  });

  it('will throw an error when getting SMS delivery reports fails', async () => {
    expect.assertions(1);
    (axios as any).get.mockRejectedValue({ message: 'error' });

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let sms = new SMS(infobip);

    let error = await sms.reports.get();
    expect(error).toEqual({ message: 'error' });
  });

  it('can get SMS delivery reports ', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let sms = new SMS(infobip);

    await sms.reports.get({ limit: 10 });

    expect(axios.get).toHaveBeenCalledWith('/sms/1/reports', {
      params: { limit: 10 },
    });
  });

  it('will throw an error when getting SMS message logs fails', async () => {
    expect.assertions(1);
    (axios as any).get.mockRejectedValue({ message: 'error' });

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let sms = new SMS(infobip);

    let error = await sms.logs.get();
    expect(error).toEqual({ message: 'error' });
  });

  it('can get SMS message logs ', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let sms = new SMS(infobip);
    await sms.logs.get({ from: 'TestSender' });

    expect(axios.get).toHaveBeenCalledWith('/sms/1/logs', {
      params: { from: 'TestSender' },
    });
  });

  it('scheduled.get will throw validation errors', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let sms = new SMS(infobip);

    let error: Error = (await sms.scheduled.get(1)) as Error;
    expect(error).toBeInstanceOf(Error);
  });

  it('can get scheduled SMS messages', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let sms = new SMS(infobip);

    await sms.scheduled.get(bulkId);

    expect(axios.get).toHaveBeenCalledWith('/sms/1/bulks', {
      params: { bulkId },
    });
  });

  it('scheduled.reschedule will throw validation errors', async () => {
    expect.assertions(1);
    (axios as any).put.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let sms = new SMS(infobip);

    let error: Error = (await sms.scheduled.reschedule(1, 1)) as Error;
    expect(error).toBeInstanceOf(Error);
  });

  it('can reschedule SMS message', async () => {
    expect.assertions(1);
    (axios as any).put.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let sms = new SMS(infobip);

    await sms.scheduled.reschedule(bulkId, '2022-07-12T16:00:00.000+0000');

    expect(axios.put).toHaveBeenCalledWith(
      '/sms/1/bulks/?bulkId=BULK-ID-123-xyz',
      {
        sendAt: '2022-07-12T16:00:00.000+0000',
      }
    );
  });

  it('status.get will throw validation errors', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let sms = new SMS(infobip);

    let error: Error = (await sms.status.get(1)) as Error;
    expect(error).toBeInstanceOf(Error);
  });

  it('can get scheduled SMS message status', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let sms = new SMS(infobip);

    await sms.status.get(bulkId);

    expect(axios.get).toHaveBeenCalledWith('/sms/1/bulks/status', {
      params: { bulkId },
    });
  });

  it('status.update will throw validation errors', async () => {
    expect.assertions(1);
    (axios as any).put.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let sms = new SMS(infobip);

    let error: Error = (await sms.status.update(1, 1)) as Error;
    expect(error).toBeInstanceOf(Error);
  });

  it('can change SMS message status', async () => {
    expect.assertions(1);
    (axios as any).put.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let sms = new SMS(infobip);

    await sms.status.update(bulkId, 'PENDING');

    expect(axios.put).toHaveBeenCalledWith(
      '/sms/1/bulks/status/?bulkId=BULK-ID-123-xyz',
      {
        status: 'PENDING',
      }
    );
  });
});

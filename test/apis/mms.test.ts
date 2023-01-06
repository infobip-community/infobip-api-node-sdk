import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { MMS } from '../../src/apis/mms';
import { advancedMessage } from '../fixtures/mms';

jest.mock('axios');

beforeAll(() => {
  (axios as any).create.mockReturnThis();
});

const BASE_URL = 'https://example.org';
const AUTHORIZATION = uuid();

describe('MMS', () => {
  it('sending will throw an error when method parameters are wrong', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let mms = new MMS({
      baseUrl: BASE_URL,
      authorization: AUTHORIZATION,
    });
    let error: Error = (await mms.send(1)) as Error;

    expect(error).toBeInstanceOf(Error);
  });

  it('sending will throw an error when the message type is unsupported', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let mms = new MMS({
      baseUrl: BASE_URL,
      authorization: AUTHORIZATION,
    });
    let error: Error = (await mms.send({ type: 'something' })) as Error;

    expect(error.message).toEqual(
      'Invalid message type something. Supported types are: advanced, single.'
    );
  });

  it('sending single mms will throw error', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let mms = new MMS({
      baseUrl: BASE_URL,
      authorization: AUTHORIZATION,
    });
    let error: Error = (await mms.send({ type: 'single' })) as Error;

    expect(error.message).toEqual(
      'The send single MMS message endpoint is deprecated as of May 4th 2022.'
    );
  });

  it('can send an advanced message', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let mms = new MMS({
      baseUrl: BASE_URL,
      authorization: AUTHORIZATION,
    });
    await mms.send(advancedMessage);

    expect(axios.post).toHaveBeenCalledWith(
      '/mms/1/advanced',
      advancedMessage,
      undefined
    );
  });

  it('will throw an error when getting MMS messages fails', async () => {
    expect.assertions(1);
    (axios as any).get.mockRejectedValue({ message: 'error' });

    let mms = new MMS({
      baseUrl: BASE_URL,
      authorization: AUTHORIZATION,
    });

    let error = await mms.get();
    expect(error).toEqual({ message: 'error' });
  });

  it('can get MMS messages', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    let mms = new MMS({
      baseUrl: BASE_URL,
      authorization: AUTHORIZATION,
    });
    await mms.get();

    expect(axios.get).toHaveBeenCalledWith('/mms/1/inbox/reports', {
      params: { limit: undefined },
    });
  });

  it('will throw an error when getting MMS delivery reports fails', async () => {
    expect.assertions(1);
    (axios as any).get.mockRejectedValue({ message: 'error' });

    let mms = new MMS({
      baseUrl: BASE_URL,
      authorization: AUTHORIZATION,
    });

    let error = await mms.reports.get();
    expect(error).toEqual({ message: 'error' });
  });

  it('can get MMS delivery reports ', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    let mms = new MMS({
      baseUrl: BASE_URL,
      authorization: AUTHORIZATION,
    });

    await mms.reports.get({ limit: 10 });

    expect(axios.get).toHaveBeenCalledWith('/mms/1/reports', {
      params: { limit: 10 },
    });
  });
});

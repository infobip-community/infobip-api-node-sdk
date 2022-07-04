import { Email } from '../../src/apis/email';
import FormData from 'form-data';

import axios from 'axios';
import { EmailStatus } from '../../src/utils/email-status-type';
jest.mock('axios');

beforeAll(() => {
  (axios as any).create.mockReturnThis();
});

const BASE_URL = 'https://example.org';
const USERNAME = 'infobip';
const PASSWORD = 's3cr3t';

describe('Email', () => {
  it('exposes a send method', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let email = new Email({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'test',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/2/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts an html argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let email = new Email({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      html: 'test',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/2/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts a templateId argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let email = new Email({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      templateId: 'test',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/2/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that throws an error', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let email = new Email({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    let error = (await email.send('')) as Error;

    expect(error.message).toEqual('email.to is required.');
  });

  it('exposes a send method that throws an error if text, html or templateId is not present', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let email = new Email({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    let error = (await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
    })) as Error;

    expect(error.message).toEqual(
      'Email must contain at least one of these (text, html or templateId).'
    );
  });

  it('exposes a validate method', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let email = new Email({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    await email.validate('testing@example.com');

    expect(axios.post).toHaveBeenCalledWith(
      '/email/2/validation',
      {
        to: 'testing@example.com',
      },
      undefined
    );
  });

  it('exposes a validate method that throws an error', async () => {
    expect.assertions(1);
    (axios as any).post.mockRejectedValue({ message: 'error' });

    let email = new Email({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    let error = await email.validate('testing');

    expect(error).toEqual({ message: 'error' });
  });

  it('exposes a get method', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    let email = new Email({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    await email.get('testing');

    expect(axios.get).toHaveBeenCalledWith('/email/1/bulks', {
      params: { bulkId: 'testing' },
    });
  });

  it('exposes a get method that throws an error', async () => {
    expect.assertions(1);
    (axios as any).get.mockRejectedValue({ message: 'error' });

    let email = new Email({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    let error = await email.get('testing');

    expect(error).toEqual({ message: 'error' });
  });

  it('exposes a reschedule method', async () => {
    expect.assertions(1);
    (axios as any).put.mockResolvedValue({});

    let email = new Email({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    const date = new Date().toISOString();
    await email.reschedule('testing', date);

    expect(axios.put).toHaveBeenCalledWith('/email/1/bulks?bulkId=testing', {
      sendAt: date,
    });
  });

  it('exposes a reschedule method that throws an error', async () => {
    expect.assertions(1);
    (axios as any).put.mockRejectedValue({ message: 'error' });

    let email = new Email({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    let error = await email.reschedule('testing', new Date().toISOString());

    expect(error).toEqual({ message: 'error' });
  });

  it('exposes a log property with a get method', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    let email = new Email({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    await email.log.get();

    expect(axios.get).toHaveBeenCalledWith('/email/1/logs', {
      params: undefined,
    });
  });

  it('exposes a log property with a get method that throws an error', async () => {
    expect.assertions(1);
    (axios as any).get.mockRejectedValue({ message: 'error' });

    let email = new Email({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    let error = await email.log.get();

    expect(error).toEqual({ message: 'error' });
  });

  it('exposes a report property with a get method', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    let email = new Email({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    await email.report.get();

    expect(axios.get).toHaveBeenCalledWith('/email/1/reports', {
      params: undefined,
    });
  });

  it('exposes a report property with a get method that throws an error', async () => {
    expect.assertions(1);
    (axios as any).get.mockRejectedValue({ message: 'error' });

    let email = new Email({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    let error = await email.report.get();

    expect(error).toEqual({ message: 'error' });
  });

  it('exposes a status property with a get method', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    let email = new Email({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    await email.status.get('testing');

    expect(axios.get).toHaveBeenCalledWith('/email/1/bulks/status', {
      params: {
        bulkId: 'testing',
      },
    });
  });

  it('exposes a status property with a get method that throws an error', async () => {
    expect.assertions(1);
    (axios as any).get.mockRejectedValue({ message: 'error' });

    let email = new Email({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    let error = (await email.status.get()) as Error;

    expect(error.message).toEqual('bulkId is required.');
  });

  it('exposes a status property with an update method', async () => {
    expect.assertions(1);
    (axios as any).put.mockResolvedValue({});

    let email = new Email({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    await email.status.update('testing', EmailStatus.Paused);

    expect(axios.put).toHaveBeenCalledWith(
      '/email/1/bulks/status?bulkId=testing',
      {
        status: 'PAUSED',
      }
    );
  });

  it('exposes a status property with an update method that throws an error', async () => {
    expect.assertions(1);
    (axios as any).get.mockRejectedValue({ message: 'error' });

    let email = new Email({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    let error = (await email.status.update()) as Error;

    expect(error.message).toEqual('bulkId is required.');
  });
});

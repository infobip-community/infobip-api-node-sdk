import { Email } from '../../src/apis/email';
import FormData from 'form-data';
import { v4 as uuid } from 'uuid';
import Fs from 'fs';

import axios from 'axios';
import { EmailStatus } from '../../src/utils/email-status-type';
import { AuthType, Infobip } from '../../src';
jest.mock('axios');

beforeAll(() => {
  (axios as any).create.mockReturnThis();
});

const BASE_URL = 'https://example.org';
const USERNAME = 'infobip';
const PASSWORD = uuid();

describe('Email', () => {
  it('exposes a send method', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'test',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method with multiple to', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: ['test@example.com', 'example@example.com'],
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'test',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method with single cc', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      cc: 'example@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'test',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method with multiple cc', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@test.com',
      cc: ['test@example.com', 'example@example.com'],
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'test',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method with single bcc', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      bcc: 'example@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'test',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method with multiple bcc', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@test.com',
      bcc: ['test@example.com', 'example@example.com'],
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'test',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts a html argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      html: 'test',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts a ampHtml argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      html: 'test',
      ampHtml: 'test',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that throws an error if ampHtml is included with out a html argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    let error = (await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      ampHtml: 'test',
      text: 'not html',
    })) as Error;
    expect(error.message).toEqual('email.html is required.');
  });

  it('exposes a send method that accepts a templateId argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      templateId: 'test',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts a attachment argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'hello world',
      attachment: [
        {
          data: Fs.readFileSync('./test/apis/email.test.ts'),
          name: 'email.test.ts',
        },
      ],
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts a inlineImage argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'hello world',
      inlineImage: [
        {
          data: Fs.readFileSync('./test/apis/email.test.ts'),
          name: 'email.test.ts',
        },
      ],
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts a intermediateReport argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'hello world',
      intermediateReport: true,
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts a notifyUrl argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'hello world',
      notifyUrl: 'http://notifyUrl.test',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts a notifyContentType argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'hello world',
      notifyContentType: 'notifyContentType',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts a callbackData argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'hello world',
      callbackData: 'callbackData',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts a track argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'hello world',
      track: true,
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts a trackClicks argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'hello world',
      trackClicks: true,
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts a trackOpens argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'hello world',
      trackOpens: true,
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts a trackingUrl argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'hello world',
      trackingUrl: 'http://trackingthis.com',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts a bulkId argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'hello world',
      bulkId: 'bigLongBulkGuid',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts a messageId argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'hello world',
      messageId: 'thisIsYourMessageId',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts a replyTo argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'hello world',
      replyTo: 'test@example.com',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts a defaultPlaceholders argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'hello world',
      defaultPlaceholders: '{{placeholder}}',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts a preserveRecipients argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'hello world',
      preserveRecipients: true,
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts a sendAt argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'hello world',
      sendAt: 'YYYY-MM-DD',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts a landingPagePlaceholders argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'hello world',
      landingPagePlaceholders: '{{placeholder}}',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts a landingPageId argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'hello world',
      landingPageId: 'LandingPageID',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts a templateLanguageVersion argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'hello world',
      templateLanguageVersion: 'versionString',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts a applicationId argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'hello world',
      applicationId: 'appID',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that accepts a entityId argument', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'hello world',
      entityId: 'entityId',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/email/3/send',
      jasmine.any(FormData),
      jasmine.anything()
    );
  });

  it('exposes a send method that throws an error', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    let error = (await email.send('')) as Error;

    expect(error.message).toEqual('email must be an object.');
  });

  it('exposes a send method that throws an error if text, html or templateId is not present', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    let error = (await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
    })) as Error;

    expect(error.message).toEqual(
      'Email must contain at least one of these (text, html or templateId).'
    );
  });

  it('exposes a send method that throws an error if attachment is the wrong type', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    let error = (await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'help',
      attachment: 1,
    })) as Error;
    expect(error.message).toEqual('email.attachment must be an array.');
  });

  it('exposes a send method that throws an error if attachment is missing data', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    let error = (await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'help',
      attachment: [{ name: 'hello.txt' }],
    })) as Error;
    expect(error.message).toEqual('email.attachment[].data is required.');
  });

  it('exposes a send method that throws an error if attachment is missing name', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    let error = (await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'help',
      attachment: [{ data: 'plaintext' }],
    })) as Error;
    expect(error.message).toEqual('email.attachment[].name is required.');
  });

  it('exposes a send method that throws an error if inlineImage is the wrong type', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    let error = (await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'help',
      inlineImage: 1,
    })) as Error;
    expect(error.message).toEqual('email.inlineImage must be an array.');
  });

  it('exposes a send method that throws an error if inlineImage is missing data', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    let error = (await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'help',
      inlineImage: [{ name: 'hello.jpg' }],
    })) as Error;
    expect(error.message).toEqual('email.inlineImage[].data is required.');
  });

  it('exposes a send method that throws an error if inlineImage is missing name', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    let error = (await email.send({
      to: 'test@example.com',
      from: 'Tests <testing@example.com>',
      subject: 'Testing',
      text: 'help',
      inlineImage: [{ data: 'plaintext' }],
    })) as Error;
    expect(error.message).toEqual('email.inlineImage[].name is required.');
  });

  it('exposes a validate method', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
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

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    let error = await email.validate('testing');

    expect(error).toEqual({ message: 'error' });
  });

  it('exposes a get method', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.get('testing');

    expect(axios.get).toHaveBeenCalledWith('/email/1/bulks', {
      params: { bulkId: 'testing' },
    });
  });

  it('exposes a get method that throws an error', async () => {
    expect.assertions(1);
    (axios as any).get.mockRejectedValue({ message: 'error' });

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    let error = await email.get('testing');

    expect(error).toEqual({ message: 'error' });
  });

  it('exposes a reschedule method', async () => {
    expect.assertions(1);
    (axios as any).put.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    const date = new Date().toISOString();
    await email.reschedule('testing', date);

    expect(axios.put).toHaveBeenCalledWith('/email/1/bulks?bulkId=testing', {
      sendAt: date,
    });
  });

  it('exposes a reschedule method that throws an error', async () => {
    expect.assertions(1);
    (axios as any).put.mockRejectedValue({ message: 'error' });

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    let error = await email.reschedule('testing', new Date().toISOString());

    expect(error).toEqual({ message: 'error' });
  });

  it('exposes a log property with a get method', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.log.get();

    expect(axios.get).toHaveBeenCalledWith('/email/1/logs', {
      params: undefined,
    });
  });

  it('exposes a log property with a get method that throws an error', async () => {
    expect.assertions(1);
    (axios as any).get.mockRejectedValue({ message: 'error' });

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    let error = await email.log.get();

    expect(error).toEqual({ message: 'error' });
  });

  it('exposes a report property with a get method', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    await email.report.get();

    expect(axios.get).toHaveBeenCalledWith('/email/1/reports', {
      params: undefined,
    });
  });

  it('exposes a report property with a get method that throws an error', async () => {
    expect.assertions(1);
    (axios as any).get.mockRejectedValue({ message: 'error' });

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    let error = await email.report.get();

    expect(error).toEqual({ message: 'error' });
  });

  it('exposes a status property with a get method', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
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

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    let error = (await email.status.get()) as Error;

    expect(error.message).toEqual('bulkId is required.');
  });

  it('exposes a status property with an update method', async () => {
    expect.assertions(1);
    (axios as any).put.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
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

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let email = new Email(infobip);
    let error = (await email.status.update()) as Error;

    expect(error.message).toEqual('bulkId is required.');
  });
});

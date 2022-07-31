import { Auth2FA } from '../../src/apis/auth-2fa';
import {
  Auth2FAApplication,
  Auth2FAMessageTemplate,
  Auth2FAPinCode,
  Auth2FAVerificationStatus,
} from '../../src/models/auth-2fa-models';

import axios from 'axios';

jest.mock('axios');

beforeAll(() => {
  (axios as any).create.mockReturnThis();
});

const BASE_URL = 'https://example.org';
const USERNAME = 'infobip';
const PASSWORD = 's3cr3t';

describe('2FA', () => {
  it('Get Applications', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    await auth2fa.getApplications();

    expect(axios.get).toHaveBeenCalledWith('/2fa/2/applications', {
      params: undefined,
    });
  });

  it('Get Applications throws an error response', async () => {
    expect.assertions(1);
    (axios as any).get.mockRejectedValue({ message: 'error' });

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    let error = await auth2fa.getApplications();

    expect(error).toEqual({ message: 'error' });
  });

  it('Create Application', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    const reqBody: Auth2FAApplication = {
      name: 'test',
    };
    await auth2fa.createApplication(reqBody);

    expect(axios.post).toHaveBeenCalledWith(
      '/2fa/2/applications',
      reqBody,
      undefined
    );
  });

  it('Call Create Application with wrong parameters', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    let error: Error = (await auth2fa.createApplication(1)) as Error;

    expect(error).toBeInstanceOf(Error);
  });

  it('Get Application', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    await auth2fa.getApplication('appId');

    expect(axios.get).toHaveBeenCalledWith('/2fa/2/applications/appId', {
      params: undefined,
    });
  });

  it('Get Application throws an error response', async () => {
    expect.assertions(1);
    (axios as any).get.mockRejectedValue({ message: 'error' });

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    let error: Error = (await auth2fa.getApplication('appId')) as Error;

    expect(error).toEqual({ message: 'error' });
  });

  it('Update Application', async () => {
    expect.assertions(1);
    (axios as any).put.mockResolvedValue({});

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    const reqBody: Auth2FAApplication = {
      name: 'test',
    };
    await auth2fa.updateApplication('appId', reqBody);

    expect(axios.put).toHaveBeenCalledWith('/2fa/2/applications/appId', {
      name: 'test',
    });
  });

  it('Call Update Application with wrong parameters', async () => {
    expect.assertions(1);
    (axios as any).put.mockResolvedValue({});

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    let error: Error = (await auth2fa.updateApplication('test', 1)) as Error;

    expect(error).toBeInstanceOf(Error);
  });

  it('Get Message Templates', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    await auth2fa.getMessageTemplates('8F9B78BC039C09E45F35BFE');

    expect(
      axios.get
    ).toHaveBeenCalledWith(
      '/2fa/2/applications/8F9B78BC039C09E45F35BFE/messages',
      { params: undefined }
    );
  });

  it('Get Message Templates throws an error response', async () => {
    expect.assertions(1);
    (axios as any).get.mockRejectedValue({ message: 'error' });

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    let error: Error = (await auth2fa.getMessageTemplates(
      '8F9B78BC039C09E45F35BFE'
    )) as Error;

    expect(error).toEqual({ message: 'error' });
  });

  it('Create Message Template', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    const reqBody: Auth2FAMessageTemplate = {
      messageText: 'Here is your pin: ',
      pinType: 'NUMERIC',
      regional: {
        indiaDlt: {
          principalEntityId: 'test India object!',
        },
      },
    };
    await auth2fa.createMessageTemplate('8F9B78BC039C09E45F35BFE', reqBody);

    expect(axios.post).toHaveBeenCalledWith(
      '/2fa/2/applications/8F9B78BC039C09E45F35BFE/messages',
      reqBody,
      undefined
    );
  });

  it('Create Message Template with wrong parameters', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    let error: Error = (await auth2fa.createMessageTemplate('1', 1)) as Error;

    expect(error).toBeInstanceOf(Error);
  });

  it('Get Message Template', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    await auth2fa.getMessageTemplate('8F9B78', '1C8DA3');

    expect(axios.get).toHaveBeenCalledWith(
      '/2fa/2/applications/8F9B78/messages/1C8DA3',
      {
        params: undefined,
      }
    );
  });

  it('Get Message Template throws an error response', async () => {
    expect.assertions(1);
    (axios as any).get.mockRejectedValue({ message: 'error' });

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    let error: Error = (await auth2fa.getMessageTemplate(
      '8F9B78',
      '1C8DA3'
    )) as Error;

    expect(error).toEqual({ message: 'error' });
  });

  it('Update Message Template', async () => {
    expect.assertions(1);
    (axios as any).put.mockResolvedValue({});

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    const reqBody: Auth2FAMessageTemplate = {
      messageText: 'Here is your pin: ',
      pinType: 'NUMERIC',
      regional: {
        indiaDlt: {
          principalEntityId: 'test India object!',
        },
      },
    };
    await auth2fa.updateMessageTemplate('8F9B78', '1C8DA3', reqBody);

    expect(axios.put).toHaveBeenCalledWith(
      '/2fa/2/applications/8F9B78/messages/1C8DA3',
      reqBody
    );
  });

  it('Call Update Message Template with wrong parameters', async () => {
    expect.assertions(1);
    (axios as any).put.mockResolvedValue({});

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    const reqBody = {
      messageText: 'Here is your wrong parameters',
      pinType: 'NUMERIC',
      regional: {
        indiaDlt: {
          test: 'test',
        },
      },
    };
    let error: Error = (await auth2fa.updateMessageTemplate(
      'test',
      'test',
      reqBody
    )) as Error;

    expect(error).toBeInstanceOf(Error);
  });

  it('Send PIN code over SMS', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    const reqBody: Auth2FAPinCode = {
      applicationId: '8F9B78',
      messageId: '1C8DA3',
      to: '41793026727',
    };
    await auth2fa.sendPINCodeSMS(reqBody, false);

    expect(axios.post).toHaveBeenCalledWith(
      '/2fa/2/pin/?ncNeeded=false',
      reqBody,
      undefined
    );
  });

  it('Send PIN code over SMS with wrong parameters', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    let error: Error = (await auth2fa.sendPINCodeSMS(1, false)) as Error;

    expect(error).toBeInstanceOf(Error);
  });

  it('Resend PIN code over SMS with defined body', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    await auth2fa.resendPINCodeSMS('1ABC2D', {
      placeholders: { firstName: 'John' },
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/2fa/2/pin/1ABC2D/resend',
      {
        placeholders: { firstName: 'John' },
      },
      undefined
    );
  });

  it('Resend PIN code over SMS without defined body', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    await auth2fa.resendPINCodeSMS('22CGH3');

    expect(axios.post).toHaveBeenCalledWith(
      '/2fa/2/pin/22CGH3/resend',
      {},
      undefined
    );
  });

  it('Resend PIN code over SMS returns error', async () => {
    expect.assertions(1);
    (axios as any).post.mockRejectedValue({ message: 'error' });

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    let error: Error = (await auth2fa.resendPINCodeSMS('22CGH3')) as Error;

    expect(error).toEqual({ message: 'error' });
  });

  it('Send PIN code over Voice', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    const reqBody: Auth2FAPinCode = {
      applicationId: '8F9B78',
      messageId: '1C8DA3',
      to: '41793026727',
    };
    await auth2fa.sendPINCodeVoice(reqBody);

    expect(axios.post).toHaveBeenCalledWith(
      '/2fa/2/pin/voice',
      reqBody,
      undefined
    );
  });

  it('Send PIN code over Voice with wrong parameters', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    let error: Error = (await auth2fa.sendPINCodeVoice(1)) as Error;

    expect(error).toBeInstanceOf(Error);
  });

  it('Resend PIN code over Voice with defined body', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    await auth2fa.resendPINCodeVoice('1ABC2D', {
      placeholders: { firstName: 'John' },
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/2fa/2/pin/1ABC2D/resend/voice',
      {
        placeholders: { firstName: 'John' },
      },
      undefined
    );
  });

  it('Resend PIN code over Voice without defined body', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    await auth2fa.resendPINCodeVoice('22CGH3');

    expect(axios.post).toHaveBeenCalledWith(
      '/2fa/2/pin/22CGH3/resend/voice',
      {},
      undefined
    );
  });

  it('Resend PIN code over Voice returns error', async () => {
    expect.assertions(1);
    (axios as any).post.mockRejectedValue({ message: 'error' });

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    let error: Error = (await auth2fa.resendPINCodeVoice('22CGH3')) as Error;

    expect(error).toEqual({ message: 'error' });
  });

  it('Verify phone number', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    await auth2fa.verifyPhoneNumber('1ABC2D', { pin: '1111' });

    expect(axios.post).toHaveBeenCalledWith(
      '/2fa/2/pin/1ABC2D/verify',
      { pin: '1111' },
      undefined
    );
  });

  it('Verify phone number with wrong parameters', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    let error: Error = (await auth2fa.verifyPhoneNumber('1ABC2D', 1)) as Error;

    expect(error).toBeInstanceOf(Error);
  });

  it('Get verification status', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    const queryParamaters: Auth2FAVerificationStatus = {
      msisdn: '385717284759547',
    };

    await auth2fa.getVerificationStatus('appId', queryParamaters);

    expect(
      axios.get
    ).toHaveBeenCalledWith(
      '/2fa/2/applications/appId/verifications/?msisdn=385717284759547',
      { params: undefined }
    );
  });

  it('Get verification status with wrong parameters', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    let auth2fa = new Auth2FA({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });

    let error: Error = (await auth2fa.getVerificationStatus(
      'appId',
      1
    )) as Error;

    expect(error).toBeInstanceOf(Error);
  });
});

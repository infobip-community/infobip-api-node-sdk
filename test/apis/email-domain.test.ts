import { v4 as uuid } from 'uuid';
import { EmailDomain } from '../../src/apis/email-domain';

import axios from 'axios';
import { AuthType, Infobip } from '../../src';
jest.mock('axios');

beforeAll(() => {
  (axios as any).create.mockReturnThis();
});

const BASE_URL = 'https://example.org';
const USERNAME = 'infobip';
const PASSWORD = uuid();

describe('EmailDomain', () => {
  it('exposes a get method', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let domain = new EmailDomain(infobip);
    await domain.get();

    expect(axios.get).toHaveBeenCalledWith('/email/1/domains', {
      params: undefined,
    });
  });

  it('exposes a get method with details', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let domain = new EmailDomain(infobip);
    await domain.get('example.com');

    expect(axios.get).toHaveBeenCalledWith('/email/1/domains/example.com', {
      params: undefined,
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
    let domain = new EmailDomain(infobip);
    let error = await domain.get();

    expect(error).toEqual({ message: 'error' });
  });

  it('exposes an add method', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let domain = new EmailDomain(infobip);
    await domain.add('example.com');

    expect(axios.post).toHaveBeenCalledWith(
      '/email/1/domains',
      {
        domainName: 'example.com',
      },
      undefined
    );
  });

  it('exposes an add method that throws an error', async () => {
    expect.assertions(1);
    (axios as any).post.mockRejectedValue({ message: 'error' });

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let domain = new EmailDomain(infobip);
    let error = await domain.add('example');

    expect(error).toEqual({ message: 'error' });
  });

  it('exposes a verify method', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let domain = new EmailDomain(infobip);
    await domain.verify('example.com');

    expect(axios.post).toHaveBeenCalledWith(
      '/email/1/domains/example.com/verify',
      {},
      undefined
    );
  });

  it('exposes a verify method that throws an error', async () => {
    expect.assertions(1);
    (axios as any).post.mockRejectedValue({ message: 'error' });

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let domain = new EmailDomain(infobip);
    let error = await domain.verify('example');

    expect(error).toEqual({ message: 'error' });
  });

  it('exposes a tracking method', async () => {
    expect.assertions(1);
    (axios as any).put.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let domain = new EmailDomain(infobip);
    await domain.tracking('example.com', {});

    expect(axios.put).toHaveBeenCalledWith(
      '/email/1/domains/example.com/tracking',
      {}
    );
  });

  it('exposes a tracking method that throws an error', async () => {
    expect.assertions(1);
    (axios as any).put.mockRejectedValue({ message: 'error' });

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let domain = new EmailDomain(infobip);
    let error = await domain.tracking('example', {});

    expect(error).toEqual({ message: 'error' });
  });

  it('exposes a delete method', async () => {
    expect.assertions(1);
    (axios as any).delete.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let domain = new EmailDomain(infobip);
    await domain.delete('example.com');

    expect(axios.delete).toHaveBeenCalledWith('/email/1/domains/example.com', {
      data: undefined,
    });
  });

  it('exposes a delete method that throws an error', async () => {
    expect.assertions(1);
    (axios as any).delete.mockRejectedValue({ message: 'error' });

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let domain = new EmailDomain(infobip);
    let error = await domain.delete('example');

    expect(error).toEqual({ message: 'error' });
  });
});

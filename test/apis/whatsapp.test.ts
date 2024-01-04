import { WhatsApp } from '../../src/apis/whatsapp';
import {
  templateMessage,
  textMessage,
  documentMessage,
  imageMessage,
  audioMessage,
  videoMessage,
  stickerMessage,
  locationMessage,
  contactMessage,
  interactiveButtonsMessage,
  interactiveListMessage,
  interactiveMultiProductMessage,
  interactiveProductMessage,
} from '../fixtures/whatsapp';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { AuthType, Infobip } from '../../src';
jest.mock('axios');

beforeAll(() => {
  (axios as any).create.mockReturnThis();
});

const BASE_URL = 'https://example.org';
const USERNAME = 'infobip';
const PASSWORD = uuid();

describe('Whatsapp', () => {
  it('will throw an error if the message type is not supported', async () => {
    expect.assertions(2);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    let error: Error = (await whatsapp.send(1)) as Error;

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toEqual(
      'Invalid message type undefined. Supported types are: template, text, document, image, audio, video, sticker, location, contact, interactive-buttons, interactive-list, interactive-product, interactive-multi-product.'
    );
  });

  it('can send a template message', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    await whatsapp.send(templateMessage);

    expect(axios.post).toHaveBeenCalledWith(
      '/whatsapp/1/message/template',
      templateMessage,
      undefined
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
    let whatsapp = new WhatsApp(infobip);
    await whatsapp.send(textMessage);

    expect(axios.post).toHaveBeenCalledWith(
      '/whatsapp/1/message/text',
      textMessage,
      undefined
    );
  });

  it('can send a document message', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    await whatsapp.send(documentMessage);

    expect(axios.post).toHaveBeenCalledWith(
      '/whatsapp/1/message/document',
      documentMessage,
      undefined
    );
  });

  it('can send a image message', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    await whatsapp.send(imageMessage);

    expect(axios.post).toHaveBeenCalledWith(
      '/whatsapp/1/message/image',
      imageMessage,
      undefined
    );
  });

  it('can send a audio message', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    await whatsapp.send(audioMessage);

    expect(axios.post).toHaveBeenCalledWith(
      '/whatsapp/1/message/audio',
      audioMessage,
      undefined
    );
  });

  it('can send a video message', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    await whatsapp.send(videoMessage);

    expect(axios.post).toHaveBeenCalledWith(
      '/whatsapp/1/message/video',
      videoMessage,
      undefined
    );
  });

  it('can send a sticker message', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    await whatsapp.send(stickerMessage);

    expect(axios.post).toHaveBeenCalledWith(
      '/whatsapp/1/message/sticker',
      stickerMessage,
      undefined
    );
  });

  it('can send a location message', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    await whatsapp.send(locationMessage);

    expect(axios.post).toHaveBeenCalledWith(
      '/whatsapp/1/message/location',
      locationMessage,
      undefined
    );
  });

  it('can send a contact message', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    await whatsapp.send(contactMessage);

    expect(axios.post).toHaveBeenCalledWith(
      '/whatsapp/1/message/contact',
      contactMessage,
      undefined
    );
  });

  it('can send a interactive-buttons message', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    await whatsapp.send(interactiveButtonsMessage);

    expect(axios.post).toHaveBeenCalledWith(
      '/whatsapp/1/message/interactive/buttons',
      interactiveButtonsMessage,
      undefined
    );
  });

  it('can send a interactive-list message', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    await whatsapp.send(interactiveListMessage);

    expect(axios.post).toHaveBeenCalledWith(
      '/whatsapp/1/message/interactive/list',
      interactiveListMessage,
      undefined
    );
  });

  it('can send a interactive-product message', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    await whatsapp.send(interactiveProductMessage);

    expect(axios.post).toHaveBeenCalledWith(
      '/whatsapp/1/message/interactive/product',
      interactiveProductMessage,
      undefined
    );
  });

  it('can send a interactive-multi-product message', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    await whatsapp.send(interactiveMultiProductMessage);

    expect(axios.post).toHaveBeenCalledWith(
      '/whatsapp/1/message/interactive/multi-product',
      interactiveMultiProductMessage,
      undefined
    );
  });

  it('can download media', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    await whatsapp.media.download('447860099299', '1234-abcd');

    expect(axios.get).toHaveBeenCalledWith(
      '/whatsapp/1/senders/447860099299/media/1234-abcd',
      {
        responseType: 'stream',
      }
    );
  });

  it('media download will throw an error if required values are not passed', async () => {
    expect.assertions(2);
    (axios as any).get.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    let error = await whatsapp.media.download();

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toEqual('sender is required.');
  });

  it('can download media metadata', async () => {
    expect.assertions(1);
    (axios as any).head.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    await whatsapp.media.metadata('447860099299', '1234-abcd');

    expect(axios.head).toHaveBeenCalledWith(
      '/whatsapp/1/senders/447860099299/media/1234-abcd',
      {
        params: undefined,
      }
    );
  });

  it('media metadata download will throw an error if required values are not passed', async () => {
    expect.assertions(2);
    (axios as any).get.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    let error = await whatsapp.media.metadata();

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toEqual('sender is required.');
  });

  it('can delete media', async () => {
    expect.assertions(1);
    (axios as any).delete.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    await whatsapp.media.delete('447860099299', 'http://example.com/');

    expect(axios.delete).toHaveBeenCalledWith(
      '/whatsapp/1/senders/447860099299/media/',
      {
        data: {
          url: 'http://example.com/',
        },
      }
    );
  });

  it('media download will throw an error if required values are not passed', async () => {
    expect.assertions(2);
    (axios as any).delete.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    let error = await whatsapp.media.delete();

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toEqual('sender is required.');
  });

  it('can mark messages as read', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    await whatsapp.markAsRead('447860099299', 'ABCD1234');

    expect(axios.post).toHaveBeenCalledWith(
      '/whatsapp/1/senders/447860099299/message/ABCD1234/read',
      {},
      undefined
    );
  });

  it('will throw error if marking messages as read fails', async () => {
    expect.assertions(2);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    let error = (await whatsapp.markAsRead('', '')) as Error;

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toEqual('sender is required.');
  });

  it('can get templates', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    await whatsapp.template.get('447860099299');

    expect(axios.get).toHaveBeenCalledWith(
      '/whatsapp/2/senders/447860099299/templates',
      {
        params: undefined,
      }
    );
  });

  it('will throw error if getting templates fails', async () => {
    expect.assertions(2);
    (axios as any).get.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    let error = (await whatsapp.template.get()) as Error;

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toEqual('sender is required.');
  });

  it('can create templates', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);

    await whatsapp.template.create('447860099299', {
      name: 'test_template',
      language: 'en',
      category: 'AUTO_REPLY',
      structure: {
        body: {
          text: 'Hello {{1}}',
        },
      },
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/whatsapp/2/senders/447860099299/templates',
      {
        name: 'test_template',
        language: 'en',
        category: 'AUTO_REPLY',
        structure: {
          body: {
            text: 'Hello {{1}}',
          },
        },
      },
      undefined
    );
  });

  it('will throw error if creating templates fails', async () => {
    expect.assertions(2);
    (axios as any).post.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    let error = (await whatsapp.template.create()) as Error;

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toEqual('sender is required.');
  });

  it('can delete templates', async () => {
    expect.assertions(1);
    (axios as any).delete.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    await whatsapp.template.delete('447860099299', 'test_template');

    expect(
      axios.delete
    ).toHaveBeenCalledWith(
      '/whatsapp/2/senders/447860099299/templates/test_template',
      { params: undefined }
    );
  });

  it('will throw error if deleting templates fails', async () => {
    expect.assertions(2);
    (axios as any).delete.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    let error = (await whatsapp.template.delete()) as Error;

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toEqual('sender is required.');
  });

  it('can get identity', async () => {
    expect.assertions(1);
    (axios as any).get.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    await whatsapp.identity.get('447860099299', '447860099200');

    expect(
      axios.get
    ).toHaveBeenCalledWith(
      '/whatsapp/1/447860099299/contacts/447860099200/identity',
      { params: undefined }
    );
  });

  it('will throw error if getting identity fails', async () => {
    expect.assertions(2);
    (axios as any).get.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    let error = (await whatsapp.identity.get()) as Error;

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toEqual('sender is required.');
  });

  it('can confirm identity', async () => {
    expect.assertions(1);
    (axios as any).put.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    await whatsapp.identity.confirm(
      '447860099299',
      '447860099200',
      'ABCD1234=='
    );

    expect(
      axios.put
    ).toHaveBeenCalledWith(
      '/whatsapp/1/447860099299/contacts/447860099200/identity',
      { hash: 'ABCD1234==' }
    );
  });

  it('will throw error if confirming identity fails', async () => {
    expect.assertions(2);
    (axios as any).put.mockResolvedValue({});

    const infobip = new Infobip({
      baseUrl: BASE_URL,
      authType: AuthType.Basic,
      username: USERNAME,
      password: PASSWORD,
    });
    let whatsapp = new WhatsApp(infobip);
    let error = (await whatsapp.identity.confirm()) as Error;

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toEqual('sender is required.');
  });
});

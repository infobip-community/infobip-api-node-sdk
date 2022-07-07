import {
  validateWhatsappSend,
  validateWhatsappTemplateCreate,
} from '../../../src/utils/validators/whatsapp';

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
  interactiveButtonsWithHeaderMessage,
} from '../../fixtures/whatsapp';

describe('validateWhatsappTemplateCreate', () => {
  it('validates required parameters for template messages', () => {
    expect(validateWhatsappSend(templateMessage)).toBeTruthy();
  });

  it('validates required parameters for text messages', () => {
    expect(validateWhatsappSend(textMessage)).toBeTruthy();
  });

  it('validates required parameters for audio messages', () => {
    expect(validateWhatsappSend(audioMessage)).toBeTruthy();
  });

  it('validates required parameters for image messages', () => {
    expect(validateWhatsappSend(imageMessage)).toBeTruthy();
  });

  it('validates required parameters for document messages', () => {
    expect(validateWhatsappSend(documentMessage)).toBeTruthy();
  });

  it('validates required parameters for video messages', () => {
    expect(validateWhatsappSend(videoMessage)).toBeTruthy();
  });

  it('validates required parameters for sticker messages', () => {
    expect(validateWhatsappSend(stickerMessage)).toBeTruthy();
  });

  it('validates required parameters for location messages', () => {
    expect(validateWhatsappSend(locationMessage)).toBeTruthy();
  });

  it('validates required parameters for contact messages', () => {
    expect(validateWhatsappSend(contactMessage)).toBeTruthy();
  });

  it('validates required parameters for interactive-button messages', () => {
    expect(validateWhatsappSend(interactiveButtonsMessage)).toBeTruthy();
  });

  it('validates required parameters for interactive-button messages with header', () => {
    expect(
      validateWhatsappSend(interactiveButtonsWithHeaderMessage)
    ).toBeTruthy();
  });

  it('validates required parameters for interactive-list messages', () => {
    expect(validateWhatsappSend(interactiveListMessage)).toBeTruthy();
  });

  it('validates required parameters for interactive-product messages', () => {
    expect(validateWhatsappSend(interactiveProductMessage)).toBeTruthy();
  });

  it('validates required parameters for interactive-multi-product messages', () => {
    expect(validateWhatsappSend(interactiveMultiProductMessage)).toBeTruthy();
  });

  it('throws if message is empty', () => {
    expect(() => {
      validateWhatsappSend({});
    }).toThrow('message.from is required.');
  });

  it('throws if message type is unknown', () => {
    expect(() => {
      validateWhatsappSend({
        type: 'something',
        from: '447860099299',
        to: '447860099299',
        content: {},
      });
    }).toThrow("Invalid message type 'something'");
  });
});

describe('validateWhatsappTemplateCreate', () => {
  it('validates required parameters', () => {
    expect(
      validateWhatsappTemplateCreate('447860099299', {
        name: 'test_template',
        language: 'en',
        category: 'AUTO_REPLY',
        structure: {
          header: {
            format: 'TEXT',
            text: 'header',
          },
          body: {
            text: 'Hello {{1}}',
          },
          footer: {
            text: 'footer',
          },
          buttons: [
            {
              text: 'button 1',
              type: 'PHONE_NUMBER',
              phoneNumber: '123456789',
            },
            {
              text: 'button 2',
              type: 'URL',
              url: 'https://example.com',
            },
          ],
        },
      })
    ).toBeTruthy();
  });

  it('throws if request is empty', () => {
    expect(() => {
      validateWhatsappTemplateCreate('447860099299', {});
    }).toThrow('request.name is required.');
  });
});

import { Http } from '../utils/http';
import { InfobipAuth } from '../utils/auth';
import { Validator } from '../utils/validator';
import {
  validateWhatsappSend,
  validateWhatsappTemplateCreate,
} from '../utils/validators/whatsapp';

const sendEndpoints: any = {
  template: '/whatsapp/1/message/template',
  text: '/whatsapp/1/message/text',
  document: '/whatsapp/1/message/document',
  image: '/whatsapp/1/message/image',
  audio: '/whatsapp/1/message/audio',
  video: '/whatsapp/1/message/video',
  sticker: '/whatsapp/1/message/sticker',
  location: '/whatsapp/1/message/location',
  contact: '/whatsapp/1/message/contact',
  'interactive-buttons': '/whatsapp/1/message/interactive/buttons',
  'interactive-list': '/whatsapp/1/message/interactive/list',
  'interactive-product': '/whatsapp/1/message/interactive/product',
  'interactive-multi-product': '/whatsapp/1/message/interactive/multi-product',
};

const endpoints: any = {
  media: '/whatsapp/1/senders/{sender}/media/{mediaId}',
  read: '/whatsapp/1/senders/{sender}/message/{messageId}/read',
  template: '/whatsapp/2/senders/{sender}/templates',
  identity: '/whatsapp/1/{sender}/contacts/{userNumber}/identity',
};

class WhatsApp {
  http: Http;
  media: any;
  template: any;
  identity: any;
  constructor(credentials: InfobipAuth) {
    this.http = new Http(credentials.baseUrl, credentials.authorization);
    this.media = {
      download: this.downloadMedia.bind(this),
      metadata: this.metadataMedia.bind(this),
      delete: this.deleteMedia.bind(this),
    };
    this.template = {
      get: this.getTemplate.bind(this),
      create: this.createTemplate.bind(this),
      delete: this.deleteTemplate.bind(this),
    };
    this.identity = {
      get: this.getIdentity.bind(this),
      confirm: this.confirmIdentity.bind(this),
    };
  }

  async send(message: any) {
    try {
      if (!sendEndpoints[message.type])
        throw new Error(
          `Invalid message type ${
            message.type
          }. Supported types are: ${Object.keys(sendEndpoints).join(', ')}.`
        );

      validateWhatsappSend(message);

      const response = await this.http.post(
        sendEndpoints[message.type],
        message
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  private async downloadMedia(sender: string, mediaId: string) {
    try {
      Validator.required(sender, 'sender');
      Validator.string(sender, 'sender');
      Validator.required(mediaId, 'mediaId');
      Validator.string(mediaId, 'mediaId');

      const response = await this.http.download(
        endpoints['media']
          .replace(`{sender}`, sender)
          .replace('{mediaId}', mediaId)
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  private async metadataMedia(sender: string, mediaId: string) {
    try {
      Validator.required(sender, 'sender');
      Validator.string(sender, 'sender');
      Validator.required(mediaId, 'mediaId');
      Validator.string(mediaId, 'mediaId');

      const response = await this.http.head(
        endpoints['media']
          .replace(`{sender}`, sender)
          .replace('{mediaId}', mediaId)
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  private async deleteMedia(sender: string, url: string) {
    try {
      Validator.required(sender, 'sender');
      Validator.string(sender, 'sender');
      Validator.required(url, 'url');
      Validator.string(url, 'url');

      const response = await this.http.delete(
        endpoints['media'].replace('{sender}', sender).replace('{mediaId}', ''),
        { url }
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async markAsRead(sender: string, messageId: string) {
    try {
      Validator.required(sender, 'sender');
      Validator.string(sender, 'sender');
      Validator.required(messageId, 'messageId');
      Validator.string(messageId, 'messageId');

      const response = await this.http.post(
        endpoints['read']
          .replace(`{sender}`, sender)
          .replace('{messageId}', messageId),
        {}
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  private async getTemplate(sender: string) {
    try {
      Validator.required(sender, 'sender');
      Validator.string(sender, 'sender');

      const response = await this.http.get(
        endpoints['template'].replace(`{sender}`, sender)
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  private async createTemplate(sender: string, request: any) {
    try {
      validateWhatsappTemplateCreate(sender, request);

      const response = await this.http.post(
        endpoints['template'].replace(`{sender}`, sender),
        request
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  private async deleteTemplate(sender: string, templateName: string) {
    try {
      Validator.required(sender, 'sender');
      Validator.string(sender, 'sender');
      Validator.required(templateName, 'templateName');
      Validator.string(templateName, 'templateName');

      const response = await this.http.delete(
        `${endpoints['template'].replace(`{sender}`, sender)}/${templateName}`
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  private async getIdentity(sender: string, userNumber: string) {
    try {
      Validator.required(sender, 'sender');
      Validator.string(sender, 'sender');
      Validator.required(userNumber, 'userNumber');
      Validator.string(userNumber, 'userNumber');

      const response = await this.http.get(
        endpoints['identity']
          .replace(`{sender}`, sender)
          .replace(`{userNumber}`, userNumber)
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  private async confirmIdentity(
    sender: string,
    userNumber: string,
    hash: string
  ) {
    try {
      Validator.required(sender, 'sender');
      Validator.string(sender, 'sender');
      Validator.required(userNumber, 'userNumber');
      Validator.string(userNumber, 'userNumber');
      Validator.required(hash, 'hash');
      Validator.string(hash, 'hash');

      const response = await this.http.put(
        endpoints['identity']
          .replace(`{sender}`, sender)
          .replace(`{userNumber}`, userNumber),
        { hash }
      );
      return response;
    } catch (error) {
      return error;
    }
  }
}

export { WhatsApp };

import FormData from 'form-data';

import { Http } from '../utils/http';
import { FormDataBuilder } from '../utils/form-data';
import { InfobipAuth } from '../utils/auth';
import { Validator } from '../utils/validator';
import { EmailStatus } from '../utils/email-status-type';
import { EmailDomain } from './email-domain';

const endpoints: any = {
  send: '/email/3/send',
  validate: '/email/2/validation',
  bulk: '/email/1/bulks',
  report: '/email/1/reports',
  status: '/email/1/bulks/status',
  log: '/email/1/logs',
};

class Email {
  http: Http;
  status: any;
  report: any;
  log: any;
  domain: EmailDomain;

  constructor(credentials: InfobipAuth) {
    this.http = new Http(credentials.baseUrl, credentials.authorization);
    this.domain = new EmailDomain(credentials);

    this.log = {
      get: this.getLog.bind(this),
    };

    this.report = {
      get: this.getReport.bind(this),
    };

    this.status = {
      get: this.getStatus.bind(this),
      update: this.updateStatus.bind(this),
    };
  }

  async send(email: any) {
    try {
      Validator.object(email, 'email');

      Validator.requiredString(email.from, 'email.from');

      Validator.required(email.to, 'email.to');
      if (!Array.isArray(email.to)) {
        email.to = [email.to];
      }
      Validator.array(email.to, 'email.to');
      email.to.forEach((to: any, index: number) => {
        Validator.string(to, `email.to[${index}]`);
      });

      if (email.cc) {
        if (!Array.isArray(email.cc)) {
          email.cc = [email.cc];
        }
        email.cc.forEach((cc: any, index: number) => {
          Validator.string(cc, `email.cc[${index}]`);
        });
      }

      if (email.bcc) {
        if (!Array.isArray(email.bcc)) {
          email.bcc = [email.bcc];
        }
        email.bcc.forEach((bcc: any, index: number) => {
          Validator.string(bcc, `email.bcc[${index}]`);
        });
      }

      if (!email.templateId) {
        Validator.requiredString(email.subject, 'email.subject');
        Validator.maxLength(email.subject, 1000, 'email.subject');
      }

      if (!(email.text || email.html || email.templateId)) {
        throw new Error(
          'Email must contain at least one of these (text, html or templateId).'
        );
      }

      if (email.text) {
        Validator.string(email.text, 'email.text');
      }

      if (email.html) {
        Validator.string(email.html, 'email.html');
      }

      if (email.ampHtml) {
        Validator.required(email.html, 'email.html');
        Validator.string(email.ampHtml, 'email.ampHtml');
      }

      if (email.templateId) {
        Validator.integer(email.templateId, 'email.templateId');
      }

      if (email.attachment) {
        Validator.array(email.attachment, 'email.attachment');
        email.attachment.forEach((attachmentObject: any) => {
          Validator.required(attachmentObject.data, 'email.attachment[].data');
          Validator.requiredString(
            attachmentObject.name,
            'email.attachment[].name'
          );
        });
      }

      if (email.inlineImage) {
        Validator.array(email.inlineImage, 'email.inlineImage');
        email.inlineImage.forEach((inlineImage: any) => {
          Validator.required(inlineImage.data, 'email.inlineImage[].data');
          Validator.requiredString(
            inlineImage.name,
            'email.inlineImage[].name'
          );
        });
      }

      if (email.intermediateReport) {
        Validator.boolean(email.intermediateReport, 'email.intermediateReport');
      }

      if (email.notifyUrl) {
        Validator.string(email.notifyUrl, 'email.notifyUrl');
      }

      if (email.notifyContentType) {
        Validator.string(email.notifyContentType, 'email.notifyContentType');
      }

      if (email.callbackData) {
        Validator.string(email.callbackData, 'email.callbackData');
        Validator.maxLength(email.callbackData, 4000, 'email.callbackData');
      }

      if (email.track) {
        Validator.boolean(email.track, 'email.track');
      }

      if (email.trackClicks) {
        Validator.boolean(email.trackClicks, 'email.trackClicks');
      }

      if (email.trackOpens) {
        Validator.boolean(email.trackOpens, 'email.trackOpens');
      }

      if (email.trackingUrl) {
        Validator.string(email.trackingUrl, 'email.trackingUrl');
      }

      if (email.bulkId) {
        Validator.string(email.bulkId, 'email.bulkId');
      }

      if (email.messageId) {
        Validator.string(email.messageId, 'email.messageId');
      }

      if (email.replyTo) {
        Validator.string(email.replyTo, 'email.replyTo');
      }

      if (email.defaultPlaceholders) {
        Validator.string(
          email.defaultPlaceholders,
          'email.defaultPlaceholders'
        );
      }

      if (email.preserveRecipients) {
        Validator.boolean(email.preserveRecipients, 'email.preserveRecipients');
      }

      if (email.sendAt) {
        Validator.string(email.sendAt, 'email.sendAt');
      }

      if (email.landingPagePlaceholders) {
        Validator.string(
          email.landingPagePlaceholders,
          'email.landingPagePlaceholders'
        );
      }

      if (email.landingPageId) {
        Validator.string(email.landingPageId, 'email.landingPageId');
      }

      if (email.templateLanguageVersion) {
        Validator.string(
          email.templateLanguageVersion,
          'email.templateLanguageVersion'
        );
      }

      if (email.applicationId) {
        Validator.string(email.applicationId, 'email.applicationId');
      }

      if (email.entityId) {
        Validator.string(email.entityId, 'email.entityId');
      }

      let form = new FormData();
      FormDataBuilder(form, email);

      const response = await this.http.post(endpoints.send, form, {
        headers: form.getHeaders(),
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  async validate(to: string) {
    try {
      Validator.required(to, 'to');
      Validator.string(to, 'to');

      const response = await this.http.post(endpoints.validate, { to });
      return response;
    } catch (error) {
      return error;
    }
  }

  async get(bulkId: string) {
    try {
      Validator.required(bulkId, 'bulkId');
      Validator.string(bulkId, 'bulkId');

      const response = await this.http.get(endpoints.bulk, { bulkId });
      return response;
    } catch (error) {
      return error;
    }
  }

  async reschedule(bulkId: string, sendAt: string) {
    try {
      Validator.required(bulkId, 'bulkId');
      Validator.string(bulkId, 'bulkId');

      Validator.required(sendAt, 'sendAt');
      Validator.string(sendAt, 'sendAt');

      const response = await this.http.put(
        `${endpoints.bulk}?bulkId=${bulkId}`,
        { sendAt }
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  private async getReport(filter: any) {
    try {
      const response = await this.http.get(endpoints.report, filter);
      return response;
    } catch (error) {
      return error;
    }
  }

  private async getLog(filter: any) {
    try {
      const response = await this.http.get(endpoints.log, filter);
      return response;
    } catch (error) {
      return error;
    }
  }

  private async getStatus(bulkId: string) {
    try {
      Validator.required(bulkId, 'bulkId');
      Validator.string(bulkId, 'bulkId');

      const response = await this.http.get(endpoints.status, { bulkId });
      return response;
    } catch (error) {
      return error;
    }
  }

  private async updateStatus(bulkId: string, status: EmailStatus) {
    try {
      Validator.required(bulkId, 'bulkId');
      Validator.string(bulkId, 'bulkId');

      Validator.required(status, 'status');
      Validator.oneOf(status, EmailStatus, 'status');

      const response = await this.http.put(
        `${endpoints.status}?bulkId=${bulkId}`,
        { status }
      );
      return response;
    } catch (error) {
      return error;
    }
  }
}

export { Email };

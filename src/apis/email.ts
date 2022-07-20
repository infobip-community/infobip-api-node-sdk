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
      Validator.required(email.to, 'email.to');
      Validator.string(email.to, 'email.to');

      Validator.required(email.from, 'email.from');
      Validator.string(email.from, 'email.from');

      if (!email.templateId) {
        Validator.required(email.subject, 'email.subject');
        Validator.string(email.subject, 'email.subject');
      }

      if (!(email.text || email.html || email.templateId))
        throw new Error(
          'Email must contain at least one of these (text, html or templateId).'
        );

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

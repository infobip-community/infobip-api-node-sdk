import { Http } from '../utils/http';
import { InfobipAuth } from '../utils/auth';
import { Validator } from '../utils/validator';

const endpoints: any = {
  domain: '/email/1/domains',
  verify: '/email/1/domains/{domainName}/verify',
  tracking: '/email/1/domains/{domainName}/tracking',
};

class EmailDomain {
  http: Http;

  constructor(credentials: InfobipAuth) {
    this.http = new Http(credentials.baseUrl, credentials.authorization);
  }

  async get(filter?: any) {
    try {
      let response;
      if (typeof filter === 'string') {
        response = await this.http.get(`${endpoints.domain}/${filter}`);
      } else {
        response = await this.http.get(endpoints.domain, filter);
      }
      return response;
    } catch (error) {
      return error;
    }
  }

  async add(domainName: string) {
    try {
      Validator.required(domainName, 'domainName');
      Validator.string(domainName, 'domainName');

      const response = await this.http.post(endpoints.domain, { domainName });
      return response;
    } catch (error) {
      return error;
    }
  }

  async verify(domainName: string) {
    try {
      Validator.required(domainName, 'domainName');
      Validator.string(domainName, 'domainName');

      const response = await this.http.post(
        endpoints.verify.replace('{domainName}', domainName),
        {}
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async tracking(domainName: string, request: any) {
    try {
      Validator.required(domainName, 'domainName');
      Validator.string(domainName, 'domainName');

      const response = await this.http.put(
        endpoints.tracking.replace('{domainName}', domainName),
        request
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async delete(domainName: string) {
    try {
      Validator.required(domainName, 'domainName');
      Validator.string(domainName, 'domainName');

      const response = await this.http.delete(
        `${endpoints.domain}/${domainName}`
      );
      return response;
    } catch (error) {
      return error;
    }
  }
}

export { EmailDomain };

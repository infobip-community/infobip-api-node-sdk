import { Http } from '../utils/http';
import { InfobipAuth } from '../utils/auth';
import { Validator } from '../utils/validator';

const auth2FAEndpoints: any = {
  uri: '/2fa/2/applications',
};

const pin2FAEndpoints: any = {
  uri: '/2fa/2/pin',
};

class Auth2FA {
  http: Http;
  username?: string;
  password?: string;

  constructor(credentials: InfobipAuth) {
    this.http = new Http(credentials.baseUrl, credentials.authorization);
    this.username = credentials.username;
    this.password = credentials.password;
  }

  /**
   * An application is a container for 2FA message templates
   * Use this method to list your applications
   *
   * @return { AxiosResponse<any, any> } response - Return Axios Response
   */
  async getApplications() {
    try {
      const response = await this.http.get(auth2FAEndpoints.uri);
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * Create and configure a new 2FA application
   *
   * @param { {} } reqBody - Create 2FA application request body
   * @return { AxiosResponse<any, any> } response - Return Axios Response
   */
  async createApplication(reqBody: any) {
    try {
      Validator.requiredString(reqBody.name, 'name');

      const response = await this.http.post(auth2FAEndpoints.uri, reqBody);
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * Get a single 2FA application to see its configuration details
   *
   * @param { string } appId - ID of the 2FA application
   * @return { AxiosResponse<any, any> } response - Return Axios Response
   */
  async getApplication(appId: string) {
    try {
      Validator.requiredString(appId, 'appId');

      const response = await this.http.get(auth2FAEndpoints.uri + `/${appId}`);
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * Change configuration options for your existing 2FA application
   *
   * @param { string } appId - ID of the 2FA application
   * @param { {} } reqBody - Change 2FA application request body
   * @return { AxiosResponse<any, any> } response - Return Axios Response
   */
  async updateApplication(appId: string, reqBody: any) {
    try {
      Validator.requiredString(appId, 'appId');
      Validator.requiredString(reqBody.name, 'name');

      const response = await this.http.put(
        auth2FAEndpoints.uri + `/${appId}`,
        reqBody
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * List all message templates in a 2FA application
   *
   * @param { string } appId - ID of the 2FA application
   * @return { AxiosResponse<any, any> } response - Return Axios Response
   */
  async getMessageTemplates(appId: string) {
    try {
      Validator.requiredString(appId, 'appId');

      const response = await this.http.get(
        auth2FAEndpoints.uri + `/${appId}/messages`
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * Once you have your 2FA application, create one or more message templates
   * where your PIN will be dynamically included when you send the PIN message.
   *
   * @param { string } appId - ID of the 2FA application
   * @param { {} } reqBody - Create message template request body
   * @return { AxiosResponse<any, any> } response - Return Axios Response
   */
  async createMessageTemplate(appId: string, reqBody: any) {
    try {
      Validator.requiredString(appId, 'appId');
      Validator.requiredString(reqBody.messageText, 'messageText');
      Validator.requiredString(reqBody.pinType, 'pinType');

      const response = await this.http.post(
        auth2FAEndpoints.uri + `/${appId}/messages`,
        reqBody
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * Get a single 2FA message template from an application to see its
   * configuration details.
   *
   * @param { string } appId - ID of the 2FA application
   * @param { string } messageId - ID of the message template
   * @return { AxiosResponse<any, any> } response - Return Axios Response
   */
  async getMessageTemplate(appId: string, messageId: string) {
    try {
      Validator.requiredString(appId, 'appId');
      Validator.requiredString(messageId, 'messageId');

      const response = await this.http.get(
        auth2FAEndpoints.uri + `/${appId}/messages/${messageId}`
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * Change configuration options for your existing 2FA application message
   * template.
   *
   * @param { string } appId - ID of the 2FA application
   * @param { string } messageId - ID of the message template
   * @param { {} } reqBody - Update message template request body
   * @return { AxiosResponse<any, any> } response - Return Axios Response
   */
  async updateMessageTemplate(appId: string, messageId: string, reqBody: any) {
    try {
      Validator.requiredString(appId, 'appId');
      Validator.requiredString(messageId, 'messageId');

      const response = await this.http.put(
        auth2FAEndpoints.uri + `/${appId}/messages/${messageId}`,
        reqBody
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * Send a PIN code over SMS using a previously created message template
   *
   * @param { string } ncNeeded - Indicates if Number Lookup is needed before
   *                              sending the 2FA message.
   * @param { {} } reqBody - Send PIN over SMS request body
   * @return { AxiosResponse<any, any> } response - Return Axios Response
   */
  async sendPINCodeSMS(ncNeeded: boolean, reqBody: any) {
    try {
      Validator.boolean(ncNeeded, 'ncNeeded');
      Validator.requiredString(reqBody.applicationId, 'applicationId');
      Validator.requiredString(reqBody.messageId, 'messageId');
      Validator.requiredString(reqBody.to, 'to');

      const ncNeededString = String(ncNeeded);
      const queryString = new URLSearchParams({ ncNeededString });
      const response = await this.http.post(
        pin2FAEndpoints.uri + `/?${queryString}`,
        reqBody
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * If needed, you can resend the same (previously sent) PIN code over SMS
   *
   * @param { string } pinId - ID of the pin code that has to be verified
   * @param { {} } reqBody - Resend PIN over SMS request body
   * @return { AxiosResponse<any, any> } response - Return Axios Response
   */
  async resendPINCodeSMS(pinId: string, reqBody?: any) {
    try {
      Validator.requiredString(pinId, 'pinId');

      const response = await this.http.post(
        pin2FAEndpoints.uri + `/${pinId}/resend`,
        reqBody
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * Send a PIN code over Voice using previously created message template
   *
   * @param { {} } reqBody - Send PIN over Voice request body
   * @return { AxiosResponse<any, any> } response - Return Axios Response
   */
  async sendPINCodeVoice(reqBody: any) {
    try {
      Validator.requiredString(reqBody.applicationId, 'applicationId');
      Validator.requiredString(reqBody.messageId, 'messageId');
      Validator.requiredString(reqBody.to, 'to');

      const response = await this.http.post(
        pin2FAEndpoints.uri + '/voice',
        reqBody
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * If needed, you can resend the same (previously sent) PIN code over Voice
   *
   * @param { string } pinId - ID of the pin code that has to be verified
   * @param { {} } reqBody - Resend PIN over Voice request body
   * @return { AxiosResponse<any, any> } response - Return Axios Response
   */
  async resendPINCodeVoice(pinId: string, reqBody?: any) {
    try {
      Validator.requiredString(pinId, 'pinId');

      const response = await this.http.post(
        pin2FAEndpoints.uri + `/${pinId}/resend/voice`,
        reqBody
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * Verify a phone number to confirm successful 2FA authentication
   *
   * @param { string } pinId - ID of the pin code that has to be verified
   * @param { {} } reqBody - Verify a phone number request body
   *                         The PIN code to verify
   * @return { AxiosResponse<any, any> } response - Return Axios Response
   */
  async verifyPhoneNumber(pinId: string, reqBody: any) {
    try {
      Validator.requiredString(pinId, 'pinId');
      Validator.requiredString(reqBody.pin, 'pin');

      const response = await this.http.post(
        pin2FAEndpoints.uri + `/${pinId}/verify`,
        reqBody
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  /**
   * Check if a phone number is already verified for a specific 2FA application
   *
   * @param { string } appId - ID of 2-FA application for which phone number
   *                           verification status is requested.
   * @param { {} } queryParameters - Get verification status request query
   *                                 parameters.
   * @return { AxiosResponse<any, any> } response - Return Axios Response
   */
  async getVerificationStatus(appId: string, queryParameters: any) {
    try {
      Validator.requiredString(appId, 'appId');
      Validator.requiredString(queryParameters.msisdn, 'msisdn');

      const query = new URLSearchParams(queryParameters);
      const queryString = query.toString();
      const response = await this.http.get(
        auth2FAEndpoints.uri + `/${appId}/verifications/?${queryString}`
      );
      return response;
    } catch (error) {
      return error;
    }
  }
}

export { Auth2FA };

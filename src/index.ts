import { AuthType } from './utils/auth-type';
import { EmailStatus } from './utils/email-status-type';
import { InfobipAuth } from './utils/auth';
import { Validator } from './utils/validator';
import { WhatsApp } from './apis/whatsapp';
import { SMS } from './apis/sms';
import { Auth } from './apis/auth';
import { Email } from './apis/email';
import { TwoFA } from './apis/2fa';
import {
  TwoFAApplication,
  TwoFAMessageTemplate,
  TwoFAPinCode,
  Pin,
  TwoFAVerificationStatus,
} from './models/2fa-models';

// Export SMS v3 types and enums
export {
  SendSmsV3Request,
  SendSmsV3Response,
  BaseSmsMessage,
  SmsDestination,
  BinaryContent,
  SmsReportsQuery,
  SmsLogsQuery,
  SmsDeliveryReport,
  SmsMessageLog,
  MessageType,
  DeliveryStatus,
  GeneralStatus,
  LanguageCode,
  Transliteration,
  UrlOptions,
  RegionalOptions,
  IndiaDltOptions,
  DeliveryTimeWindow
} from './types/sms';

// Export SMS error classes
export {
  SmsError,
  SmsValidationError,
  SmsApiError,
  SmsNetworkError,
  SmsRateLimitError,
  SmsTimeoutError,
  SmsAuthenticationError,
  SmsConfigurationError,
  createSmsErrorFromResponse,
  isSmsErrorRetryable
} from './errors/sms-errors';

// Export SMS webhook utilities
export {
  SmsWebhookPayload,
  WebhookVerificationOptions,
  verifyWebhookSignature,
  parseWebhookPayload,
  extractDeliveryStatuses,
  filterReportsByStatus,
  getFailedDeliveries,
  getSuccessfulDeliveries,
  calculateDeliveryStats,
  createWebhookMiddleware
} from './utils/sms-webhook';

// Export SMS utility functions
export {
  MessageEncoding,
  MessagePartInfo,
  PhoneNumberInfo,
  detectMessageEncoding,
  calculateMessageParts,
  formatPhoneNumber,
  isValidPhoneNumber,
  isValidSenderId,
  estimateSmsCost,
  formatSendAtDateTime,
  isValidNotifyUrl,
  generateMessageId,
  splitTextIntoParts,
  isValidDeliveryTimeWindow
} from './utils/sms-utils';

// Export SMS pagination utilities
export {
  PaginationOptions,
  PaginatedResponse,
  SmsReportsPaginator,
  SmsLogsPaginator,
  createReportsPaginator,
  createLogsPaginator,
  getAllReports,
  getAllLogs
} from './utils/sms-pagination';

class Infobip {
  /**
   *
   * @param {InfobipAuth} config - Configuration object for Infobip API
   *
   */

  credentials: InfobipAuth;
  service: any;
  channels: any;
  auth: any;

  constructor({
    baseUrl,
    authType,
    apiKey,
    username,
    password,
    oauthToken,
    ibssoToken,
  }: InfobipAuth) {
    Validator.required(baseUrl, 'Infobip.baseUrl');
    Validator.required(authType, 'Infobip.authType');

    password && Validator.string(password, 'Infobip.password');
    username && Validator.string(username, 'Infobip.username');
    apiKey && Validator.string(apiKey, 'Infobip.apiKey');
    oauthToken && Validator.string(oauthToken, 'Infobip.oauthToken');
    ibssoToken && Validator.string(ibssoToken, 'Infobip.ibssoToken');

    this.credentials = new InfobipAuth({
      baseUrl,
      authType,
      apiKey,
      username,
      password,
      oauthToken,
      ibssoToken,
    });
    this.channels = {
      whatsapp: new WhatsApp(this.credentials),
      email: new Email(this.credentials),
      sms: new SMS(this.credentials),
    };
    this.service = {
      twoFA: new TwoFA(this.credentials),
    };
    this.auth = new Auth(this.credentials);
  }
}

export {
  Infobip,
  AuthType,
  EmailStatus,
  TwoFAApplication,
  TwoFAMessageTemplate,
  TwoFAPinCode,
  Pin,
  TwoFAVerificationStatus,
};

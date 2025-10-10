/**
 * SMS API v3 TypeScript Interfaces
 * 
 * This file contains all TypeScript interfaces for the SMS v3 unified API
 * following the Infobip SMS REST API specification.
 * 
 * @author SMS Modernization Team
 * @version 1.0.0
 */

/**
 * SMS Message Types
 */
export enum MessageType {
  TEXT = 'text',
  BINARY = 'binary'
}

/**
 * Delivery Status for SMS Reports
 */
export enum DeliveryStatus {
  PENDING = 'PENDING',
  UNDELIVERABLE = 'UNDELIVERABLE',
  DELIVERED = 'DELIVERED',
  EXPIRED = 'EXPIRED',
  UNKNOWN = 'UNKNOWN',
  REJECTED = 'REJECTED'
}

/**
 * General Status for SMS Logs
 */
export enum GeneralStatus {
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
  UNDELIVERABLE = 'UNDELIVERABLE',
  DELIVERED = 'DELIVERED',
  EXPIRED = 'EXPIRED',
  UNKNOWN = 'UNKNOWN',
  REJECTED = 'REJECTED'
}

/**
 * Language Codes for SMS
 */
export enum LanguageCode {
  AUTODETECT = 'AUTODETECT',
  TR = 'TR',
  ES = 'ES',
  PT = 'PT',
  RU = 'RU'
}

/**
 * Transliteration Options
 */
export enum Transliteration {
  TURKISH = 'TURKISH',
  GREEK = 'GREEK',
  CYRILLIC = 'CYRILLIC',
  SERBIAN_CYRILLIC = 'SERBIAN_CYRILLIC',
  BULGARIAN_CYRILLIC = 'BULGARIAN_CYRILLIC',
  CENTRAL_EUROPEAN = 'CENTRAL_EUROPEAN',
  BALTIC = 'BALTIC',
  NON_UNICODE = 'NON_UNICODE'
}

/**
 * Destination for SMS message
 */
export interface SmsDestination {
  /** Recipient phone number in E.164 format */
  to: string;
  /** Message ID for tracking */
  messageId?: string;
}

/**
 * Language configuration for SMS
 */
export interface SmsLanguage {
  /** Language code for the message */
  languageCode: LanguageCode;
}

/**
 * Regional compliance configuration for India DLT
 */
export interface IndiaDltOptions {
  /** Principal Entity ID for India DLT compliance */
  principalEntityId: string;
  /** Content Template ID for India DLT compliance */
  contentTemplateId: string;
}

/**
 * Regional compliance configuration
 */
export interface RegionalOptions {
  /** India DLT compliance options */
  indiaDlt?: IndiaDltOptions;
}

/**
 * URL options for link tracking and shortening
 */
export interface UrlOptions {
  /** Enable URL shortening */
  shortenUrl?: boolean;
  /** Track clicks on URLs */
  trackClicks?: boolean;
  /** Custom domain for shortened URLs */
  customDomain?: string;
}

/**
 * Delivery time window configuration
 */
export interface DeliveryTimeWindow {
  /** Days of the week when delivery is allowed */
  days: string[];
  /** Start time for delivery window */
  from?: string;
  /** End time for delivery window */
  to?: string;
}

/**
 * Binary message content
 */
export interface BinaryContent {
  /** Hexadecimal representation of binary data */
  hex: string;
  /** Data coding scheme */
  dataCoding?: number;
  /** ESM class */
  esmClass?: number;
}

/**
 * Base SMS message interface
 */
export interface BaseSmsMessage {
  /** Sender ID or phone number */
  from: string;
  /** List of message destinations */
  destinations: SmsDestination[];
  /** Message text content (for text messages) */
  text?: string;
  /** Binary message content (for binary messages) */
  binary?: BinaryContent;
  /** Flash SMS indicator */
  flash?: boolean;
  /** Language configuration */
  language?: SmsLanguage;
  /** Transliteration option */
  transliteration?: Transliteration;
  /** Delivery time window */
  deliveryTimeWindow?: DeliveryTimeWindow;
  /** Scheduled send time */
  sendAt?: string;
  /** Message validity period in minutes */
  validityPeriod?: number;
  /** Callback data */
  callbackData?: string;
  /** Notification URL for delivery reports */
  notifyUrl?: string;
  /** Content template ID for pre-approved templates */
  contentTemplateId?: string;
  /** Regional compliance options */
  regional?: RegionalOptions;
  /** URL options for tracking */
  urlOptions?: UrlOptions;
  /** Application ID for tracking */
  applicationId?: string;
  /** Entity ID for tracking */
  entityId?: string;
  /** Platform ID */
  platformId?: string;
  /** Campaign reference ID */
  campaignReferenceId?: string;
  /** Tracking type */
  trackingType?: string;
  /** Track parameter */
  track?: string;
}

/**
 * SMS v3 unified send request
 */
export interface SendSmsV3Request {
  /** Array of SMS messages */
  messages: BaseSmsMessage[];
  /** Include SMS count in response */
  includeSmsCountInResponse?: boolean;
}

/**
 * SMS message status information
 */
export interface SmsMessageStatus {
  /** Message ID */
  messageId: string;
  /** Message status */
  status: {
    /** Group ID */
    groupId: number;
    /** Group name */
    groupName: string;
    /** Status ID */
    id: number;
    /** Status name */
    name: string;
    /** Status description */
    description: string;
  };
  /** Destination phone number */
  to: string;
  /** SMS count */
  smsCount?: number;
}

/**
 * SMS v3 send response
 */
export interface SendSmsV3Response {
  /** Bulk ID for the sent messages */
  bulkId: string;
  /** Array of message statuses */
  messages: SmsMessageStatus[];
}

/**
 * Query parameters for SMS reports
 */
export interface SmsReportsQuery {
  /** Bulk ID filter */
  bulkId?: string;
  /** Message ID filter */
  messageId?: string;
  /** Maximum number of results */
  limit?: number;
  /** Start date for filtering */
  sentSince?: string;
  /** End date for filtering */
  sentUntil?: string;
  /** Delivery status filter */
  deliveryStatus?: DeliveryStatus;
  /** Sender address filter */
  from?: string;
  /** Recipient number filter */
  to?: string;
  /** Mobile Country Code filter */
  mcc?: string;
  /** Mobile Network Code filter */
  mnc?: string;
  /** Entity ID filter */
  entityId?: string;
}

/**
 * Query parameters for SMS logs
 */
export interface SmsLogsQuery {
  /** Sender address filter */
  from?: string;
  /** Recipient number filter */
  to?: string;
  /** Bulk ID filter */
  bulkId?: string;
  /** Message ID filter */
  messageId?: string;
  /** General status filter */
  generalStatus?: GeneralStatus;
  /** Start date for filtering */
  sentSince?: string;
  /** End date for filtering */
  sentUntil?: string;
  /** Maximum number of results (max 1000) */
  limit?: number;
  /** Mobile Country Code filter */
  mcc?: string;
  /** Mobile Network Code filter */
  mnc?: string;
  /** Application ID filter */
  applicationId?: string;
  /** Entity ID filter */
  entityId?: string;
}

/**
 * SMS delivery report
 */
export interface SmsDeliveryReport {
  /** Bulk ID */
  bulkId: string;
  /** Message ID */
  messageId: string;
  /** Recipient number */
  to: string;
  /** Sender address */
  from: string;
  /** Message text */
  text: string;
  /** Sent timestamp */
  sentAt: string;
  /** Done timestamp */
  doneAt: string;
  /** SMS count */
  smsCount: number;
  /** Message status */
  status: {
    groupId: number;
    groupName: string;
    id: number;
    name: string;
    description: string;
  };
  /** Error information */
  error?: {
    groupId: number;
    groupName: string;
    id: number;
    name: string;
    description: string;
    permanent: boolean;
  };
  /** Price information */
  price?: {
    pricePerMessage: number;
    currency: string;
  };
  /** Callback data */
  callbackData?: string;
}

/**
 * SMS message log entry
 */
export interface SmsMessageLog {
  /** Message ID */
  messageId: string;
  /** Recipient number */
  to: string;
  /** Sender address */
  from: string;
  /** Message text */
  text: string;
  /** Sent timestamp */
  sentAt: string;
  /** SMS count */
  smsCount: number;
  /** Message status */
  status: {
    groupId: number;
    groupName: string;
    id: number;
    name: string;
    description: string;
  };
  /** Price information */
  price?: {
    pricePerMessage: number;
    currency: string;
  };
  /** Bulk ID */
  bulkId?: string;
  /** Application ID */
  applicationId?: string;
  /** Entity ID */
  entityId?: string;
}

/**
 * SMS v3 API Validators
 * 
 * This file contains comprehensive validation functions for the SMS v3 unified API
 * following all parameter requirements from the Infobip SMS REST API specification.
 * 
 * @author SMS Modernization Team
 * @version 1.0.0
 */

import { SmsValidationError } from '../../errors/sms-errors';
import { 
  SendSmsV3Request, 
  BaseSmsMessage, 
  LanguageCode,
  Transliteration,
  DeliveryStatus,
  GeneralStatus,
  SmsReportsQuery,
  SmsLogsQuery
} from '../../types/sms';

/**
 * Validates SMS v3 unified send request
 */
export function validateSmsV3SendRequest(request: SendSmsV3Request): void {
  if (!request) {
    throw new SmsValidationError('Request object is required');
  }

  // Validate messages array
  if (!request.messages || !Array.isArray(request.messages)) {
    throw new SmsValidationError('messages array is required');
  }

  if (request.messages.length === 0) {
    throw new SmsValidationError('messages array cannot be empty');
  }

  if (request.messages.length > 1000) {
    throw new SmsValidationError('messages array cannot contain more than 1000 messages');
  }

  // Validate each message
  request.messages.forEach((message, index) => {
    validateSmsV3Message(message, `messages[${index}]`);
  });

  // Validate includeSmsCountInResponse if provided
  if (request.includeSmsCountInResponse !== undefined) {
    if (typeof request.includeSmsCountInResponse !== 'boolean') {
      throw new SmsValidationError('includeSmsCountInResponse must be a boolean');
    }
  }
}

/**
 * Validates individual SMS v3 message
 */
export function validateSmsV3Message(message: BaseSmsMessage, fieldPrefix: string = 'message'): void {
  if (!message) {
    throw new SmsValidationError(`${fieldPrefix} is required`);
  }

  // Validate from field (sender ID)
  validateSenderField(message.from, `${fieldPrefix}.from`);

  // Validate destinations
  validateDestinations(message.destinations, `${fieldPrefix}.destinations`);

  // Validate message content (text or binary)
  validateMessageContent(message, fieldPrefix);

  // Validate optional fields
  if (message.flash !== undefined) {
    validateFlashSms(message.flash, `${fieldPrefix}.flash`);
  }

  if (message.language) {
    validateLanguage(message.language, `${fieldPrefix}.language`);
  }

  if (message.transliteration !== undefined) {
    validateTransliteration(message.transliteration, `${fieldPrefix}.transliteration`);
  }

  if (message.deliveryTimeWindow) {
    validateDeliveryTimeWindow(message.deliveryTimeWindow, `${fieldPrefix}.deliveryTimeWindow`);
  }

  if (message.sendAt) {
    validateSendAt(message.sendAt, `${fieldPrefix}.sendAt`);
  }

  if (message.validityPeriod !== undefined) {
    validateValidityPeriod(message.validityPeriod, `${fieldPrefix}.validityPeriod`);
  }

  if (message.callbackData) {
    validateCallbackData(message.callbackData, `${fieldPrefix}.callbackData`);
  }

  if (message.notifyUrl) {
    validateNotifyUrl(message.notifyUrl, `${fieldPrefix}.notifyUrl`);
  }

  if (message.contentTemplateId) {
    validateContentTemplateId(message.contentTemplateId, `${fieldPrefix}.contentTemplateId`);
  }

  if (message.regional) {
    validateRegionalOptions(message.regional, `${fieldPrefix}.regional`);
  }

  if (message.urlOptions) {
    validateUrlOptions(message.urlOptions, `${fieldPrefix}.urlOptions`);
  }

  if (message.applicationId) {
    validateApplicationId(message.applicationId, `${fieldPrefix}.applicationId`);
  }

  if (message.entityId) {
    validateEntityId(message.entityId, `${fieldPrefix}.entityId`);
  }

  if (message.platformId) {
    validatePlatformId(message.platformId, `${fieldPrefix}.platformId`);
  }

  if (message.campaignReferenceId) {
    validateCampaignReferenceId(message.campaignReferenceId, `${fieldPrefix}.campaignReferenceId`);
  }

  if (message.trackingType) {
    validateTrackingType(message.trackingType, `${fieldPrefix}.trackingType`);
  }

  if (message.track) {
    validateTrack(message.track, `${fieldPrefix}.track`);
  }
}

/**
 * Validates sender field (from)
 */
function validateSenderField(from: string, fieldName: string): void {
  if (!from) {
    throw new SmsValidationError(`${fieldName} is required`);
  }

  if (typeof from !== 'string') {
    throw new SmsValidationError(`${fieldName} must be a string`);
  }

  if (from.length === 0) {
    throw new SmsValidationError(`${fieldName} cannot be empty`);
  }

  if (from.length > 50) {
    throw new SmsValidationError(`${fieldName} cannot exceed 50 characters`);
  }

  // Validate phone number format (E.164) or alphanumeric sender ID
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  const alphanumericRegex = /^[a-zA-Z0-9\s]{1,11}$/;

  if (!phoneRegex.test(from) && !alphanumericRegex.test(from)) {
    throw new SmsValidationError(`${fieldName} must be a valid phone number (E.164 format) or alphanumeric sender ID (max 11 characters)`);
  }
}

/**
 * Validates destinations array
 */
function validateDestinations(destinations: any, fieldName: string): void {
  if (!destinations || !Array.isArray(destinations)) {
    throw new SmsValidationError(`${fieldName} must be an array`);
  }

  if (destinations.length === 0) {
    throw new SmsValidationError(`${fieldName} cannot be empty`);
  }

  if (destinations.length > 1000) {
    throw new SmsValidationError(`${fieldName} cannot contain more than 1000 destinations`);
  }

  destinations.forEach((destination, index) => {
    const destFieldName = `${fieldName}[${index}]`;
    
    if (!destination || typeof destination !== 'object') {
      throw new SmsValidationError(`${destFieldName} must be an object`);
    }

    if (!destination.to) {
      throw new SmsValidationError(`${destFieldName}.to is required`);
    }

    if (typeof destination.to !== 'string') {
      throw new SmsValidationError(`${destFieldName}.to must be a string`);
    }

    // Validate E.164 phone number format
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(destination.to)) {
      throw new SmsValidationError(`${destFieldName}.to must be a valid phone number in E.164 format`);
    }

    if (destination.messageId && typeof destination.messageId !== 'string') {
      throw new SmsValidationError(`${destFieldName}.messageId must be a string`);
    }
  });
}

/**
 * Validates message content (text or binary)
 */
function validateMessageContent(message: BaseSmsMessage, fieldPrefix: string): void {
  const hasText = message.text && message.text.length > 0;
  const hasBinary = message.binary && message.binary.hex;

  if (!hasText && !hasBinary) {
    throw new SmsValidationError(`${fieldPrefix} must contain either text or binary content`);
  }

  if (hasText && hasBinary) {
    throw new SmsValidationError(`${fieldPrefix} cannot contain both text and binary content`);
  }

  if (hasText) {
    validateTextContent(message.text!, `${fieldPrefix}.text`);
  }

  if (hasBinary) {
    validateBinaryContent(message.binary!, `${fieldPrefix}.binary`);
  }
}

/**
 * Validates text content
 */
function validateTextContent(text: string, fieldName: string): void {
  if (typeof text !== 'string') {
    throw new SmsValidationError(`${fieldName} must be a string`);
  }

  if (text.length === 0) {
    throw new SmsValidationError(`${fieldName} cannot be empty`);
  }

  // SMS text length validation (considering GSM 7-bit vs Unicode)
  const gsmChars = /^[A-Za-z0-9 \r\n@£$¥èéùìòÇØøÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ!"#¤%&'()*+,\-./:;<=>?¡ÄÖÑÜ§¿äöñüà^{}\\[~]|€]*$/;
  const isGsm7Bit = gsmChars.test(text);
  
  if (isGsm7Bit && text.length > 1600) {
    throw new SmsValidationError(`${fieldName} exceeds maximum length of 1600 characters for GSM 7-bit encoding`);
  } else if (!isGsm7Bit && text.length > 700) {
    throw new SmsValidationError(`${fieldName} exceeds maximum length of 700 characters for Unicode encoding`);
  }
}

/**
 * Validates binary content
 */
function validateBinaryContent(binary: any, fieldName: string): void {
  if (!binary || typeof binary !== 'object') {
    throw new SmsValidationError(`${fieldName} must be an object`);
  }

  if (!binary.hex) {
    throw new SmsValidationError(`${fieldName}.hex is required`);
  }

  if (typeof binary.hex !== 'string') {
    throw new SmsValidationError(`${fieldName}.hex must be a string`);
  }

  // Validate hexadecimal format
  const hexRegex = /^[0-9A-Fa-f]+$/;
  if (!hexRegex.test(binary.hex)) {
    throw new SmsValidationError(`${fieldName}.hex must contain only hexadecimal characters`);
  }

  if (binary.hex.length % 2 !== 0) {
    throw new SmsValidationError(`${fieldName}.hex must have an even number of characters`);
  }

  if (binary.hex.length > 280) {
    throw new SmsValidationError(`${fieldName}.hex cannot exceed 140 bytes (280 hex characters)`);
  }

  if (binary.dataCoding !== undefined) {
    if (typeof binary.dataCoding !== 'number' || binary.dataCoding < 0 || binary.dataCoding > 255) {
      throw new SmsValidationError(`${fieldName}.dataCoding must be a number between 0 and 255`);
    }
  }

  if (binary.esmClass !== undefined) {
    if (typeof binary.esmClass !== 'number' || binary.esmClass < 0 || binary.esmClass > 255) {
      throw new SmsValidationError(`${fieldName}.esmClass must be a number between 0 and 255`);
    }
  }
}

/**
 * Validates flash SMS setting
 */
function validateFlashSms(flash: boolean, fieldName: string): void {
  if (typeof flash !== 'boolean') {
    throw new SmsValidationError(`${fieldName} must be a boolean`);
  }
  
  // Add warning about flash SMS limitations
  if (flash) {
    console.warn('Warning: Flash SMS may not be supported by all mobile networks and devices');
  }
}

/**
 * Validates language configuration
 */
function validateLanguage(language: any, fieldName: string): void {
  if (!language || typeof language !== 'object') {
    throw new SmsValidationError(`${fieldName} must be an object`);
  }

  if (!language.languageCode) {
    throw new SmsValidationError(`${fieldName}.languageCode is required`);
  }

  if (!Object.values(LanguageCode).includes(language.languageCode)) {
    throw new SmsValidationError(`${fieldName}.languageCode must be one of: ${Object.values(LanguageCode).join(', ')}`);
  }
}

/**
 * Validates transliteration option
 */
function validateTransliteration(transliteration: string, fieldName: string): void {
  if (!Object.values(Transliteration).includes(transliteration as Transliteration)) {
    throw new SmsValidationError(`${fieldName} must be one of: ${Object.values(Transliteration).join(', ')}`);
  }
}

/**
 * Validates delivery time window
 */
function validateDeliveryTimeWindow(timeWindow: any, fieldName: string): void {
  if (!timeWindow || typeof timeWindow !== 'object') {
    throw new SmsValidationError(`${fieldName} must be an object`);
  }

  if (!timeWindow.days || !Array.isArray(timeWindow.days)) {
    throw new SmsValidationError(`${fieldName}.days must be an array`);
  }

  const validDays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  timeWindow.days.forEach((day: string, index: number) => {
    if (!validDays.includes(day)) {
      throw new SmsValidationError(`${fieldName}.days[${index}] must be one of: ${validDays.join(', ')}`);
    }
  });

  if (timeWindow.from) {
    validateTimeFormat(timeWindow.from, `${fieldName}.from`);
  }

  if (timeWindow.to) {
    validateTimeFormat(timeWindow.to, `${fieldName}.to`);
  }
}

/**
 * Validates time format (HH:mm)
 */
function validateTimeFormat(time: string, fieldName: string): void {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(time)) {
    throw new SmsValidationError(`${fieldName} must be in HH:mm format`);
  }
}

/**
 * Validates sendAt datetime
 */
function validateSendAt(sendAt: string, fieldName: string): void {
  if (typeof sendAt !== 'string') {
    throw new SmsValidationError(`${fieldName} must be a string`);
  }

  const date = new Date(sendAt);
  if (isNaN(date.getTime())) {
    throw new SmsValidationError(`${fieldName} must be a valid ISO 8601 datetime string`);
  }

  if (date <= new Date()) {
    throw new SmsValidationError(`${fieldName} must be a future datetime`);
  }
}

/**
 * Validates validity period
 */
function validateValidityPeriod(validityPeriod: number, fieldName: string): void {
  if (typeof validityPeriod !== 'number') {
    throw new SmsValidationError(`${fieldName} must be a number`);
  }

  if (validityPeriod < 1 || validityPeriod > 2880) {
    throw new SmsValidationError(`${fieldName} must be between 1 and 2880 minutes (48 hours)`);
  }
}

/**
 * Validates callback data
 */
function validateCallbackData(callbackData: string, fieldName: string): void {
  if (typeof callbackData !== 'string') {
    throw new SmsValidationError(`${fieldName} must be a string`);
  }

  if (callbackData.length > 200) {
    throw new SmsValidationError(`${fieldName} cannot exceed 200 characters`);
  }
}

/**
 * Validates notify URL
 */
function validateNotifyUrl(notifyUrl: string, fieldName: string): void {
  if (typeof notifyUrl !== 'string') {
    throw new SmsValidationError(`${fieldName} must be a string`);
  }

  try {
    const url = new URL(notifyUrl);
    if (!['http:', 'https:'].includes(url.protocol)) {
      throw new SmsValidationError(`${fieldName} must use HTTP or HTTPS protocol`);
    }
  } catch (error) {
    throw new SmsValidationError(`${fieldName} must be a valid URL`);
  }
}

/**
 * Validates content template ID
 */
function validateContentTemplateId(contentTemplateId: string, fieldName: string): void {
  if (typeof contentTemplateId !== 'string') {
    throw new SmsValidationError(`${fieldName} must be a string`);
  }

  if (contentTemplateId.length === 0) {
    throw new SmsValidationError(`${fieldName} cannot be empty`);
  }
}

/**
 * Validates regional options
 */
function validateRegionalOptions(regional: any, fieldName: string): void {
  if (!regional || typeof regional !== 'object') {
    throw new SmsValidationError(`${fieldName} must be an object`);
  }

  if (regional.indiaDlt) {
    validateIndiaDltOptions(regional.indiaDlt, `${fieldName}.indiaDlt`);
  }
}

/**
 * Validates India DLT options
 */
function validateIndiaDltOptions(indiaDlt: any, fieldName: string): void {
  if (!indiaDlt || typeof indiaDlt !== 'object') {
    throw new SmsValidationError(`${fieldName} must be an object`);
  }

  if (!indiaDlt.principalEntityId) {
    throw new SmsValidationError(`${fieldName}.principalEntityId is required`);
  }

  if (typeof indiaDlt.principalEntityId !== 'string') {
    throw new SmsValidationError(`${fieldName}.principalEntityId must be a string`);
  }

  if (!indiaDlt.contentTemplateId) {
    throw new SmsValidationError(`${fieldName}.contentTemplateId is required`);
  }

  if (typeof indiaDlt.contentTemplateId !== 'string') {
    throw new SmsValidationError(`${fieldName}.contentTemplateId must be a string`);
  }
}

/**
 * Validates URL options
 */
function validateUrlOptions(urlOptions: any, fieldName: string): void {
  if (!urlOptions || typeof urlOptions !== 'object') {
    throw new SmsValidationError(`${fieldName} must be an object`);
  }

  if (urlOptions.shortenUrl !== undefined && typeof urlOptions.shortenUrl !== 'boolean') {
    throw new SmsValidationError(`${fieldName}.shortenUrl must be a boolean`);
  }

  if (urlOptions.trackClicks !== undefined && typeof urlOptions.trackClicks !== 'boolean') {
    throw new SmsValidationError(`${fieldName}.trackClicks must be a boolean`);
  }

  if (urlOptions.customDomain && typeof urlOptions.customDomain !== 'string') {
    throw new SmsValidationError(`${fieldName}.customDomain must be a string`);
  }
}

/**
 * Validates application ID
 */
function validateApplicationId(applicationId: string, fieldName: string): void {
  if (typeof applicationId !== 'string') {
    throw new SmsValidationError(`${fieldName} must be a string`);
  }
}

/**
 * Validates entity ID
 */
function validateEntityId(entityId: string, fieldName: string): void {
  if (typeof entityId !== 'string') {
    throw new SmsValidationError(`${fieldName} must be a string`);
  }
}

/**
 * Validates platform ID
 */
function validatePlatformId(platformId: string, fieldName: string): void {
  if (typeof platformId !== 'string') {
    throw new SmsValidationError(`${fieldName} must be a string`);
  }
}

/**
 * Validates campaign reference ID
 */
function validateCampaignReferenceId(campaignReferenceId: string, fieldName: string): void {
  if (typeof campaignReferenceId !== 'string') {
    throw new SmsValidationError(`${fieldName} must be a string`);
  }
}

/**
 * Validates tracking type
 */
function validateTrackingType(trackingType: string, fieldName: string): void {
  if (typeof trackingType !== 'string') {
    throw new SmsValidationError(`${fieldName} must be a string`);
  }
}

/**
 * Validates track parameter
 */
function validateTrack(track: string, fieldName: string): void {
  if (typeof track !== 'string') {
    throw new SmsValidationError(`${fieldName} must be a string`);
  }
}

/**
 * Validates SMS reports query parameters
 */
export function validateSmsReportsQuery(query: SmsReportsQuery): void {
  if (query.limit !== undefined) {
    if (typeof query.limit !== 'number' || query.limit < 1 || query.limit > 1000) {
      throw new SmsValidationError('limit must be a number between 1 and 1000');
    }
  }

  if (query.deliveryStatus !== undefined) {
    if (!Object.values(DeliveryStatus).includes(query.deliveryStatus)) {
      throw new SmsValidationError(`deliveryStatus must be one of: ${Object.values(DeliveryStatus).join(', ')}`);
    }
  }

  if (query.sentSince) {
    validateDateTimeString(query.sentSince, 'sentSince');
  }

  if (query.sentUntil) {
    validateDateTimeString(query.sentUntil, 'sentUntil');
  }
}

/**
 * Validates SMS logs query parameters
 */
export function validateSmsLogsQuery(query: SmsLogsQuery): void {
  if (query.limit !== undefined) {
    if (typeof query.limit !== 'number' || query.limit < 1 || query.limit > 1000) {
      throw new SmsValidationError('limit must be a number between 1 and 1000');
    }
  }

  if (query.generalStatus !== undefined) {
    if (!Object.values(GeneralStatus).includes(query.generalStatus)) {
      throw new SmsValidationError(`generalStatus must be one of: ${Object.values(GeneralStatus).join(', ')}`);
    }
  }

  if (query.sentSince) {
    validateDateTimeString(query.sentSince, 'sentSince');
  }

  if (query.sentUntil) {
    validateDateTimeString(query.sentUntil, 'sentUntil');
  }
}

/**
 * Validates datetime string format
 */
function validateDateTimeString(dateTime: string, fieldName: string): void {
  if (typeof dateTime !== 'string') {
    throw new SmsValidationError(`${fieldName} must be a string`);
  }

  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new SmsValidationError(`${fieldName} must be a valid ISO 8601 datetime string`);
  }
}

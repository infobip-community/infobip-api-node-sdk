/**
 * SMS Utility Functions
 * 
 * Helper utilities for SMS message processing, formatting, and calculations
 * 
 * @author SMS Modernization Team
 * @version 1.0.0
 */

import { SmsValidationError } from '../errors/sms-errors';

/**
 * GSM 7-bit character set
 */
const GSM_7BIT_CHARS = /^[A-Za-z0-9 \r\n@£$¥èéùìòÇØøÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ!"#¤%&'()*+,\-./:;<=>?¡ÄÖÑÜ§¿äöñüà^{}\\[\]~|€]*$/;

/**
 * Extended GSM characters that count as 2 characters
 */
const GSM_EXTENDED_CHARS = /[\^{}\\\[~\]|€]/g;

/**
 * Message encoding types
 */
export enum MessageEncoding {
  GSM_7BIT = 'GSM_7BIT',
  UNICODE = 'UNICODE'
}

/**
 * Message part calculation result
 */
export interface MessagePartInfo {
  encoding: MessageEncoding;
  length: number;
  parts: number;
  charactersPerPart: number;
  remainingCharacters: number;
}

/**
 * Phone number formatting result
 */
export interface PhoneNumberInfo {
  original: string;
  formatted: string;
  isValid: boolean;
  country?: string;
  type: 'mobile' | 'landline' | 'unknown';
}

/**
 * Detects the encoding type for SMS message
 * 
 * @param text - Message text
 * @returns MessageEncoding - GSM_7BIT or UNICODE
 */
export function detectMessageEncoding(text: string): MessageEncoding {
  if (!text) {
    return MessageEncoding.GSM_7BIT;
  }

  return GSM_7BIT_CHARS.test(text) ? MessageEncoding.GSM_7BIT : MessageEncoding.UNICODE;
}

/**
 * Calculates SMS message parts and character count
 * 
 * @param text - Message text
 * @returns MessagePartInfo - Detailed information about message parts
 */
export function calculateMessageParts(text: string): MessagePartInfo {
  if (!text) {
    return {
      encoding: MessageEncoding.GSM_7BIT,
      length: 0,
      parts: 0,
      charactersPerPart: 160,
      remainingCharacters: 160
    };
  }

  const encoding = detectMessageEncoding(text);
  let effectiveLength = text.length;

  if (encoding === MessageEncoding.GSM_7BIT) {
    // Count extended characters as 2 characters
    const extendedMatches = text.match(GSM_EXTENDED_CHARS);
    if (extendedMatches) {
      effectiveLength += extendedMatches.length;
    }

    // GSM 7-bit limits
    const singlePartLimit = 160;
    const multiPartLimit = 153; // 7 characters reserved for UDH

    if (effectiveLength <= singlePartLimit) {
      return {
        encoding,
        length: effectiveLength,
        parts: 1,
        charactersPerPart: singlePartLimit,
        remainingCharacters: singlePartLimit - effectiveLength
      };
    } else {
      const parts = Math.ceil(effectiveLength / multiPartLimit);
      const remainingCharacters = (parts * multiPartLimit) - effectiveLength;
      
      return {
        encoding,
        length: effectiveLength,
        parts,
        charactersPerPart: multiPartLimit,
        remainingCharacters
      };
    }
  } else {
    // Unicode limits
    const singlePartLimit = 70;
    const multiPartLimit = 67; // 3 characters reserved for UDH

    if (effectiveLength <= singlePartLimit) {
      return {
        encoding,
        length: effectiveLength,
        parts: 1,
        charactersPerPart: singlePartLimit,
        remainingCharacters: singlePartLimit - effectiveLength
      };
    } else {
      const parts = Math.ceil(effectiveLength / multiPartLimit);
      const remainingCharacters = (parts * multiPartLimit) - effectiveLength;
      
      return {
        encoding,
        length: effectiveLength,
        parts,
        charactersPerPart: multiPartLimit,
        remainingCharacters
      };
    }
  }
}

/**
 * Formats phone number to E.164 format
 * 
 * @param phoneNumber - Phone number to format
 * @param defaultCountryCode - Default country code if not provided
 * @returns PhoneNumberInfo - Formatted phone number information
 */
export function formatPhoneNumber(phoneNumber: string, defaultCountryCode?: string): PhoneNumberInfo {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return {
      original: phoneNumber || '',
      formatted: '',
      isValid: false,
      type: 'unknown'
    };
  }

  // Remove all non-digit characters except +
  let cleaned = phoneNumber.replace(/[^\d+]/g, '');
  
  // If already in E.164 format
  if (cleaned.startsWith('+') && cleaned.length >= 9 && cleaned.length <= 16) {
    return {
      original: phoneNumber,
      formatted: cleaned,
      isValid: /^\+[1-9]\d{1,14}$/.test(cleaned),
      type: 'mobile' // Assume mobile for international format
    };
  }

  // Remove leading + if present
  if (cleaned.startsWith('+')) {
    cleaned = cleaned.substring(1);
  }

  // Add default country code if provided and number doesn't start with country code
  if (defaultCountryCode && !cleaned.startsWith(defaultCountryCode.replace('+', ''))) {
    cleaned = defaultCountryCode.replace('+', '') + cleaned;
  }

  const formatted = '+' + cleaned;
  const isValid = /^\+[1-9]\d{1,14}$/.test(formatted);

  return {
    original: phoneNumber,
    formatted: isValid ? formatted : '',
    isValid,
    type: 'mobile' // Default to mobile
  };
}

/**
 * Validates phone number format
 * 
 * @param phoneNumber - Phone number to validate
 * @returns boolean - True if valid E.164 format
 */
export function isValidPhoneNumber(phoneNumber: string): boolean {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return false;
  }

  return /^\+[1-9]\d{7,14}$/.test(phoneNumber);
}

/**
 * Validates sender ID format
 * 
 * @param senderId - Sender ID to validate
 * @returns boolean - True if valid sender ID
 */
export function isValidSenderId(senderId: string): boolean {
  if (!senderId || typeof senderId !== 'string') {
    return false;
  }

  // Check if it's a valid phone number (E.164)
  if (isValidPhoneNumber(senderId)) {
    return true;
  }

  // Check if it's a valid alphanumeric sender ID (max 11 characters)
  return /^[a-zA-Z0-9\s]{1,11}$/.test(senderId);
}

/**
 * Estimates SMS cost based on message parts and destination
 * 
 * @param text - Message text
 * @param destinations - Array of destination phone numbers
 * @param costPerPart - Cost per SMS part (default: 0.05)
 * @returns Object with cost estimation
 */
export function estimateSmsCost(
  text: string, 
  destinations: string[], 
  costPerPart: number = 0.05
): {
  totalParts: number;
  totalMessages: number;
  costPerMessage: number;
  totalCost: number;
  encoding: MessageEncoding;
} {
  const messageInfo = calculateMessageParts(text);
  const totalMessages = destinations.length;
  const totalParts = messageInfo.parts * totalMessages;
  const costPerMessage = messageInfo.parts * costPerPart;
  const totalCost = totalParts * costPerPart;

  return {
    totalParts,
    totalMessages,
    costPerMessage: Math.round(costPerMessage * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    encoding: messageInfo.encoding
  };
}

/**
 * Validates and formats datetime string for sendAt parameter
 * 
 * @param dateTime - DateTime string or Date object
 * @returns string - ISO 8601 formatted datetime string
 */
export function formatSendAtDateTime(dateTime: string | Date): string {
  let date: Date;

  if (typeof dateTime === 'string') {
    date = new Date(dateTime);
  } else if (dateTime instanceof Date) {
    date = dateTime;
  } else {
    throw new SmsValidationError('dateTime must be a string or Date object');
  }

  if (isNaN(date.getTime())) {
    throw new SmsValidationError('Invalid datetime format');
  }

  if (date <= new Date()) {
    throw new SmsValidationError('sendAt datetime must be in the future');
  }

  return date.toISOString();
}

/**
 * Validates URL format for notifyUrl parameter
 * 
 * @param url - URL to validate
 * @returns boolean - True if valid URL
 */
export function isValidNotifyUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
}

/**
 * Generates message ID for tracking
 * 
 * @param prefix - Optional prefix for message ID
 * @returns string - Generated message ID
 */
export function generateMessageId(prefix: string = 'msg'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Splits long text into multiple SMS parts
 * 
 * @param text - Text to split
 * @param encoding - Message encoding (optional, auto-detected if not provided)
 * @returns string[] - Array of text parts
 */
export function splitTextIntoParts(text: string): string[] {
  if (!text) {
    return [];
  }

  const messageInfo = calculateMessageParts(text);
  
  if (messageInfo.parts === 1) {
    return [text];
  }

  const parts: string[] = [];
  const charsPerPart = messageInfo.charactersPerPart;
  
  for (let i = 0; i < text.length; i += charsPerPart) {
    parts.push(text.substring(i, i + charsPerPart));
  }

  return parts;
}

/**
 * Validates delivery time window format
 * 
 * @param timeWindow - Delivery time window object
 * @returns boolean - True if valid format
 */
export function isValidDeliveryTimeWindow(timeWindow: any): boolean {
  if (!timeWindow || typeof timeWindow !== 'object') {
    return false;
  }

  const validDays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  
  if (!Array.isArray(timeWindow.days) || timeWindow.days.length === 0) {
    return false;
  }

  // Check if all days are valid
  const allDaysValid = timeWindow.days.every((day: string) => validDays.includes(day));
  if (!allDaysValid) {
    return false;
  }

  // Check time format if provided
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  
  if (timeWindow.from && !timeRegex.test(timeWindow.from)) {
    return false;
  }

  if (timeWindow.to && !timeRegex.test(timeWindow.to)) {
    return false;
  }

  return true;
}

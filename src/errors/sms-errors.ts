/**
 * SMS-specific Error Classes
 * 
 * This file contains all SMS-specific error classes for better error handling
 * and debugging in the Infobip SMS SDK.
 * 
 * @author SMS Modernization Team
 * @version 1.0.0
 */

/**
 * Base SMS Error class
 */
export abstract class SmsError extends Error {
  public readonly code: string;
  public readonly statusCode?: number;
  public readonly details?: any;

  constructor(message: string, code: string, statusCode?: number, details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    
    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * SMS Validation Error - thrown when request parameters are invalid
 */
export class SmsValidationError extends SmsError {
  constructor(message: string, field?: string, value?: any) {
    super(
      `SMS Validation Error: ${message}`,
      'SMS_VALIDATION_ERROR',
      400,
      { field, value }
    );
  }
}

/**
 * SMS API Error - thrown when API returns an error response
 */
export class SmsApiError extends SmsError {
  public readonly apiErrorCode?: string;
  public readonly apiErrorDescription?: string;

  constructor(
    message: string,
    statusCode: number,
    apiErrorCode?: string,
    apiErrorDescription?: string,
    details?: any
  ) {
    super(
      `SMS API Error: ${message}`,
      'SMS_API_ERROR',
      statusCode,
      details
    );
    this.apiErrorCode = apiErrorCode;
    this.apiErrorDescription = apiErrorDescription;
  }
}

/**
 * SMS Network Error - thrown when network-related issues occur
 */
export class SmsNetworkError extends SmsError {
  constructor(message: string, originalError?: Error) {
    super(
      `SMS Network Error: ${message}`,
      'SMS_NETWORK_ERROR',
      undefined,
      { originalError: originalError?.message }
    );
  }
}

/**
 * SMS Rate Limit Error - thrown when API rate limits are exceeded
 */
export class SmsRateLimitError extends SmsError {
  public readonly retryAfter?: number;

  constructor(message: string, retryAfter?: number) {
    super(
      `SMS Rate Limit Error: ${message}`,
      'SMS_RATE_LIMIT_ERROR',
      429,
      { retryAfter }
    );
    this.retryAfter = retryAfter;
  }
}

/**
 * SMS Timeout Error - thrown when requests timeout
 */
export class SmsTimeoutError extends SmsError {
  constructor(message: string, timeout: number) {
    super(
      `SMS Timeout Error: ${message}`,
      'SMS_TIMEOUT_ERROR',
      408,
      { timeout }
    );
  }
}

/**
 * SMS Authentication Error - thrown when authentication fails
 */
export class SmsAuthenticationError extends SmsError {
  constructor(message: string) {
    super(
      `SMS Authentication Error: ${message}`,
      'SMS_AUTHENTICATION_ERROR',
      401
    );
  }
}

/**
 * SMS Configuration Error - thrown when SDK configuration is invalid
 */
export class SmsConfigurationError extends SmsError {
  constructor(message: string, configField?: string) {
    super(
      `SMS Configuration Error: ${message}`,
      'SMS_CONFIGURATION_ERROR',
      undefined,
      { configField }
    );
  }
}

/**
 * Error code mapping for Infobip API error codes
 */
export const SMS_ERROR_CODE_MAP: Record<string, string> = {
  // Authentication errors
  'UNAUTHORIZED': 'Invalid API key or authentication credentials',
  'FORBIDDEN': 'Access denied - insufficient permissions',
  
  // Validation errors
  'BAD_REQUEST': 'Invalid request parameters',
  'INVALID_DESTINATION': 'Invalid destination phone number format',
  'INVALID_SENDER': 'Invalid sender ID or phone number',
  'MESSAGE_TOO_LONG': 'Message text exceeds maximum length',
  'INVALID_VALIDITY_PERIOD': 'Invalid validity period value',
  'INVALID_SEND_TIME': 'Invalid scheduled send time',
  
  // Rate limiting
  'TOO_MANY_REQUESTS': 'API rate limit exceeded - please retry later',
  
  // Service errors
  'INTERNAL_SERVER_ERROR': 'Internal server error - please retry',
  'SERVICE_UNAVAILABLE': 'SMS service temporarily unavailable',
  'GATEWAY_TIMEOUT': 'Request timeout - please retry',
  
  // Business logic errors
  'INSUFFICIENT_CREDITS': 'Insufficient account credits to send message',
  'INVALID_TEMPLATE': 'Invalid or non-existent message template',
  'REGIONAL_RESTRICTION': 'Message blocked due to regional restrictions',
  'SPAM_DETECTED': 'Message blocked due to spam detection',
  
  // Network errors
  'NETWORK_ERROR': 'Network connectivity issue',
  'DNS_ERROR': 'DNS resolution failed',
  'CONNECTION_TIMEOUT': 'Connection timeout',
  'SSL_ERROR': 'SSL/TLS connection error'
};

/**
 * Utility function to create appropriate error from API response
 */
export function createSmsErrorFromResponse(
  statusCode: number,
  responseBody: any,
  originalError?: Error
): SmsError {
  const errorCode = responseBody?.requestError?.serviceException?.messageId;
  const errorText = responseBody?.requestError?.serviceException?.text;
  const errorMessage = SMS_ERROR_CODE_MAP[errorCode] || errorText || 'Unknown API error';

  switch (statusCode) {
    case 400:
      return new SmsValidationError(errorMessage);
    case 401:
      return new SmsAuthenticationError(errorMessage);
    case 429:
      const retryAfter = responseBody?.requestError?.serviceException?.retryAfter;
      return new SmsRateLimitError(errorMessage, retryAfter);
    case 408:
    case 504:
      return new SmsTimeoutError(errorMessage, 30000);
    case 500:
    case 502:
    case 503:
      return new SmsApiError(errorMessage, statusCode, errorCode, errorText, responseBody);
    default:
      if (originalError && originalError.message.includes('network')) {
        return new SmsNetworkError(errorMessage, originalError);
      }
      return new SmsApiError(errorMessage, statusCode, errorCode, errorText, responseBody);
  }
}

/**
 * Utility function to determine if an error is retryable
 */
export function isSmsErrorRetryable(error: SmsError): boolean {
  if (error instanceof SmsRateLimitError) return true;
  if (error instanceof SmsTimeoutError) return true;
  if (error instanceof SmsNetworkError) return true;
  if (error instanceof SmsApiError) {
    return error.statusCode === 500 || error.statusCode === 502 || error.statusCode === 503;
  }
  return false;
}

/**
 * SMS Utilities Tests
 * 
 * Comprehensive test suite for SMS utility functions
 * 
 * @author SMS Modernization Team
 * @version 1.0.0
 */

import {
  MessageEncoding,
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
} from '../../src/utils/sms-utils';

describe('SMS Utilities', () => {
  describe('detectMessageEncoding()', () => {
    it('should_detect_gsm_7bit_encoding_for_basic_text', () => {
      const text = 'Hello World! This is a test message.';
      const encoding = detectMessageEncoding(text);
      expect(encoding).toBe(MessageEncoding.GSM_7BIT);
    });

    it('should_detect_unicode_encoding_for_emoji', () => {
      const text = 'Hello World! 🚀';
      const encoding = detectMessageEncoding(text);
      expect(encoding).toBe(MessageEncoding.UNICODE);
    });

    it('should_detect_gsm_7bit_for_extended_characters', () => {
      const text = 'Hello {World}';
      const encoding = detectMessageEncoding(text);
      expect(encoding).toBe(MessageEncoding.GSM_7BIT);
    });

    it('should_return_gsm_7bit_for_empty_string', () => {
      const encoding = detectMessageEncoding('');
      expect(encoding).toBe(MessageEncoding.GSM_7BIT);
    });
  });

  describe('calculateMessageParts()', () => {
    it('should_calculate_single_part_for_short_gsm_message', () => {
      const text = 'Hello World!';
      const result = calculateMessageParts(text);
      
      expect(result.encoding).toBe(MessageEncoding.GSM_7BIT);
      expect(result.parts).toBe(1);
      expect(result.length).toBe(12);
      expect(result.charactersPerPart).toBe(160);
      expect(result.remainingCharacters).toBe(148);
    });

    it('should_calculate_multiple_parts_for_long_gsm_message', () => {
      const text = 'A'.repeat(200);
      const result = calculateMessageParts(text);
      
      expect(result.encoding).toBe(MessageEncoding.GSM_7BIT);
      expect(result.parts).toBe(2);
      expect(result.charactersPerPart).toBe(153);
    });

    it('should_calculate_single_part_for_short_unicode_message', () => {
      const text = 'Hello 🚀';
      const result = calculateMessageParts(text);
      
      expect(result.encoding).toBe(MessageEncoding.UNICODE);
      expect(result.parts).toBe(1);
      expect(result.charactersPerPart).toBe(70);
    });

    it('should_calculate_multiple_parts_for_long_unicode_message', () => {
      const text = '🚀'.repeat(80);
      const result = calculateMessageParts(text);
      
      expect(result.encoding).toBe(MessageEncoding.UNICODE);
      expect(result.parts).toBe(2);
      expect(result.charactersPerPart).toBe(67);
    });

    it('should_count_extended_gsm_characters_as_double', () => {
      const text = '{}'.repeat(80); // 160 effective characters
      const result = calculateMessageParts(text);
      
      expect(result.encoding).toBe(MessageEncoding.GSM_7BIT);
      expect(result.parts).toBe(2);
      expect(result.length).toBe(160);
    });

    it('should_return_zero_parts_for_empty_string', () => {
      const result = calculateMessageParts('');
      
      expect(result.parts).toBe(0);
      expect(result.length).toBe(0);
      expect(result.remainingCharacters).toBe(160);
    });
  });

  describe('formatPhoneNumber()', () => {
    it('should_format_valid_e164_number', () => {
      const result = formatPhoneNumber('+1234567890');
      
      expect(result.isValid).toBe(true);
      expect(result.formatted).toBe('+1234567890');
      expect(result.original).toBe('+1234567890');
    });

    it('should_format_number_with_spaces_and_dashes', () => {
      const result = formatPhoneNumber('+1 (234) 567-890');
      
      expect(result.isValid).toBe(true);
      expect(result.formatted).toBe('+1234567890');
    });

    it('should_add_default_country_code', () => {
      const result = formatPhoneNumber('234567890', '+1');
      
      expect(result.isValid).toBe(true);
      expect(result.formatted).toBe('+1234567890');
    });

    it('should_return_invalid_for_empty_string', () => {
      const result = formatPhoneNumber('');
      
      expect(result.isValid).toBe(false);
      expect(result.formatted).toBe('');
    });

    it('should_return_invalid_for_too_short_number', () => {
      const result = formatPhoneNumber('+123');
      
      expect(result.isValid).toBe(false);
    });

    it('should_return_invalid_for_too_long_number', () => {
      const result = formatPhoneNumber('+' + '1'.repeat(16));
      
      expect(result.isValid).toBe(false);
    });
  });

  describe('isValidPhoneNumber()', () => {
    it('should_validate_correct_e164_format', () => {
      expect(isValidPhoneNumber('+1234567890')).toBe(true);
      expect(isValidPhoneNumber('+44123456789')).toBe(true);
    });

    it('should_reject_invalid_formats', () => {
      expect(isValidPhoneNumber('1234567890')).toBe(false);
      expect(isValidPhoneNumber('+0123456789')).toBe(false);
      expect(isValidPhoneNumber('')).toBe(false);
      expect(isValidPhoneNumber('+123')).toBe(false);
    });
  });

  describe('isValidSenderId()', () => {
    it('should_validate_phone_number_sender', () => {
      expect(isValidSenderId('+1234567890')).toBe(true);
    });

    it('should_validate_alphanumeric_sender', () => {
      expect(isValidSenderId('InfoSMS')).toBe(true);
      expect(isValidSenderId('Test123')).toBe(true);
    });

    it('should_reject_invalid_senders', () => {
      expect(isValidSenderId('')).toBe(false);
      expect(isValidSenderId('TooLongSenderID')).toBe(false);
      expect(isValidSenderId('Invalid@Sender')).toBe(false);
    });
  });

  describe('estimateSmsCost()', () => {
    it('should_calculate_cost_for_single_part_message', () => {
      const text = 'Hello World!';
      const destinations = ['+1234567890', '+0987654321'];
      const result = estimateSmsCost(text, destinations, 0.05);
      
      expect(result.totalMessages).toBe(2);
      expect(result.totalParts).toBe(2);
      expect(result.costPerMessage).toBe(0.05);
      expect(result.totalCost).toBe(0.10);
      expect(result.encoding).toBe(MessageEncoding.GSM_7BIT);
    });

    it('should_calculate_cost_for_multi_part_message', () => {
      const text = 'A'.repeat(200);
      const destinations = ['+1234567890'];
      const result = estimateSmsCost(text, destinations, 0.05);
      
      expect(result.totalMessages).toBe(1);
      expect(result.totalParts).toBe(2);
      expect(result.costPerMessage).toBe(0.10);
      expect(result.totalCost).toBe(0.10);
    });
  });

  describe('formatSendAtDateTime()', () => {
    it('should_format_valid_future_date_string', () => {
      const futureDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
      const result = formatSendAtDateTime(futureDate.toISOString());
      
      expect(result).toBe(futureDate.toISOString());
    });

    it('should_format_valid_future_date_object', () => {
      const futureDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const result = formatSendAtDateTime(futureDate);
      
      expect(result).toBe(futureDate.toISOString());
    });

    it('should_throw_error_for_past_date', () => {
      const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
      
      expect(() => formatSendAtDateTime(pastDate)).toThrow('sendAt datetime must be in the future');
    });

    it('should_throw_error_for_invalid_date', () => {
      expect(() => formatSendAtDateTime('invalid-date')).toThrow('Invalid datetime format');
    });
  });

  describe('isValidNotifyUrl()', () => {
    it('should_validate_https_urls', () => {
      expect(isValidNotifyUrl('https://example.com/webhook')).toBe(true);
    });

    it('should_validate_http_urls', () => {
      expect(isValidNotifyUrl('http://example.com/webhook')).toBe(true);
    });

    it('should_reject_invalid_protocols', () => {
      expect(isValidNotifyUrl('ftp://example.com')).toBe(false);
      expect(isValidNotifyUrl('file:///path/to/file')).toBe(false);
    });

    it('should_reject_invalid_urls', () => {
      expect(isValidNotifyUrl('not-a-url')).toBe(false);
      expect(isValidNotifyUrl('')).toBe(false);
    });
  });

  describe('generateMessageId()', () => {
    it('should_generate_unique_message_ids', () => {
      const id1 = generateMessageId();
      const id2 = generateMessageId();
      
      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^msg-\d+-[a-z0-9]+$/);
    });

    it('should_use_custom_prefix', () => {
      const id = generateMessageId('test');
      
      expect(id).toMatch(/^test-\d+-[a-z0-9]+$/);
    });
  });

  describe('splitTextIntoParts()', () => {
    it('should_return_single_part_for_short_text', () => {
      const text = 'Hello World!';
      const parts = splitTextIntoParts(text);
      
      expect(parts).toHaveLength(1);
      expect(parts[0]).toBe(text);
    });

    it('should_split_long_text_into_multiple_parts', () => {
      const text = 'A'.repeat(200);
      const parts = splitTextIntoParts(text);
      
      expect(parts.length).toBeGreaterThan(1);
      expect(parts.join('')).toBe(text);
    });

    it('should_return_empty_array_for_empty_text', () => {
      const parts = splitTextIntoParts('');
      
      expect(parts).toEqual([]);
    });
  });

  describe('isValidDeliveryTimeWindow()', () => {
    it('should_validate_correct_time_window', () => {
      const timeWindow = {
        days: ['MONDAY', 'TUESDAY', 'WEDNESDAY'],
        from: '09:00',
        to: '17:00'
      };
      
      expect(isValidDeliveryTimeWindow(timeWindow)).toBe(true);
    });

    it('should_validate_time_window_without_times', () => {
      const timeWindow = {
        days: ['MONDAY', 'FRIDAY']
      };
      
      expect(isValidDeliveryTimeWindow(timeWindow)).toBe(true);
    });

    it('should_reject_invalid_days', () => {
      const timeWindow = {
        days: ['INVALID_DAY']
      };
      
      expect(isValidDeliveryTimeWindow(timeWindow)).toBe(false);
    });

    it('should_reject_invalid_time_format', () => {
      const timeWindow = {
        days: ['MONDAY'],
        from: '25:00'
      };
      
      expect(isValidDeliveryTimeWindow(timeWindow)).toBe(false);
    });

    it('should_reject_empty_days_array', () => {
      const timeWindow = {
        days: []
      };
      
      expect(isValidDeliveryTimeWindow(timeWindow)).toBe(false);
    });
  });
});

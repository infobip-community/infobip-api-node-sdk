/**
 * SMS v3 API Tests
 * 
 * Comprehensive test suite for the SMS v3 unified API implementation
 * following the tracking document requirements for 90%+ test coverage.
 * 
 * @author SMS Modernization Team
 * @version 1.0.0
 */

import { SMS } from '../../src/apis/sms';
import { InfobipAuth } from '../../src/utils/auth';
import { SendSmsV3Request, DeliveryStatus, GeneralStatus } from '../../src/types/sms';
import { 
  SmsValidationError, 
  SmsRateLimitError, 
  SmsNetworkError 
} from '../../src/errors/sms-errors';

// Mock the HTTP client
jest.mock('../../src/utils/http');

describe('SMS v3 API', () => {
  let sms: SMS;
  let mockHttp: any;

  const mockCredentials: InfobipAuth = {
    baseUrl: 'https://api.infobip.com',
    authorization: 'Bearer test-token'
  };

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    sms = new SMS(mockCredentials);
    mockHttp = sms.http;
  });

  describe('sendV3()', () => {
    const validTextRequest: SendSmsV3Request = {
      messages: [{
        from: 'InfoSMS',
        destinations: [{ to: '+1234567890' }],
        text: 'Hello World!'
      }]
    };

    const validBinaryRequest: SendSmsV3Request = {
      messages: [{
        from: '+1234567890',
        destinations: [{ to: '+0987654321' }],
        binary: {
          hex: '48656C6C6F20576F726C6421',
          dataCoding: 0,
          esmClass: 0
        }
      }]
    };

    it('should_send_text_message_successfully_when_valid_request_provided', async () => {
      const mockResponse = {
        data: {
          bulkId: 'bulk-123',
          messages: [{
            messageId: 'msg-123',
            status: {
              groupId: 1,
              groupName: 'PENDING',
              id: 26,
              name: 'MESSAGE_ACCEPTED',
              description: 'Message sent to next instance'
            },
            to: '+1234567890',
            smsCount: 1
          }]
        }
      };

      mockHttp.post.mockResolvedValue(mockResponse);

      const result = await sms.sendV3(validTextRequest);

      expect(mockHttp.post).toHaveBeenCalledWith('/sms/3/messages', validTextRequest);
      expect(result).toEqual(mockResponse.data);
      expect(result.bulkId).toBe('bulk-123');
      expect(result.messages).toHaveLength(1);
    });

    it('should_send_binary_message_successfully_when_valid_request_provided', async () => {
      const mockResponse = {
        data: {
          bulkId: 'bulk-456',
          messages: [{
            messageId: 'msg-456',
            status: {
              groupId: 1,
              groupName: 'PENDING',
              id: 26,
              name: 'MESSAGE_ACCEPTED',
              description: 'Message sent to next instance'
            },
            to: '+0987654321',
            smsCount: 1
          }]
        }
      };

      mockHttp.post.mockResolvedValue(mockResponse);

      const result = await sms.sendV3(validBinaryRequest);

      expect(mockHttp.post).toHaveBeenCalledWith('/sms/3/messages', validBinaryRequest);
      expect(result).toEqual(mockResponse.data);
    });

    it('should_include_sms_count_in_response_when_flag_is_true', async () => {
      const requestWithCount = {
        ...validTextRequest,
        includeSmsCountInResponse: true
      };

      const mockResponse = {
        data: {
          bulkId: 'bulk-789',
          messages: [{
            messageId: 'msg-789',
            status: {
              groupId: 1,
              groupName: 'PENDING',
              id: 26,
              name: 'MESSAGE_ACCEPTED',
              description: 'Message sent to next instance'
            },
            to: '+1234567890',
            smsCount: 2
          }]
        }
      };

      mockHttp.post.mockResolvedValue(mockResponse);

      const result = await sms.sendV3(requestWithCount);

      expect(mockHttp.post).toHaveBeenCalledWith('/sms/3/messages', requestWithCount);
      expect(result.messages[0].smsCount).toBe(2);
    });

    it('should_throw_validation_error_when_messages_array_is_empty', async () => {
      const invalidRequest = {
        messages: []
      };

      await expect(sms.sendV3(invalidRequest)).rejects.toThrow(SmsValidationError);
      await expect(sms.sendV3(invalidRequest)).rejects.toThrow('messages array cannot be empty');
    });

    it('should_throw_validation_error_when_messages_array_exceeds_limit', async () => {
      const invalidRequest = {
        messages: new Array(1001).fill(validTextRequest.messages[0])
      };

      await expect(sms.sendV3(invalidRequest)).rejects.toThrow(SmsValidationError);
      await expect(sms.sendV3(invalidRequest)).rejects.toThrow('messages array cannot contain more than 1000 messages');
    });

    it('should_throw_validation_error_when_from_field_is_missing', async () => {
      const invalidRequest = {
        messages: [{
          destinations: [{ to: '+1234567890' }],
          text: 'Hello World!'
        }]
      };

      await expect(sms.sendV3(invalidRequest as any)).rejects.toThrow(SmsValidationError);
      await expect(sms.sendV3(invalidRequest as any)).rejects.toThrow('messages[0].from is required');
    });

    it('should_throw_validation_error_when_destinations_array_is_empty', async () => {
      const invalidRequest = {
        messages: [{
          from: 'InfoSMS',
          destinations: [],
          text: 'Hello World!'
        }]
      };

      await expect(sms.sendV3(invalidRequest)).rejects.toThrow(SmsValidationError);
      await expect(sms.sendV3(invalidRequest)).rejects.toThrow('messages[0].destinations cannot be empty');
    });

    it('should_throw_validation_error_when_phone_number_format_is_invalid', async () => {
      const invalidRequest = {
        messages: [{
          from: 'InfoSMS',
          destinations: [{ to: 'invalid-phone' }],
          text: 'Hello World!'
        }]
      };

      await expect(sms.sendV3(invalidRequest)).rejects.toThrow(SmsValidationError);
      await expect(sms.sendV3(invalidRequest)).rejects.toThrow('must be a valid phone number in E.164 format');
    });

    it('should_throw_validation_error_when_text_exceeds_gsm_limit', async () => {
      const longText = 'A'.repeat(1601); // Exceeds GSM 7-bit limit
      const invalidRequest = {
        messages: [{
          from: 'InfoSMS',
          destinations: [{ to: '+1234567890' }],
          text: longText
        }]
      };

      await expect(sms.sendV3(invalidRequest)).rejects.toThrow(SmsValidationError);
      await expect(sms.sendV3(invalidRequest)).rejects.toThrow('exceeds maximum length of 1600 characters for GSM 7-bit encoding');
    });

    it('should_throw_validation_error_when_unicode_text_exceeds_limit', async () => {
      const longUnicodeText = '🚀'.repeat(701); // Exceeds Unicode limit
      const invalidRequest = {
        messages: [{
          from: 'InfoSMS',
          destinations: [{ to: '+1234567890' }],
          text: longUnicodeText
        }]
      };

      await expect(sms.sendV3(invalidRequest)).rejects.toThrow(SmsValidationError);
      await expect(sms.sendV3(invalidRequest)).rejects.toThrow('exceeds maximum length of 700 characters for Unicode encoding');
    });

    it('should_throw_validation_error_when_binary_hex_is_invalid', async () => {
      const invalidRequest = {
        messages: [{
          from: '+1234567890',
          destinations: [{ to: '+0987654321' }],
          binary: {
            hex: 'invalid-hex-string'
          }
        }]
      };

      await expect(sms.sendV3(invalidRequest)).rejects.toThrow(SmsValidationError);
      await expect(sms.sendV3(invalidRequest)).rejects.toThrow('must contain only hexadecimal characters');
    });

    it('should_throw_api_error_when_server_returns_400', async () => {
      const errorResponse = {
        response: {
          status: 400,
          data: {
            requestError: {
              serviceException: {
                messageId: 'BAD_REQUEST',
                text: 'Invalid request parameters'
              }
            }
          }
        }
      };

      mockHttp.post.mockRejectedValue(errorResponse);

      await expect(sms.sendV3(validTextRequest)).rejects.toThrow(SmsValidationError);
    });

    it('should_throw_rate_limit_error_when_server_returns_429', async () => {
      const errorResponse = {
        response: {
          status: 429,
          data: {
            requestError: {
              serviceException: {
                messageId: 'TOO_MANY_REQUESTS',
                text: 'Rate limit exceeded',
                retryAfter: 60
              }
            }
          }
        }
      };

      mockHttp.post.mockRejectedValue(errorResponse);

      await expect(sms.sendV3(validTextRequest)).rejects.toThrow(SmsRateLimitError);
    });

    it('should_throw_network_error_when_network_fails', async () => {
      const networkError = {
        request: {},
        message: 'Network Error'
      };

      mockHttp.post.mockRejectedValue(networkError);

      await expect(sms.sendV3(validTextRequest)).rejects.toThrow(SmsNetworkError);
    });
  });

  describe('getDeliveryReportsV3()', () => {
    it('should_get_delivery_reports_successfully_with_no_filters', async () => {
      const mockResponse = {
        data: {
          results: [{
            bulkId: 'bulk-123',
            messageId: 'msg-123',
            to: '+1234567890',
            from: 'InfoSMS',
            text: 'Hello World!',
            sentAt: '2025-10-10T10:00:00.000Z',
            doneAt: '2025-10-10T10:01:00.000Z',
            smsCount: 1,
            status: {
              groupId: 3,
              groupName: 'DELIVERED',
              id: 5,
              name: 'DELIVERED_TO_HANDSET',
              description: 'Message delivered to handset'
            }
          }]
        }
      };

      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await sms.v3.getReports();

      expect(mockHttp.get).toHaveBeenCalledWith('/sms/3/reports', {});
      expect(result).toEqual(mockResponse.data);
    });

    it('should_get_delivery_reports_with_filters_successfully', async () => {
      const query = {
        bulkId: 'bulk-123',
        limit: 100,
        deliveryStatus: DeliveryStatus.DELIVERED
      };

      const mockResponse = {
        data: {
          results: []
        }
      };

      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await sms.v3.getReports(query);

      expect(mockHttp.get).toHaveBeenCalledWith('/sms/3/reports', query);
      expect(result).toEqual(mockResponse.data);
    });

    it('should_throw_validation_error_when_limit_exceeds_maximum', async () => {
      const invalidQuery = {
        limit: 1001
      };

      await expect(sms.v3.getReports(invalidQuery)).rejects.toThrow(SmsValidationError);
      await expect(sms.v3.getReports(invalidQuery)).rejects.toThrow('limit must be a number between 1 and 1000');
    });

    it('should_throw_validation_error_when_delivery_status_is_invalid', async () => {
      const invalidQuery = {
        deliveryStatus: 'INVALID_STATUS' as any
      };

      await expect(sms.v3.getReports(invalidQuery)).rejects.toThrow(SmsValidationError);
    });
  });

  describe('getMessageLogsV3()', () => {
    it('should_get_message_logs_successfully_with_no_filters', async () => {
      const mockResponse = {
        data: {
          results: [{
            messageId: 'msg-123',
            to: '+1234567890',
            from: 'InfoSMS',
            text: 'Hello World!',
            sentAt: '2025-10-10T10:00:00.000Z',
            smsCount: 1,
            status: {
              groupId: 1,
              groupName: 'PENDING',
              id: 26,
              name: 'MESSAGE_ACCEPTED',
              description: 'Message sent to next instance'
            }
          }]
        }
      };

      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await sms.v3.getLogs();

      expect(mockHttp.get).toHaveBeenCalledWith('/sms/3/logs', {});
      expect(result).toEqual(mockResponse.data);
    });

    it('should_get_message_logs_with_filters_successfully', async () => {
      const query = {
        from: 'InfoSMS',
        generalStatus: GeneralStatus.DELIVERED,
        limit: 500
      };

      const mockResponse = {
        data: {
          results: []
        }
      };

      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await sms.v3.getLogs(query);

      expect(mockHttp.get).toHaveBeenCalledWith('/sms/3/logs', query);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('sendQueryV3()', () => {
    it('should_send_query_sms_successfully_with_warning', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      const query = {
        from: 'InfoSMS',
        to: '+1234567890',
        text: 'Hello World!'
      };

      const mockResponse = {
        data: {
          bulkId: 'bulk-query-123',
          messages: [{
            messageId: 'msg-query-123',
            status: {
              groupId: 1,
              groupName: 'PENDING',
              id: 26,
              name: 'MESSAGE_ACCEPTED',
              description: 'Message sent to next instance'
            },
            to: '+1234567890'
          }]
        }
      };

      mockHttp.get.mockResolvedValue(mockResponse);

      const result = await sms.sendQueryV3(query);

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Query-based SMS sending is not recommended')
      );
      expect(mockHttp.get).toHaveBeenCalledWith('/sms/3/text/query', query);
      expect(result).toEqual(mockResponse.data);

      consoleSpy.mockRestore();
    });

    it('should_throw_validation_error_when_required_query_params_missing', async () => {
      const invalidQuery = {
        from: 'InfoSMS'
        // Missing 'to' and 'text'
      };

      await expect(sms.sendQueryV3(invalidQuery)).rejects.toThrow(SmsValidationError);
      await expect(sms.sendQueryV3(invalidQuery)).rejects.toThrow('to parameter is required');
    });
  });

  describe('Backward Compatibility', () => {
    it('should_show_deprecation_warning_when_using_legacy_send_method', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      const legacyMessage = {
        messages: [{
          from: 'InfoSMS',
          destinations: [{ to: '+1234567890' }],
          text: 'Hello World!'
        }]
      };

      mockHttp.post.mockResolvedValue({ data: {} });

      await sms.send(legacyMessage);

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('DEPRECATION WARNING: The send() method uses deprecated v2 API endpoints')
      );

      consoleSpy.mockRestore();
    });

    it('should_show_deprecation_warning_when_using_legacy_reports_method', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      mockHttp.get.mockResolvedValue({ data: {} });

      await sms.reports.get({});

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('DEPRECATION WARNING: This method uses deprecated v1 API endpoint')
      );

      consoleSpy.mockRestore();
    });
  });

  describe('Regional Compliance', () => {
    it('should_validate_india_dlt_parameters_successfully', async () => {
      const requestWithIndiaDlt: SendSmsV3Request = {
        messages: [{
          from: 'InfoSMS',
          destinations: [{ to: '+911234567890' }],
          text: 'Hello India!',
          regional: {
            indiaDlt: {
              principalEntityId: 'entity-123',
              contentTemplateId: 'template-456'
            }
          }
        }]
      };

      const mockResponse = {
        data: {
          bulkId: 'bulk-india-123',
          messages: [{
            messageId: 'msg-india-123',
            status: {
              groupId: 1,
              groupName: 'PENDING',
              id: 26,
              name: 'MESSAGE_ACCEPTED',
              description: 'Message sent to next instance'
            },
            to: '+911234567890',
            smsCount: 1
          }]
        }
      };

      mockHttp.post.mockResolvedValue(mockResponse);

      const result = await sms.sendV3(requestWithIndiaDlt);

      expect(result).toEqual(mockResponse.data);
    });

    it('should_throw_validation_error_when_india_dlt_content_template_id_missing', async () => {
      const invalidRequest: SendSmsV3Request = {
        messages: [{
          from: 'InfoSMS',
          destinations: [{ to: '+911234567890' }],
          text: 'Hello India!',
          regional: {
            indiaDlt: {
              principalEntityId: 'entity-123'
              // Missing contentTemplateId
            } as any
          }
        }]
      };

      await expect(sms.sendV3(invalidRequest as any)).rejects.toThrow(SmsValidationError);
      await expect(sms.sendV3(invalidRequest as any)).rejects.toThrow('contentTemplateId is required');
    });
  });

  describe('Advanced Features', () => {
    it('should_validate_url_options_successfully', async () => {
      const requestWithUrlOptions: SendSmsV3Request = {
        messages: [{
          from: 'InfoSMS',
          destinations: [{ to: '+1234567890' }],
          text: 'Check out https://example.com',
          urlOptions: {
            shortenUrl: true,
            trackClicks: true,
            customDomain: 'short.example.com'
          }
        }]
      };

      const mockResponse = {
        data: {
          bulkId: 'bulk-url-123',
          messages: [{
            messageId: 'msg-url-123',
            status: {
              groupId: 1,
              groupName: 'PENDING',
              id: 26,
              name: 'MESSAGE_ACCEPTED',
              description: 'Message sent to next instance'
            },
            to: '+1234567890',
            smsCount: 1
          }]
        }
      };

      mockHttp.post.mockResolvedValue(mockResponse);

      const result = await sms.sendV3(requestWithUrlOptions);

      expect(result).toEqual(mockResponse.data);
    });

    it('should_validate_delivery_time_window_successfully', async () => {
      const requestWithTimeWindow: SendSmsV3Request = {
        messages: [{
          from: 'InfoSMS',
          destinations: [{ to: '+1234567890' }],
          text: 'Scheduled message',
          deliveryTimeWindow: {
            days: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
            from: '09:00',
            to: '17:00'
          }
        }]
      };

      const mockResponse = {
        data: {
          bulkId: 'bulk-scheduled-123',
          messages: [{
            messageId: 'msg-scheduled-123',
            status: {
              groupId: 1,
              groupName: 'PENDING',
              id: 26,
              name: 'MESSAGE_ACCEPTED',
              description: 'Message sent to next instance'
            },
            to: '+1234567890',
            smsCount: 1
          }]
        }
      };

      mockHttp.post.mockResolvedValue(mockResponse);

      const result = await sms.sendV3(requestWithTimeWindow);

      expect(result).toEqual(mockResponse.data);
    });
  });
});

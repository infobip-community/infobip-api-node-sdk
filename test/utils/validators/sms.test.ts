import {
  validateSMSMessage,
  validateBodyParameters,
  validateQueryParameters,
  validatePreview,
} from '../../../src/utils/validators/sms';

import {
  sendMessage,
  basicTextMessage,
  binaryTextMessage,
  previewMessage,
  sendQueryMessage,
  bulkId,
  rescheduleSendAt,
  updateStatus,
} from '../../fixtures/sms';

describe('validateSMSSend', () => {
  it('validates basic parameters for text messages', () => {
    expect(validateSMSMessage(basicTextMessage)).toBeTruthy();
  });

  it('validates complex parameters for text messages', () => {
    expect(validateSMSMessage(sendMessage)).toBeTruthy();
  });

  it('throws if messages is missing', () => {
    expect(() => {
      validateSMSMessage({});
    }).toThrow('messages is required.');
  });

  it('validates binary object parameter for binary text messages', () => {
    expect(validateSMSMessage(binaryTextMessage)).toBeTruthy();
  });

  it('validates query object for query text messages', () => {
    expect(validateSMSMessage(sendQueryMessage)).toBeTruthy();
  });

  it('validates query object for scheduled messages', () => {
    expect(validateQueryParameters(bulkId)).toBeTruthy();
  });

  it('validates sendAt body object for scheduled messages', () => {
    expect(validateBodyParameters(rescheduleSendAt)).toBeTruthy();
  });

  it('validates status body object for scheduled messages', () => {
    expect(validateBodyParameters(updateStatus)).toBeTruthy();
  });

  it('return false body object for scheduled messages', () => {
    expect(validateBodyParameters({ test: 'false' })).toBeFalsy();
  });
});

describe('validatePreview', () => {
  it('validates basic parameters for text messages', () => {
    expect(validatePreview(previewMessage)).toBeTruthy();
  });

  it('throws if messages is missing', () => {
    expect(() => {
      validatePreview({});
    }).toThrow('text is required.');
  });
});

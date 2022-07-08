import { validateSMSMessage } from '../../../src/utils/validators/sms';

import {
  sendMessage,
  basicTextMessage,
  binaryTextMessage,
  previewMessage,
  sendQueryMessage,
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

  it('validates binary object parameter for binary text messages', () => {
    expect(validateSMSMessage(previewMessage)).toBeTruthy();
  });

  it('validates query object for query text messages', () => {
    expect(validateSMSMessage(sendQueryMessage)).toBeTruthy();
  });
});

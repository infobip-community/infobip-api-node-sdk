import { validateSMSSend } from '../../../src/utils/validators/sms';

import { sendMessage, basicTextMessage } from '../../fixtures/sms';

describe('validateSMSSend', () => {
  it('validates basic parameters for text messages', () => {
    expect(validateSMSSend(basicTextMessage)).toBeTruthy();
  });

  it('validates complex parameters for text messages', () => {
    expect(validateSMSSend(sendMessage)).toBeTruthy();
  });

  it('throws if messages is missing', () => {
    expect(() => {
      validateSMSSend({});
    }).toThrow('messages is required.');
  });
});

export interface TwoFAApplication {
  configuration?: Configuration;
  enabled?: boolean;
  name: string;
}

export interface Configuration {
  allowMultiplePinVerifications?: boolean;
  pinAttempts?: number;
  pinTimeToLive?: string;
  sendPinPerApplicationLimit?: string;
  sendPinPerPhoneNumberLimit?: string;
  verifyPinLimit?: string;
}

export interface TwoFAMessageTemplate {
  language?: string;
  messageText: string;
  pinLength?: number;
  pinType: string;
  regional?: Regional;
  repeatDTMF?: string;
  senderId?: string;
  speechRate?: number;
}

export interface Regional {
  indiaDlt?: IndiaDlt;
}

export interface IndiaDlt {
  contentTemplateId?: string;
  principalEntityId: string;
}

export interface TwoFAPinCode {
  applicationId: string;
  from?: string;
  messageId: string;
  placeholders?: object;
  to: string;
}

export interface Pin {
  pin: string;
}

export interface TwoFAVerificationStatus {
  msisdn: string;
  verified?: boolean;
  sent?: boolean;
}

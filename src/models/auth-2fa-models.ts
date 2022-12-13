export interface Auth2FAApplication {
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

export interface Auth2FAMessageTemplate {
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

export interface Auth2FAPinCode {
  applicationId: string;
  from?: string;
  messageId: string;
  placeholders?: object;
  to: string;
}

export interface Pin {
  pin: string;
}

export interface Auth2FAVerificationStatus {
  msisdn: string;
  verified?: boolean;
  sent?: boolean;
}

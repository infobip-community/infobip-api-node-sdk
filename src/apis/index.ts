import { SMS } from './sms';
import { WhatsApp } from './whatsapp';
import { TwoFA } from './2fa';
import { Auth } from './auth';
import { Email } from './email';
import { EmailDomain } from './email-domain';
import { Infobip } from '..';

class API {
  sms: SMS;
  whatsapp: WhatsApp;
  twoFA: TwoFA;
  auth: Auth;
  email: Email;
  emailDomain: EmailDomain;

  constructor(infobip: Infobip) {
    this.sms = new SMS(infobip);
    this.whatsapp = new WhatsApp(infobip);
    this.twoFA = new TwoFA(infobip);
    this.auth = new Auth(infobip);
    this.email = new Email(infobip);
    this.emailDomain = new EmailDomain(infobip);
  }
}

export { API };

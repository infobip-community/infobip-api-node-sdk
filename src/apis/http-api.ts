import { Infobip } from '..';
import { Http } from '../utils/http';

class HttpApi {
  http: Http;
  username?: string;
  password?: string;

  constructor(infobip: Infobip) {
    this.http = infobip.http;
    if (infobip.credentials?.username)
      this.username = infobip.credentials.username;
    if (infobip.credentials?.password)
      this.password = infobip.credentials.password;
  }
}

export { HttpApi };

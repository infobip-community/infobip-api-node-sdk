import { SMS } from '../../src/apis/sms';
import { textMessage } from '../sms-fixtures';

import axios from 'axios';
jest.mock('axios');

beforeAll(() => {
  (axios as any).create.mockReturnThis();
});

const BASE_URL = 'https://example.org';
const USERNAME = 'infobip';
const PASSWORD = 's3cr3t';

describe('SMS', () => {
  it('can send a text message', async () => {
    expect.assertions(1);
    (axios as any).post.mockResolvedValue({});

    let sms = new SMS({
      baseUrl: BASE_URL,
      username: USERNAME,
      password: PASSWORD,
    });
    await sms.send(textMessage);

    expect(axios.post).toHaveBeenCalledWith(
      '/sms/2/text/advanced',
      textMessage,
      undefined
    );
  });
});

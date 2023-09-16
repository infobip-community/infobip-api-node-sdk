import { FormDataBuilder } from '../../src/utils/form-data';
import FormData from 'form-data';
import Fs from 'fs';

describe('FormDataBuilder', () => {
  it('preserves a FormData instance', () => {
    let form = new FormData();
    FormDataBuilder(form, { text: 'test' });
    expect(form instanceof FormData).toBeTruthy();
  });

  it('preserves a FormData instance even for nested objects', () => {
    let form = new FormData();
    FormDataBuilder(form, { one: { two: { three: 'four' } } });
    expect(form instanceof FormData).toBeTruthy();
  });

  it('allows for array based fields', () => {
    let form = new FormData();
    FormDataBuilder(form, {
      to: ['example@example.com', 'test@example.com'],
    });
    expect(form instanceof FormData).toBeTruthy();
  });

  it('allows for files: attachments', () => {
    let form = new FormData();
    FormDataBuilder(form, {
      attachment: [
        {
          data: Fs.readFileSync('./test/utils/form-data.test.ts'),
          name: 'form-data.text.ts',
        },
      ],
    });
    expect(form instanceof FormData).toBeTruthy();
  });

  it('allows for files: inlineImages', () => {
    let form = new FormData();
    FormDataBuilder(form, {
      inlineImage: [
        {
          data: Fs.readFileSync('./test/utils/form-data.test.ts'),
          name: 'form-data.text.ts',
        },
      ],
    });
    expect(form instanceof FormData).toBeTruthy();
  });

  it('allows for files: attachments && inlineImages', () => {
    let form = new FormData();
    FormDataBuilder(form, {
      attachment: [
        {
          data: Fs.readFileSync('./test/utils/form-data.test.ts'),
          name: 'form-data.text.ts',
        },
      ],
      inlineImage: [
        {
          data: Fs.readFileSync('./test/utils/form-data.test.ts'),
          name: 'form-data.text.ts',
        },
      ],
    });
    expect(form instanceof FormData).toBeTruthy();
  });
});

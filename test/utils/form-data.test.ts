import { FormDataBuilder } from '../../src/utils/form-data';
import FormData from 'form-data';

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
});

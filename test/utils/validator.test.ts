import { Validator } from '../../src/utils/validator';

describe('Validator', () => {
  it('exports a required method', () => {
    expect(Validator.required).toBeDefined();
  });

  it('exports a string method', () => {
    expect(Validator.string).toBeDefined();
  });
});

describe('Validator.required', () => {
  it('throws if value is null', () => {
    expect(() => {
      Validator.required(null, 'value');
    }).toThrow('value is required.');
  });

  it('throws if value is undefined', () => {
    expect(() => {
      Validator.required(undefined, 'value');
    }).toThrow('value is required.');
  });

  it('throws if value is empty', () => {
    expect(() => {
      Validator.required('', 'value');
    }).toThrow('value is required.');
  });
});

describe('Validator.string', () => {
  it('throws if value is not a string', () => {
    expect(() => {
      Validator.string(10, 'value');
    }).toThrow('value must be a string.');
  });

  it('throws if value is empty', () => {
    expect(() => {
      Validator.string('', 'value');
    }).toThrow('value must be a string.');
  });
});

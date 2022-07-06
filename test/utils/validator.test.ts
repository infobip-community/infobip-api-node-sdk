import { Validator } from '../../src/utils/validator';

describe('Validator', () => {
  it('exports a required method', () => {
    expect(Validator.required).toBeDefined();
  });

  it('exports a string method', () => {
    expect(Validator.string).toBeDefined();
  });

  it('exports an object method', () => {
    expect(Validator.object).toBeDefined();
  });

  it('exports an array method', () => {
    expect(Validator.array).toBeDefined();
  });
});

describe('Validator.required', () => {
  it('checks a value is present', () => {
    expect(Validator.required(1)).toBeTruthy();
  });

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
  it('checks a string is present', () => {
    expect(Validator.string('1')).toBeTruthy();
  });

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

describe('Validator.number', () => {
  it('checks a string is present', () => {
    expect(Validator.number(1)).toBeTruthy();
  });

  it('throws if value is not a number', () => {
    expect(() => {
      Validator.number('10', 'value');
    }).toThrow('value must be a number.');
  });
});

describe('Validator.object', () => {
  it('checks an object is present', () => {
    expect(Validator.object({})).toBeTruthy();
  });

  it('throws if value is not an object', () => {
    expect(() => {
      Validator.object(10, 'value');
    }).toThrow('value must be an object.');
  });
});

describe('Validator.array', () => {
  it('checks an array is present', () => {
    expect(Validator.array([])).toBeTruthy();
  });

  it('throws if value is not an array', () => {
    expect(() => {
      Validator.array(10, 'value');
    }).toThrow('value must be an array.');
  });
});

describe('Validator.maxLength', () => {
  it('checks if length of a parameter is smaller or equal to a maximum length', () => {
    expect(Validator.maxLength('test', 4)).toBeTruthy();
  });

  it('throws if length of a parameter is larger than a maximum length', () => {
    expect(() => {
      Validator.maxLength('test', 3, 'parameter');
    }).toThrow('parameter must have a length smaller than or equal to 3.');
  });
});

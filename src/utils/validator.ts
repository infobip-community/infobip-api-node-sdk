module Validator {
  export function required(x: any, name?: string) {
    if (x === undefined || x === null || x === '') {
      throw new Error(`${name} is required.`);
    }

    return true;
  }

  export function string(x: any, name?: string) {
    if (typeof x !== 'string' || x === '') {
      throw new Error(`${name} must be a string.`);
    }

    return true;
  }

  export function number(x: any, name?: string) {
    if (typeof x !== 'number') {
      throw new Error(`${name} must be a number.`);
    }

    return true;
  }

  export function object(x: any, name?: string) {
    if (typeof x !== 'object') {
      throw new Error(`${name} must be an object.`);
    }

    return true;
  }

  export function array(x: any, name?: string) {
    if (!Array.isArray(x)) {
      throw new Error(`${name} must be an array.`);
    }

    return true;
  }

  export function oneOf(x: any, y: any, name?: string) {
    if (!Object.values(y).includes(x)) {
      throw new Error(`${name} must be one of ${Object.values(y).join(', ')}.`);
    }

    return true;
  }
}

export { Validator };

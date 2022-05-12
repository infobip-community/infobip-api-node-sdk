module Validator {
    export function required (x: any, name?: string) {
        if (x === undefined || x === null || x === '') {
            throw new Error(`${name} is required.`);
        }

        return true;
    }

    export function string (x: any, name?: string) {
        if (typeof x !== 'string' || x === '') {
            throw new Error(`${name} must be a string.`);
        }

        return true;
    }
}

export { Validator };
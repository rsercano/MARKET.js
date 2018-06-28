import { assert } from '../src/assert';
import BigNumber from 'bignumber.js';

describe('Assert library', () => {
  const variableName = 'variable';

  describe('isString', () => {
    it('should not throw for valid input', () => {
      const validInputs = ['hello', 'goodbye'];
      validInputs.forEach(input =>
        expect(assert.isString.bind(assert, variableName, input)).not.toThrow()
      );
    });
    it('should throw for invalid input', () => {
      const invalidInputs = [42, false, { random: 'test' }, undefined, new BigNumber(45)];
      invalidInputs.forEach(input =>
        expect(assert.isString.bind(assert, variableName, input)).toThrow()
      );
    });
  });

  describe('isFunction', () => {
    it('should not throw for valid input', () => {
      const validInputs = [BigNumber, assert.isString];
      validInputs.forEach(input =>
        expect(assert.isFunction.bind(assert, variableName, input)).not.toThrow()
      );
    });
    it('should throw for invalid input', () => {
      const invalidInputs = [42, false, { random: 'test' }, undefined, new BigNumber(45)];
      invalidInputs.forEach(input =>
        expect(assert.isFunction.bind(assert, variableName, input)).toThrow()
      );
    });
  });

  describe('isNumber', () => {
    it('should not throw for valid input', () => {
      const validInputs = [42, 0, 21e42];
      validInputs.forEach(input =>
        expect(assert.isNumber.bind(assert, variableName, input)).not.toThrow()
      );
    });
    it('should throw for invalid input', () => {
      const invalidInputs = [false, { random: 'test' }, undefined, new BigNumber(45)];
      invalidInputs.forEach(input =>
        expect(assert.isNumber.bind(assert, variableName, input)).toThrow()
      );
    });
  });
  describe('isBoolean', () => {
    it('should not throw for valid input', () => {
      const validInputs = [true, false];
      validInputs.forEach(input =>
        expect(assert.isBoolean.bind(assert, variableName, input)).not.toThrow()
      );
    });
    it('should throw for invalid input', () => {
      const invalidInputs = [42, { random: 'test' }, undefined, new BigNumber(45)];
      invalidInputs.forEach(input =>
        expect(assert.isBoolean.bind(assert, variableName, input)).toThrow()
      );
    });
  });

  describe('assert', () => {
    const assertMessage = 'assert not satisfied';
    it('should not throw for valid input', () => {
      expect(assert.assert.bind(assert, true, assertMessage)).not.toThrow();
    });
    it('should throw for invalid input', () => {
      expect(assert.assert.bind(assert, false, assertMessage)).toThrow();
    });
  });

  describe('typeAssertionMessage', () => {
    it('should render correct message', () => {
      expect(assert.typeAssertionMessage('variable', 'string', 'number')).toEqual(
        `Expected variable to be of type string, encountered: number`
      );
    });
  });

  describe('isWeb3Provider', () => {
    it('should not throw for valid input', () => {
      const validInputs = [{ sendAsync: () => 45 }];
      validInputs.forEach(input =>
        expect(assert.isWeb3Provider.bind(assert, variableName, input)).not.toThrow()
      );
    });
    it('should throw for invalid input', () => {
      const invalidInputs = [42, { random: 'test' }, undefined, new BigNumber(45)];
      invalidInputs.forEach(input =>
        expect(assert.isWeb3Provider.bind(assert, variableName, input)).toThrow()
      );
    });
  });
});

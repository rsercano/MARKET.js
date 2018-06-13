import { Schema } from 'jsonschema';
import * as _ from 'lodash';

import { Provider } from '@0xproject/types';

import { SchemaValidator } from './SchemaValidator';

export const assert = {
  assert(condition: boolean, message: string): void {
    if (!condition) {
      throw new Error(message);
    }
  },
  isBoolean(variableName: string, value: boolean): void {
    this.assert(_.isBoolean(value), this.typeAssertionMessage(variableName, 'boolean', value));
  },
  isFunction(variableName: string, value: Function): void {
    this.assert(_.isFunction(value), this.typeAssertionMessage(variableName, 'function', value));
  },
  isNumber(variableName: string, value: number): void {
    this.assert(_.isFinite(value), this.typeAssertionMessage(variableName, 'number', value));
  },
  isSchemaValid(variableName: string, value: {}, schema: Schema, subSchemas?: Schema[]): void {
    const schemaValidator = new SchemaValidator();
    if (!_.isUndefined(subSchemas)) {
      _.map(subSchemas, schemaValidator.addSchema.bind(schemaValidator));
    }
    const validationResult = schemaValidator.validate(value, schema);
    const hasValidationErrors = validationResult.errors.length > 0;
    const msg = `Expected ${variableName} to confirm to schema ${schema.id}
      Encountered: ${JSON.stringify(value, null, '\t')}
      Validation errors: ${validationResult.errors.join(', ')}`;
    this.assert(!hasValidationErrors, msg);
  },
  isString(variableName: string, value: string): void {
    this.assert(_.isString(value), this.typeAssertionMessage(variableName, 'string', value));
  },
  isWeb3Provider(variableName: string, value: Provider): void {
    const isWeb3Provider = _.isFunction(value.sendAsync);
    this.assert(isWeb3Provider, this.typeAssertionMessage(variableName, 'Provider', value));
  },
  typeAssertionMessage(variableName: string, type: string, value: {}): string {
    return `Expected ${variableName} to be of type ${type}, encountered: ${value}`;
  }
};

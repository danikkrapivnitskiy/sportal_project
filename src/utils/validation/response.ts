import Ajv from 'ajv';
import type { IResponse, IResponseFields } from '../../data/types/api.types';
import { expect } from '@playwright/test';

export function validateSchema<T extends IResponseFields>(response: IResponse<T>, schema: object): void {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const isValidSchema = validate(response.body);
  if (validate.errors) {
    process.stderr.write(`Validation errors: ${JSON.stringify(validate.errors)}
`);
  }
  expect(isValidSchema).toBe(true);
}

export function validateResponse<T extends IResponseFields>(
  response: IResponse<T>,
  status: number,
  IsSuccess: boolean,
  ErrorMessage: null | string
): void {
  expect(response.status).toBe(status);
  expect(response.body.IsSuccess).toBe(IsSuccess);
  expect(response.body.ErrorMessage).toBe(ErrorMessage);
}

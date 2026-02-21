interface SuccessResponse<T> {
  status: number;
  message: string;
  data: T;
}

export function ok<T>(data: T, message = "OK"): SuccessResponse<T> {
  return { status: 200, message, data };
}

export function created<T>(
  data: T,
  message = "Created successfully"
): SuccessResponse<T> {
  return { status: 201, message, data };
}

export function noContent(message = "No content"): SuccessResponse<null> {
  return { status: 204, message, data: null };
}

import { type TSchema, t } from "elysia";

export function okSchema<T extends TSchema>(dataSchema: T) {
  return t.Object({
    status: t.Number(),
    message: t.String(),
    data: dataSchema,
  });
}

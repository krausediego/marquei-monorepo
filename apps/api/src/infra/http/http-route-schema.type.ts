import type { TObject, TSchema } from "@sinclair/typebox";

type StatusCode = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 422 | 500;

export interface RouteSchema {
  body?: TObject;
  params?: TObject;
  query?: TObject;
  headers?: TObject;
  response?: Partial<Record<StatusCode, TSchema>>;
}

// helper para garantir o autocomplete e inferência correta
export const defineSchema = <T extends RouteSchema>(schema: T): T => schema;

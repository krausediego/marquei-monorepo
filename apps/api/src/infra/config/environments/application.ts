import { TypeCompiler } from "@sinclair/typebox/compiler";
import { t } from "elysia";

const envSchema = t.Object({
  PORT: t.String(),
  DATABASE_URL: t.String(),
  CLIENT_BASE_URL: t.String(),
  NODE_ENV: t.String(),
});

const compiler = TypeCompiler.Compile(envSchema);

export const appEnv = (() => {
  const rawEnv = {
    PORT: Bun.env.PORT,
    DATABASE_URL: Bun.env.DATABASE_URL,
    CLIENT_BASE_URL: Bun.env.CLIENT_BASE_URL,
    NODE_ENV: Bun.env.NODE_ENV,
  };

  const encodedEnv = compiler.Encode(rawEnv);

  if (!compiler.Check(encodedEnv)) {
    const errors = [...compiler.Errors(encodedEnv)];

    console.error("Environment validation failed:");

    for (const error of errors) {
      console.error(`  - ${error.path}: ${error.message}`);
    }

    process.exit(1);
  }

  return encodedEnv;
})();

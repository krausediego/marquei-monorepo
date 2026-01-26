import { TypeCompiler } from "@sinclair/typebox/compiler";
import { t } from "elysia";

const envSchema = t.Object({
  DATABASE_URL: t.String({ format: "uri" }),
});

const compiler = TypeCompiler.Compile(envSchema);

export const env = (() => {
  const rawEnv = {
    DATABASE_URL: Bun.env.DATABASE_URL,
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

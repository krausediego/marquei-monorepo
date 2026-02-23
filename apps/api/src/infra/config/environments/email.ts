import { TypeCompiler } from "@sinclair/typebox/compiler";
import { t } from "elysia";

const envSchema = t.Object({
  RESEND_API_KEY: t.String(),
});

const compiler = TypeCompiler.Compile(envSchema);

export const emailEnv = (() => {
  const rawEnv = {
    RESEND_API_KEY: Bun.env.RESEND_API_KEY,
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

import { TypeCompiler } from "@sinclair/typebox/compiler";
import { t } from "elysia";

const envSchema = t.Object({
  GOOGLE_CLIENT_ID: t.String(),
  GOOGLE_CLIENT_SECRET: t.String(),
});

const compiler = TypeCompiler.Compile(envSchema);

export const googleEnv = (() => {
  const rawEnv = {
    GOOGLE_CLIENT_ID: Bun.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: Bun.env.GOOGLE_CLIENT_SECRET,
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

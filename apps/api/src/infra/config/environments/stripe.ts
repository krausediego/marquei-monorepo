import { TypeCompiler } from "@sinclair/typebox/compiler";
import { t } from "elysia";

const envSchema = t.Object({
  STRIPE_SECRET_KEY: t.String(),
  STRIPE_PUBLISHABLE_KEY: t.String(),
  STRIPE_WEBHOOK_SECRET: t.String(),
});

const compiler = TypeCompiler.Compile(envSchema);

export const stripeEnv = (() => {
  const rawEnv = {
    STRIPE_SECRET_KEY: Bun.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY: Bun.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_WEBHOOK_SECRET: Bun.env.STRIPE_WEBHOOK_SECRET,
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

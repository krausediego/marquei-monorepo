import { TypeCompiler } from "@sinclair/typebox/compiler";
import { t } from "elysia";

const envSchema = t.Object({
  CLOUDFLARE_BUCKET_ACCESS_KEY_ID: t.String(),
  CLOUDFLARE_BUCKET_SECRET_ACCESS_KEY: t.String(),
  CLOUDFLARE_TOKEN_VALUE: t.String(),
  CLOUDFLARE_BUCKET_NAME: t.String(),
  CLOUDFLARE_ACCOUNT_ID: t.String(),
  CLOUDFLARE_BUCKET_PUBLIC_URL: t.String(),
});

const compiler = TypeCompiler.Compile(envSchema);

export const cloudflareEnv = (() => {
  const rawEnv = {
    CLOUDFLARE_BUCKET_ACCESS_KEY_ID: Bun.env.CLOUDFLARE_BUCKET_ACCESS_KEY_ID,
    CLOUDFLARE_BUCKET_SECRET_ACCESS_KEY:
      Bun.env.CLOUDFLARE_BUCKET_SECRET_ACCESS_KEY,
    CLOUDFLARE_TOKEN_VALUE: Bun.env.CLOUDFLARE_TOKEN_VALUE,
    CLOUDFLARE_BUCKET_NAME: Bun.env.CLOUDFLARE_BUCKET_NAME,
    CLOUDFLARE_ACCOUNT_ID: Bun.env.CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_BUCKET_PUBLIC_URL: Bun.env.CLOUDFLARE_BUCKET_PUBLIC_URL,
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

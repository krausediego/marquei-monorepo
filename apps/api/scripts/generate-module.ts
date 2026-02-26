#!/usr/bin/env tsx
/**
 * CLI para geração de módulos
 *
 * Uso:
 *   Módulo raiz:      tsx scripts/generate-module.ts hello-world
 *   Módulo de contexto: tsx scripts/generate-module.ts organization/create-organization
 */

import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

// ─── helpers ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (!args[0]) {
  console.error("❌  Informe o nome do módulo.");
  console.error("    Exemplos:");
  console.error("      tsx scripts/generate-module.ts hello-world");
  console.error(
    "      tsx scripts/generate-module.ts organization/create-organization"
  );
  process.exit(1);
}

const input = args[0].replace(/\\/g, "/");
const parts = input.split("/");

// valida profundidade máxima: contexto/modulo ou apenas modulo
if (parts.length > 2) {
  console.error(
    "❌  Profundidade máxima: contexto/modulo (ex: organization/create-organization)"
  );
  process.exit(1);
}

const moduleName = parts[parts.length - 1]; // ex: create-organization
const context = parts.length === 2 ? parts[0] : null; // ex: organization

// converte kebab-case → PascalCase
const toPascal = (str: string) =>
  str
    .split("-")
    .map((s) => s[0]?.toUpperCase() + s.slice(1))
    .join("");

// converte kebab-case → camelCase
const toCamel = (str: string) => {
  const p = toPascal(str);
  return p[0]?.toLowerCase() + p.slice(1);
};

const pascal = toPascal(moduleName!); // CreateOrganization
const camel = toCamel(moduleName!); // createOrganization
const kebab = moduleName; // create-organization

const modulesRoot = join(process.cwd(), "src/modules");
const moduleDir = context
  ? join(modulesRoot, context, kebab!)
  : join(modulesRoot, kebab!);

if (existsSync(moduleDir)) {
  console.error(`❌  O módulo já existe em: ${moduleDir}`);
  process.exit(1);
}

mkdirSync(moduleDir, { recursive: true });

// ─── templates ──────────────────────────────────────────────────────────────

const files: Record<string, string> = {
  // controller.factory.ts
  [`${kebab}-controller.factory.ts`]: `\
import type { IController } from "@/modules/shared";
import { ${pascal}Controller, make${pascal}Service } from ".";

export const make${pascal}Controller = (): IController => {
  return new ${pascal}Controller(make${pascal}Service);
};
`,

  // service.factory.ts
  [`${kebab}-service.factory.ts`]: `\
import { makeLogging } from "@/infra";
import { ${pascal}Service, type I${pascal} } from ".";

export const make${pascal}Service = (): I${pascal} => {
  return new ${pascal}Service(makeLogging());
};
`,

  // controller.ts
  [`${kebab}.controller.ts`]: `\
import { getHttpError, type Http, ok } from "@/infra";
import type { IController } from "@/modules/shared";
import type { I${pascal}, ${pascal}Schema } from ".";

type ${pascal}Handler = () => I${pascal};

export class ${pascal}Controller implements IController {
  constructor(private readonly ${camel}Service: ${pascal}Handler) {}

  async handle({ data, locals }: Http.IRequest<${pascal}Schema.getParams>): Promise<Http.IResponse> {
    try {
      const content = await this.${camel}Service().run({
        traceId: locals?.traceId,
      });

      return ok({ ...content });
    } catch (error: any) {
      return getHttpError(error);
    }
  }
}
`,

  // interface.ts
  [`${kebab}.interface.ts`]: `\
import type { ${pascal}Schema } from ".";

export interface I${pascal} {
  run(params: ${pascal}.Params): Promise<${pascal}.Response>;
}

export namespace ${pascal} {
  export type Params = ${pascal}Schema.getParams & {
    traceId: string;
  };

  export type Response = ${pascal}Schema.getResponse;
}
`,

  // schemas.ts
  [`${kebab}.schemas.ts`]: `\
import { type Static, t } from "elysia";
import { defineSchema } from "@/infra";

export const ${camel}Schema = defineSchema({
  body: t.Object({}),
  response: {
    200: t.Object({}),
  },
  detail: {
    tags: [""],
    summary: "",
  },
});

export namespace ${pascal}Schema {
  export type getParams   = Static<typeof ${camel}Schema.body>;
  export type getResponse = Static<(typeof ${camel}Schema.response)[200]>;
}
`,

  // service.ts
  [`${kebab}.service.ts`]: `\
import { setTraceId } from "@/helpers";
import type { ILoggingManager } from "@/infra";
import { BaseService } from "@/modules/shared";
import type { ${pascal}, I${pascal} } from ".";

export class ${pascal}Service extends BaseService implements I${pascal} {
  constructor(protected readonly logger: ILoggingManager) {
    super(logger);
  }

  @setTraceId
  async run(_params: ${pascal}.Params): Promise<${pascal}.Response> {
    this.log("info", "Starting process ${kebab}");

    return {};
  }
}
`,

  // index.ts (barrel)
  [`index.ts`]: `\
export * from "./${kebab}-controller.factory";
export * from "./${kebab}-service.factory";
export * from "./${kebab}.controller";
export * from "./${kebab}.interface";
export * from "./${kebab}.schemas";
export * from "./${kebab}.service";
`,
};

// ─── escrita ────────────────────────────────────────────────────────────────

for (const [filename, content] of Object.entries(files)) {
  writeFileSync(join(moduleDir, filename), content);
}

const displayPath = context
  ? `src/modules/${context}/${kebab}`
  : `src/modules/${kebab}`;

console.log(`\n✅  Módulo "${pascal}" criado em ${displayPath}/\n`);
console.log("   Arquivos gerados:");
for (const filename of Object.keys(files)) {
  console.log(`   • ${filename}`);
}
console.log("");

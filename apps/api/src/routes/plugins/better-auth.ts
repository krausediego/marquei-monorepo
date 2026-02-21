import Elysia from "elysia";
import { auth } from "@/infra";
import { db } from "@/infra/database/client";

export const betterAuthPlugin = new Elysia({ name: "better-auth" })
  .mount(auth.handler)
  .derive(async ({ request: { headers } }) => {
    let cachedSession: Awaited<ReturnType<typeof auth.api.getSession>> | null =
      null;

    return {
      getSession: async () => {
        if (cachedSession === null) {
          cachedSession = await auth.api.getSession({ headers });
        }
        return cachedSession;
      },
    };
  })
  .macro({
    auth: {
      async resolve({ status, getSession, request: { headers } }) {
        const session = await (getSession?.() ??
          auth.api.getSession({ headers }));
        if (!session) return status(401, { message: "Unauthorized" });
        return session;
      },
    },
    organization: {
      async resolve({ status, getSession, request: { headers } }) {
        const session = await (getSession?.() ??
          auth.api.getSession({ headers }));

        if (!session) return status(401, { message: "Unauthorized" });

        const organizationId = session.session.activeOrganizationId;

        if (!organizationId) {
          return status(404, { message: "No enterprise selected" });
        }

        const organization = await db.query.organizations.findFirst({
          where(fields, { eq }) {
            return eq(fields.id, organizationId);
          },
        });

        if (!organization) {
          return status(404, { message: "Organization not found" });
        }

        const subscription = await db.query.subscriptions.findFirst({
          where(fields, { eq }) {
            return eq(fields.referenceId, organizationId);
          },
        });

        if (!subscription) {
          return status(402, { message: "Organization has no subscription" });
        }

        const active = ["active", "trialing"].includes(
          subscription.status as string
        );

        if (!active) {
          return status(402, {
            message: "Organization subscription is not active",
          });
        }

        return {
          ...session,
          organizationId,
        };
      },
    },
    permission: {
      async resolve({ status, getSession, request: { headers } }) {
        const session = await (getSession?.() ??
          auth.api.getSession({ headers }));

        if (!session) return status(401, { message: "Unauthorized" });

        const orgId = session.session.activeOrganizationId;
        if (!orgId) {
          return status(404, { message: "No enterprise selected" });
        }

        const membership = await db.query.members.findFirst({
          where(fields, { and, eq }) {
            return and(
              eq(fields.organizationId, orgId),
              eq(fields.userId, session.user.id)
            );
          },
        });

        if (!membership) {
          return status(403, {
            message: "User is not a member of this organization",
          });
        }

        return {
          ...session,
          organizationId: orgId,
          membership,
        };
      },
    },
  });

let _schema: ReturnType<typeof auth.api.generateOpenAPISchema>;
// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
const getSchema = async () => (_schema ??= auth.api.generateOpenAPISchema());

export const OpenAPI = {
  getPaths: (prefix = "/api/v1/auth") =>
    getSchema().then(({ paths }) => {
      const reference: typeof paths = Object.create(null);

      for (const path of Object.keys(paths)) {
        const key = prefix + path;
        reference[key] = paths[path];

        for (const method of Object.keys(paths[path])) {
          const operation = (reference[key] as any)[method];

          operation.tags = ["Better Auth"];
        }
      }

      return reference;
    }) as Promise<any>,
  components: getSchema().then(({ components }) => components) as Promise<any>,
} as const;

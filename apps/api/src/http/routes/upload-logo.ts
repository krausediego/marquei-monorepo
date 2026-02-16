import { Elysia, t } from "elysia";
import { betterAuthPlugin } from "../plugins/better-auth";
import { CloudinaryService } from "@/app/lib/clodinary";
import { uploadLogoFunction } from "@/app/functions/upload-logo";

export const uploadLogo = new Elysia().use(betterAuthPlugin).post(
  "/upload-logo",
  async ({ body, session, status }) => {
    const { file } = body;

    const organizationId = session.activeOrganizationId;

    if (!organizationId) {
      return status(404, {
        message: "Não existe um estabelecimento vinculado",
      });
    }

    const uploaded = await uploadLogoFunction({
      file,
      organizationId,
    });

    return {
      ...uploaded,
    };
  },
  {
    auth: true,
    body: t.Object({
      file: t.File({
        type: "image",
        maxSize: 5 * 1024 * 1024, // 5MB
      }),
    }),
    detail: {
      tags: ["Organization"],
      summary: "Upload logo",
    },
  }
);

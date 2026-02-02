import { Elysia, t } from "elysia";
import { betterAuthPlugin } from "../plugins/better-auth";
import { CloudinaryService } from "@/app/lib/clodinary";

export const uploadLogo = new Elysia().use(betterAuthPlugin).post(
  "/upload-logo",
  async ({ body, session }) => {
    const { file } = body;

    if (!file.type.startsWith("image/")) {
      throw new Error("File must be a image");
    }

    const publicId = `org_${session.activeOrganizationId}`;

    const result = await CloudinaryService.uploadFromFile(file, {
      folder: "organizations/logos",
      public_id: publicId,
      transformation: {
        width: 500,
        height: 500,
        crop: "fill",
        quality: "auto",
        format: "auto",
      },
    });

    return {
      success: true,
      data: {
        publicId: result.public_id,
        url: result.secure_url,
        optimizedUrl: CloudinaryService.getOptimizedUrl(result.public_id, {
          width: 200,
          height: 200,
        }),
      },
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
  },
);

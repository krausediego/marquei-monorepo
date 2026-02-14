import { eq } from "drizzle-orm";
import { db } from "@/database/client";
import * as schema from "@/database/schema";
import { CloudinaryService } from "../lib/clodinary";

interface UploadLogoFunctionProps {
  file: File;
  organizationId: string;
}

export async function uploadLogoFunction({
  file,
  organizationId,
}: UploadLogoFunctionProps) {
  if (!file.type.startsWith("image/")) {
    throw new Error("File must be a image");
  }

  const publicId = `org_${organizationId}`;

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

  await db
    .update(schema.organizations)
    .set({ logo: result.secure_url })
    .where(eq(schema.organizations.id, organizationId));

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
}

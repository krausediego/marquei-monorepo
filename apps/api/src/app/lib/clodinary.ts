import { env } from "@/env";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  bytes: number;
}

export class CloudinaryService {
  static async uploadFromFile(
    file: File,
    options?: {
      folder?: string;
      public_id?: string;
      transformation?: any;
    },
  ): Promise<CloudinaryUploadResult> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: options?.folder || "organizations",
          public_id: options?.public_id,
          resource_type: "image",
          transformation: options?.transformation,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result as CloudinaryUploadResult);
          }
        },
      );

      uploadStream.end(buffer);
    });
  }

  static async uploadFromBuffer(
    buffer: Buffer,
    options?: {
      folder?: string;
      public_id?: string;
      transformation?: any;
    },
  ): Promise<CloudinaryUploadResult> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: options?.folder || "organizations",
          public_id: options?.public_id,
          resource_type: "image",
          transformation: options?.transformation,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result as CloudinaryUploadResult);
          }
        },
      );

      uploadStream.end(buffer);
    });
  }

  static async uploadFromUrl(
    url: string,
    options?: {
      folder?: string;
      public_id?: string;
    },
  ): Promise<CloudinaryUploadResult> {
    const result = await cloudinary.uploader.upload(url, {
      folder: options?.folder || "organizations",
      public_id: options?.public_id,
      resource_type: "image",
    });

    return result as CloudinaryUploadResult;
  }

  static async delete(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
  }

  static getOptimizedUrl(
    publicId: string,
    options?: {
      width?: number;
      height?: number;
      crop?: "fill" | "fit" | "scale" | "thumb";
      quality?: number | "auto";
      format?: "auto" | "jpg" | "png" | "webp";
    },
  ): string {
    return cloudinary.url(publicId, {
      width: options?.width || 400,
      height: options?.height || 400,
      crop: options?.crop || "fill",
      quality: options?.quality || "auto",
      format: options?.format || "auto",
      fetch_format: "auto",
      secure: true,
    });
  }

  static getAvatarUrl(publicId: string, size: number = 200): string {
    return cloudinary.url(publicId, {
      width: size,
      height: size,
      crop: "fill",
      gravity: "face",
      radius: "max",
      quality: "auto",
      format: "auto",
      secure: true,
    });
  }
}

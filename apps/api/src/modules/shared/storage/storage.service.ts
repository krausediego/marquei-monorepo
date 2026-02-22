import { cloudflareEnv } from "@/infra";
import { IStorage, Storage } from "./storage.interface";
import {
  DeleteObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

export class StorageService implements IStorage {
  async upload({
    key,
    body,
    contentType,
    metadata,
  }: Storage.UploadParams): Promise<Storage.UploadResponse> {
    await this.r2Client().send(
      new PutObjectCommand({
        Bucket: cloudflareEnv.CLOUDFLARE_BUCKET_NAME,
        Key: key,
        Body: body,
        ContentType: contentType,
        Metadata: metadata,
      })
    );

    return {
      key,
      url: this.getPublicUrl(key),
    };
  }

  async getMetadata({
    key,
  }: Storage.MetadataParams): Promise<Storage.MetadataResponse> {
    const res = await this.r2Client().send(
      new HeadObjectCommand({
        Bucket: cloudflareEnv.CLOUDFLARE_BUCKET_NAME,
        Key: key,
      })
    );

    return {
      key,
      size: res.ContentLength,
      contentType: res.ContentType,
      lastModified: res.LastModified,
      metadata: res.Metadata,
    };
  }

  async delete({ key }: Storage.DeleteParams): Promise<Storage.DeleteResponse> {
    await this.r2Client().send(
      new DeleteObjectCommand({
        Bucket: cloudflareEnv.CLOUDFLARE_BUCKET_NAME,
        Key: key,
      })
    );

    return {
      key,
      deleted: true,
    };
  }

  generateKey({
    folder,
    filename,
  }: Storage.GenerateKeyParams): Storage.GenerateKeyResponse {
    const sanitized = filename.replace(/[^a-zA-Z0-9._-]/g, "_");

    return {
      key: `${folder}/${Date.now()}-${sanitized}`,
    };
  }

  private r2Client(): S3Client {
    const r2 = new S3Client({
      region: "auto",
      endpoint: `https://${cloudflareEnv.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: cloudflareEnv.CLOUDFLARE_BUCKET_ACCESS_KEY_ID,
        secretAccessKey: cloudflareEnv.CLOUDFLARE_BUCKET_SECRET_ACCESS_KEY,
      },
    });

    return r2;
  }

  private getPublicUrl(key: string): string {
    return `${cloudflareEnv.CLOUDFLARE_BUCKET_PUBLIC_URL}/${key}`;
  }
}

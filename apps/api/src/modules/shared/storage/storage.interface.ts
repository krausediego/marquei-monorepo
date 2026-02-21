export interface IStorage {
  upload(params: Storage.UploadParams): Promise<Storage.UploadResponse>;
  getMetadata(
    params: Storage.MetadataParams
  ): Promise<Storage.MetadataResponse>;
  delete(params: Storage.DeleteParams): Promise<Storage.DeleteResponse>;
  generateKey(
    params: Storage.GenerateKeyParams
  ): Promise<Storage.GenerateKeyResponse>;
}

export namespace Storage {
  /**
   * Upload
   */
  export type UploadParams = {
    key: string;
    body: Buffer | Uint8Array | ReadableStream;
    contentType: string;
    metadata?: Record<string, string>;
  };

  export type UploadResponse = {
    key: string;
    url: string;
  };

  /**
   * Metadata
   */
  export type MetadataParams = {
    key: string;
  };

  export type MetadataResponse = {
    key: string;
    size?: number;
    contentType?: string;
    lastModified?: Date;
    metadata?: Record<string, string>;
  };

  /**
   * Delete
   */
  export type DeleteParams = {
    key: string;
  };

  export type DeleteResponse = {
    key: string;
    deleted: boolean;
  };

  /**
   * Generate key
   */
  export type GenerateKeyParams = {
    folder: "organization" | "avatars";
    filename: string;
  };

  export type GenerateKeyResponse = {
    key: string;
  };
}

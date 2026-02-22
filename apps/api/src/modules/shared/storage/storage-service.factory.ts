import { StorageService, IStorage } from ".";

export const makeStorage = (): IStorage => {
  return new StorageService();
};

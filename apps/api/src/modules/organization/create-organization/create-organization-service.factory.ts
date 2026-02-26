import { makeLogging } from "@/infra";
import { makeEmailSenderService } from "@/modules/shared/email-sender";
import { makeStorage } from "@/modules/shared/storage";
import { CreateOrganizationService, type ICreateOrganization } from ".";

export const makeCreateOrganizationService = (): ICreateOrganization => {
  return new CreateOrganizationService(
    makeLogging(),
    makeStorage(),
    makeEmailSenderService()
  );
};

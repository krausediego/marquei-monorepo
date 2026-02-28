import { makeLogging } from "@/infra";
import { DeleteInvitationService, type IDeleteInvitation } from ".";

export const makeDeleteInvitationService = (): IDeleteInvitation => {
  return new DeleteInvitationService(makeLogging());
};

import { makeLogging } from "@/infra";
import { type IListInvitations, ListInvitationsService } from ".";

export const makeListInvitationsService = (): IListInvitations => {
  return new ListInvitationsService(makeLogging());
};

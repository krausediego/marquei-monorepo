import { makeLogging } from "@/infra";
import { RevokeMemberService, type IRevokeMember } from ".";

export const makeRevokeMemberService = (): IRevokeMember => {
  return new RevokeMemberService(makeLogging());
};

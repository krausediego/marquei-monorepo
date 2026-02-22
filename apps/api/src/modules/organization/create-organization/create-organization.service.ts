import { BaseService } from "@/modules/shared";
import { CreateOrganization, ICreateOrganization } from ".";
import { ILoggingManager } from "@/infra";
import { setTraceId } from "@/helpers";

export class CreateOrganizationService
  extends BaseService
  implements ICreateOrganization
{
  constructor(protected readonly logger: ILoggingManager) {
    super(logger);
  }

  @setTraceId
  run(params: CreateOrganization.Params): Promise<CreateOrganization.Response> {
    throw new Error("Method not implemented.");
  }
}

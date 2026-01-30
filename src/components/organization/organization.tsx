import { CreditCardIcon, Store } from "lucide-react";
import { Button } from "../ui/button";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { auth } from "@/lib/auth";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { NewOrganization } from "./new-organization";

export function Organization() {
  const { data } = auth.useListOrganizations();
  const { data: activeOrganization } = auth.useActiveOrganization();

  async function switchOrganization({
    organizationId,
  }: {
    organizationId: string;
  }) {
    await auth.organization.setActive({
      organizationId,
    });
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className="mb-2">
            Organização
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="top" className="min-w-3xs">
          <DropdownMenuGroup>
            {Array.isArray(data) && data.length > 0 ? (
              <DropdownMenuRadioGroup
                value={activeOrganization?.id}
                onValueChange={(value) =>
                  switchOrganization({ organizationId: value ?? "" })
                }
              >
                {data?.map((organization) => (
                  <DropdownMenuRadioItem value={organization.id} className="">
                    <CreditCardIcon className="mr-2 size-4" />
                    <span className="w-44 truncate">
                      LJFLKJSLDKFJLSJDFLKJLJKSDFJLKLDSJFLJKLDSKJFJLKDJSLFJDSLKFKLSDLKJFLKJDSLKJF
                    </span>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            ) : (
              <DropdownMenuLabel>Sem organizações</DropdownMenuLabel>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <DialogTrigger asChild>
                <Button variant="secondary" className="w-full">
                  <Store />
                  Criar nova organização
                </Button>
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <NewOrganization />
    </Dialog>
  );
}

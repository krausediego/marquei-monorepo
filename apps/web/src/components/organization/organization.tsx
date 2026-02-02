import { useRouter } from "@tanstack/react-router";
import {
  CheckIcon,
  ChevronsUpDownIcon,
  Loader2,
  PlusCircle,
  Store,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/contexts/auth-context";
import {
  useOrganizations,
  useSwitchOrganization,
} from "@/hooks/use-auth-query";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { cn } from "@/lib/utils";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { NewOrganization } from "./new-organization";

export function Organization() {
  const [open, setOpen] = useState(false);
  const { organizationId } = useAuth();
  const isMobile = useIsMobile();

  const { data: organizations, isLoading: isLoadingOrgs } = useOrganizations();
  const { mutate: switchOrg, isPending } = useSwitchOrganization();

  const handleSwitch = (id: string) => {
    switchOrg(id, {
      onSuccess: () => {
        setOpen(false);
      },
      onError: (error) => {
        console.error("Error on change organization:", error);
      },
    });
  };

  const organization = organizations?.find((org) => org.id === organizationId);

  return (
    <Dialog>
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            aria-expanded={open}
            className="h-12 w-full justify-between px-2 text-start"
            disabled={isPending || isLoadingOrgs}
            role="combobox"
            variant="outline"
          >
            <div>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Trocando...
                </>
              ) : organizationId ? (
                <div className="flex items-center gap-2">
                  <div className="bg-muted-foreground/20 rounded-md p-2">
                    <Store className="size-5" />
                  </div>
                  <div className="max-w-37.5">
                    <p className="truncate">{organization?.name}</p>
                    <div className="text-muted-foreground flex text-xs font-light">
                      <p className="truncate">{organization?.street}</p>
                      <p>,{organization?.number}</p>
                    </div>
                  </div>
                </div>
              ) : (
                "Selecione um estabelecimento..."
              )}
            </div>
            <ChevronsUpDownIcon className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-2" side={isMobile ? "bottom" : "right"}>
          <Command>
            <CommandList>
              <CommandGroup>
                {organizations?.map((organization) => (
                  <CommandItem
                    disabled={isPending}
                    key={organization.id}
                    onSelect={() => handleSwitch(organization.id)}
                    value={organization.id}
                  >
                    <div className="flex items-center gap-2">
                      <div className="bg-muted-foreground/20 rounded-md p-2">
                        <Store className="size-5" />
                      </div>
                      <div className="max-w-37.5">
                        <p className="truncate">{organization?.name}</p>
                        <div className="text-muted-foreground flex text-xs font-light">
                          <p className="truncate">{organization?.street}</p>
                          <p>,{organization?.number}</p>
                        </div>
                      </div>
                    </div>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        organizationId === organization.id
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
                <Separator className="my-2" />
                <DialogTrigger asChild>
                  <Button className="w-full" variant="secondary">
                    <PlusCircle /> Novo estabelecimento
                  </Button>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <NewOrganization />
    </Dialog>
  );
}

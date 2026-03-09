"use client";

import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useRouteContext } from "@tanstack/react-router";
import { LayoutGrid, LogOut, User } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { authClient } from "@/lib/better-auth";

export function UserNav() {
  const { user } = useRouteContext({ from: "/_app" });
  const navigate = useNavigate();

  const { mutateAsync: signOutFn } = useMutation({
    mutationFn: async () => {
      const { data, error } = await authClient.signOut();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onError: (e) => toast.error(e.message),
    onSuccess: () => navigate({ to: "/sign-in" }),
  });

  async function handleSignOut() {
    await signOutFn();
  }

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              {/* <Button
                variant="outline"
                className="relative size-12 rounded-full border-primary/60 border-2"
              > */}
              <Avatar className="size-12 bg-primary/60 ring-2 ring-primary/80">
                <AvatarImage
                  src={user.image ?? "#"}
                  alt="Avatar"
                  className="scale-90 object-cover"
                  style={{ objectPosition: "center 10%" }}
                />
                <AvatarFallback className="bg-transparent">JD</AvatarFallback>
              </Avatar>
              {/* </Button> */}
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link to="/dashboard" className="flex items-center">
              <LayoutGrid className="w-4 h-4 mr-3 text-muted-foreground" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link to="/account" className="flex items-center">
              <User className="w-4 h-4 mr-3 text-muted-foreground" />
              Account
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

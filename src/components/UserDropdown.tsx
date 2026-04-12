import { ChevronDown, Cog, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useLocation, useRouter } from "@tanstack/react-router";
import { getSession } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";
import { useSignOut } from "@/hooks/auth";
import { useState } from "react";

export default function UserDropdown() {
  const signOut = useSignOut();
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });
  const [isOpen, setIsOpen] = useState(false);

  const currentPath = useLocation({
    select: (location) => location.pathname,
  });

  const MAX_USERNAME_LENGTH = 10;
  const name = data?.user.name;

  const trunicate = (username: string | undefined) => {
    if (!username) return "";
    if (username.length >= MAX_USERNAME_LENGTH) {
      return username.slice(0, 10) + "...";
    }
    return username;
  };

  const handleDasboard = async () => {
    router.navigate({ to: "/dashboard" });
  };

  return (
    <div>
      {isLoading && <Skeleton className="h-10 w-40" />}
      {!isLoading && (
        <DropdownMenu open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 rounded-md">
              <Button variant="ghost" className="cursor-pointer">
                {trunicate(name) || "NO NAME"}{" "}
                {isOpen ? (
                  <ChevronDown className="transition-transform duration-300 ease-in-out" />
                ) : (
                  <ChevronDown className="rotate-180 transition-transform duration-300 ease-in-out" />
                )}
              </Button>
              <Avatar size="lg">
                <AvatarFallback className="rounded-sm">
                  {name?.substring(0, 2).toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Session
              </DropdownMenuLabel>
              {currentPath.includes("/dashboard") ? null : (
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleDasboard}
                >
                  <LayoutDashboard />
                  Dashboard
                </DropdownMenuItem>
              )}

              <DropdownMenuItem>
                <Cog />
                Profile
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                variant="destructive"
                className="cursor-pointer"
                onClick={signOut}
              >
                <LogOut />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

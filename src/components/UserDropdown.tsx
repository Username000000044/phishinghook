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

function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: getSession,
    staleTime: Infinity,
  });
}

export default function UserDropdown() {
  const signOut = useSignOut();
  const router = useRouter();
  const { data, isLoading } = useSession();

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="relative right-10">
              <div className="flex px-2 py-1 bg-secondary rounded">
                <Button variant="empty" className="cursor-pointer">
                  {trunicate(name) || "undefined"} <ChevronDown />
                </Button>
              </div>
              <Avatar className="size-13 absolute left-34 top-1/2 -translate-y-1/2">
                <AvatarFallback>
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

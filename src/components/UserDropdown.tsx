import {
  Cog,
  CornerDownRight,
  GeorgianLariIcon,
  LayoutDashboard,
  LogOut,
  PencilIcon,
  ShareIcon,
  TrashIcon,
} from "lucide-react";
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
import { getSession, signOutUser } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";

function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: getSession,
    staleTime: Infinity,
  });
}

export default function UserDropdown() {
  const router = useRouter();
  const { data } = useSession();

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

  const handleSignOut = async () => {
    await signOutUser(router);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="empty" className="cursor-pointer">
          <div className="flex gap-5 items-center">
            <Avatar>
              {/* <AvatarImage src={user?.image!} alt="Profile Picture" /> */}
              <AvatarFallback>{name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            {trunicate(name)}
          </div>
        </Button>
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
            onClick={handleSignOut}
          >
            <LogOut />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

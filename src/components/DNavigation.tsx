import { Link, useLocation } from "@tanstack/react-router";
import {
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenu,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import UserDropdown from "./UserDropdown";
import { Button, buttonVariants } from "./ui/button";
import { Bot, CalendarPlus, LucideIcon, Mailbox, User } from "lucide-react";
import { VariantProps } from "class-variance-authority";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type ButtonProps = VariantProps<typeof buttonVariants>;
type buttonVariant = NonNullable<ButtonProps["variant"]>;

interface Pages {
  name: string;
  href: string;
  icon: LucideIcon;
}

const navigationItems: Pages[] = [
  {
    name: "View",
    href: "/dashboard",
    icon: Mailbox,
  },
  {
    name: "Schedule",
    href: "/dashboard/schedule",
    icon: CalendarPlus,
  },
  {
    name: "Team",
    href: "/dashboard/team",
    icon: User,
  },
];

export const DNavigation = () => {
  const { pathname } = useLocation();

  return (
    <NavigationMenu className="flex justify-between bg-secondary/40 rounded-md p-2 min-w-full">
      <NavigationMenuList className="gap-2 w-full">
        {navigationItems.map((item, index) => {
          let variant: buttonVariant = "ghost";
          if (pathname === item.href) variant = "outline";

          return (
            <NavigationMenuItem key={index}>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant={variant}
                    className="cursor-pointer px-4"
                    asChild
                  >
                    <Link to={item.href} className="flex items-center gap-2">
                      <item.icon className="size-5" />
                      <span className="hidden md:block">{item.name}</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
      <NavigationMenuList className="ml-auto">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <UserDropdown />
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

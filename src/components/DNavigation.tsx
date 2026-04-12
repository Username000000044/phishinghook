import { Link } from "@tanstack/react-router";
import {
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenu,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import UserDropdown from "./UserDropdown";
import { Button, buttonVariants } from "./ui/button";
import {
  ArrowRightFromLine,
  CalendarPlus,
  Eye,
  FileDown,
  List,
  ListPlus,
  MailSearch,
} from "lucide-react";
import { VariantProps } from "class-variance-authority";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Separator } from "./ui/separator";

type ButtonProps = VariantProps<typeof buttonVariants>;
type buttonVariant = NonNullable<ButtonProps["variant"]>;

const navigationItems = [
  {
    tooltip: "Create Schedule",
    href: "/dashboard/schedule",
    variant: "outline" as buttonVariant,
    icon: ListPlus,
  },
  {
    tooltip: "View Emails",
    href: "/dashboard/emails",
    variant: "outline" as buttonVariant,
    icon: MailSearch,
  },
  {
    tooltip: "Export Report",
    href: "/dashboard/export",
    variant: "outline" as buttonVariant,
    icon: ArrowRightFromLine,
  },
];

export const DNavigation = () => {
  return (
    <NavigationMenu className="absolute bottom-0 bg-secondary/80 border rounded-md p-2 min-w-full justify-between">
      <div>
        <NavigationMenuList className="!gap-2">
          {navigationItems.map((item, index) => {
            const isExportButton = item.tooltip
              .toLowerCase()
              .includes("export");

            return (
              <>
                {isExportButton && (
                  <Separator
                    orientation="vertical"
                    className="bg-white border-2"
                  />
                )}
                <Tooltip>
                  <TooltipTrigger>
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink asChild>
                        <Button
                          variant={item.variant}
                          className="cursor-pointer"
                        >
                          <Link to={item.href}>
                            <item.icon />
                          </Link>
                        </Button>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </TooltipTrigger>
                  <TooltipContent>{item.tooltip}</TooltipContent>
                </Tooltip>
              </>
            );
          })}
        </NavigationMenuList>
      </div>
      <div>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <UserDropdown />
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
};

//   <UserDropdown />

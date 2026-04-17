import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "better-auth";
import { Eye, Trash2Icon } from "lucide-react";

type Status = "Recieved" | "Decieved" | "Deleted";

export type Email = {
  id: string; //some string associated with email.
  user: User;
  status: Status;
  sent_date: string;
};

export const columns: ColumnDef<Email>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user_id",
    header: "USER",
    cell: ({ row }) => {
      const user = row.original.user;

      return (
        <div className="flex items-center gap-4">
          <Avatar size="lg">
            <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p>{user.name}</p>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const content = row.original.status;

      return (
        <Badge
          variant="ghost"
          className={cn("", {
            "bg-accent": content == "Decieved",
            "bg-background": content == "Deleted",
          })}
        >
          {content}
        </Badge>
      );
    },
  },

  {
    accessorKey: "sent_date",
    header: "DATE",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="text-end space-x-4">
          <Button
            variant="empty"
            className="h-8 w-8 text-muted hover:text-muted-foreground cursor-pointer"
          >
            <span className="sr-only">View</span>
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="empty"
            className="h-8 w-8  text-destructive/40 hover:text-destructive cursor-pointer"
          >
            <span className="sr-only">Delete</span>
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

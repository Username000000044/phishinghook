import { DNavigation } from "@/components/DNavigation";
import { Button } from "@/components/ui/button";
import { protectedSessionQueryOptions } from "@/lib/auth";
import { Icon, MailOpen, PersonStandingIcon, Plus } from "lucide-react";
import { columns, Email } from "./Columns";
import { DataTable } from "@/features/dashboard/components/EmailTable";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Badge } from "@/components/ui/badge";
import { DemoDialog } from "./DemoDialog";

export function DashboardPage() {
  const { data: session } = useSuspenseQuery(protectedSessionQueryOptions);

  const emails: Email[] = [
    {
      id: "728ed52f",
      user: session.user,
      status: "Recieved",
      sent_date: "3/3/2026",
    },
    {
      id: "df28edfd",
      user: session.user,
      status: "Deleted",
      sent_date: "3/3/2026",
    },
    {
      id: "df28edfd",
      user: session.user,
      status: "Decieved",
      sent_date: "3/3/2026",
    },
    {
      id: "df28edfd",
      user: session.user,
      status: "Decieved",
      sent_date: "3/3/2026",
    },
    {
      id: "df28edfd",
      user: session.user,
      status: "Decieved",
      sent_date: "3/3/2026",
    },
    {
      id: "df28edfd",
      user: session.user,
      status: "Decieved",
      sent_date: "3/3/2026",
    },
    {
      id: "df28edfd",
      user: session.user,
      status: "Decieved",
      sent_date: "3/3/2026",
    },
    {
      id: "df28edfd",
      user: session.user,
      status: "Decieved",
      sent_date: "3/3/2026",
    },
  ];

  return (
    <>
      <div className="grid-col-layout container">
        <div className="flex flex-col md:flex-row space-y-4 md:justify-between md:items-end col-span-full mb-4">
          <div>
            <h1 className="text-5xl font-thin">Good to see you,</h1>
            <h2 className="text-3xl font-semibold">
              {session.user.name.toLowerCase()}{" "}
              <Badge className="text-[.7rem]">NEw USER</Badge>
            </h2>
          </div>
          <DemoDialog />
        </div>

        <section className="col-span-full lg:col-span-8">
          <DataTable columns={columns} data={emails} />
        </section>

        <div />

        <section className="hidden lg:flex lg:col-span-3 h-20 bg-card/20 shadow-lg rounded h-full justify-center items-center rounded">
          <Empty className="flex justify-center items-center">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Plus />
              </EmptyMedia>
              <EmptyTitle>Create a Team</EmptyTitle>
              <EmptyDescription>
                Track multiple people's security simultaneously.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button>
                <Plus />
                Create
              </Button>
            </EmptyContent>
          </Empty>
        </section>
      </div>

      {/* Sub Nav */}
      {/* <div className="absolute w-full  px-8 md:px-[8rem] pb-18">
        <DNavigation />
      </div> */}
    </>
  );
}

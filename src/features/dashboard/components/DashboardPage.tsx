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
        <div className="flex justify-between col-span-full mb-4">
          <h1 className="text-2xl">hello, {session.user.name.toLowerCase()}</h1>
          {/* <Button size="sm" className="rounded-full">
            <MailOpen /> Send Demo
          </Button> */}
        </div>

        <section className="hidden lg:flex lg:col-span-3 h-20 bg-card/20 shadow-lg rounded h-full justify-center items-center">
          <Empty className="flex justify-center items-center">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Plus />
              </EmptyMedia>
              <EmptyTitle>Create a Team</EmptyTitle>
              <EmptyDescription>
                Track team performance to increase security thorughout your
                team.
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

        <section className="col-span-full lg:col-span-9">
          <DataTable columns={columns} data={emails} />
        </section>
      </div>

      {/* Sub Nav */}
      {/* <div className="absolute w-full  px-8 md:px-[8rem] pb-18">
        <DNavigation />
      </div> */}
    </>
  );
}

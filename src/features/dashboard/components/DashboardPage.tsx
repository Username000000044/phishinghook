import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { columns } from "./Columns";
import { DataTable } from "@/features/dashboard/components/EmailTable";
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
import { useRequiredSession } from "@/hooks/auth";
import { Email } from "@/types/emails";
import { useState } from "react";
import { DNavigation } from "@/components/DNavigation";

export function DashboardPage() {
  const session = useRequiredSession();

  const [emailList, setEmailList] = useState<Email[]>([
    {
      id: "728ed52f",
      user: session.user,
      status: "Recieved",
      sent_date: "3/3/2026",
    },
    {
      id: "718ed52f",
      user: session.user,
      status: "Recieved",
      sent_date: "3/2/2026",
    },
  ]);

  const handleAddEmail = (newEmail: Email) => {
    setEmailList((prev) => [...prev, newEmail]);
  };

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
          <DemoDialog onEmailAdded={handleAddEmail} />
        </div>

        <section className="col-span-full lg:col-span-8">
          <DataTable columns={columns} data={emailList} />
        </section>

        <div />

        <section className="hidden lg:flex lg:col-span-3 h-20 bg-card/20 shadow-lg rounded h-full justify-center items-center rounded h-full">
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
      <div className="absolute w-full bottom-0 px-8 md:px-[8rem] pb-18">
        <DNavigation />
      </div>
    </>
  );
}

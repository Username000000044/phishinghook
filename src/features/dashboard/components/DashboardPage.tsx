import { DNavigation } from "@/components/DNavigation";
import { Button } from "@/components/ui/button";
import { protectedSessionQueryOptions } from "@/lib/auth";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MailOpen } from "lucide-react";
import { EmailsTable } from "./EmailsTable";

export function DashboardPage() {
  const { data: session } = useSuspenseQuery(protectedSessionQueryOptions);

  return (
    <div className="grid-col-layout container">
      <div className="flex justify-between col-span-full">
        <h1 className="text-2xl">{session.user.name.toLowerCase()}</h1>
        <Button variant="outline" size="sm">
          <MailOpen /> Send
        </Button>
      </div>

      <section className="col-span-full bg-accent h-full">
        <EmailsTable />
      </section>

      <div className="relative col-span-full h-full lg:col-start-4 lg:col-end-10">
        <DNavigation />
      </div>
    </div>
  );
}

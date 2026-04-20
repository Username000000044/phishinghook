import { DNavigation } from "@/components/DNavigation";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { addDays } from "date-fns";

import React from "react";
export function SchedulePage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <>
      <div className="grid-col-layout container gap-0">
        <section className="flex flex-col h-full items-center rounded-md col-span-3">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border"
            captionLayout="dropdown"
          />
          <p>dasdf</p>
        </section>

        <section className="hidden xl:block col-span-9 bg-background">
          dfasd
        </section>

        {/* <Empty className="col-span-full border md:border-none border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Calendar />
              </EmptyMedia>
              <EmptyTitle className="md:text-2xl">
                Create an Email Schedule
              </EmptyTitle>
              <EmptyDescription className="text-md">
                Schedule your phishing emails to track security progress.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" size="sm" className="cursor-pointer">
                <Plus /> Create
              </Button>
            </EmptyContent>
          </Empty> */}
      </div>

      {/* Sub Nav */}
      <div className="absolute w-full bottom-0 px-8 md:px-[8rem] pb-18">
        <DNavigation />
      </div>
    </>
  );
}

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

export function EmailGamePage() {
  return (
    <div className="flex justify-center w-full">
      <div className="p-10 [&>*]:w-full [&>*]:h-full">
        <div className="grid grid-flow-col grid-rows-4 gap-4 max-h-150">
          {/* 1 */}
          <div className="md:col-span-3 md:row-span-3 border border-dashed">
            <div className="w-200 h-100 bg-red-500"></div>
          </div>

          {/* 2 */}
          <div className="flex w-full gap-4 h-20 md:col-span-3">
            <Button className="h-full flex-1" variant="outline">
              SCAM
            </Button>
            <Button className="h-full flex-1" variant="outline">
              REAL
            </Button>
          </div>

          {/* 3 */}
          <div className="md:row-span-4 max-w-80">
            <Empty className="border border-dashed h-full">
              <EmptyHeader>
                <EmptyTitle>No Entries</EmptyTitle>
                <EmptyDescription>
                  Play the game to get a position on the global leaderboard.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, ChevronDown, Paperclip, X } from "lucide-react";
import { GameLeaderboardRow } from "./GameLeaderboardRow";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { fetchLeaderboard } from "@/lib/game";
import { EmailTemplate } from "./EmailTemplate";

export function EmailGamePage() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["todos", 1],
    queryFn: () => fetchLeaderboard({ data: 1 }), // EMAIL GAME ID = 1
    staleTime: 1000 * 60, // 1 minute
  });

  return (
    <div className="flex justify-center items-center h-full w-full md:p-5">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] w-full gap-5">
        <div className="px-4 py-8">
          <div className="flex justify-center w-full ">
            <EmailTemplate />
          </div>

          <div className="flex justify-center gap-2">
            <Button
              size="lg"
              variant="outline"
              className="w-45 rounded-md cursor-pointer rounded-none rounded-l-md"
            >
              <X /> Real
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-45 rounded-md cursor-pointer rounded-none rounded-r-md"
            >
              <Check /> Fake
            </Button>
          </div>
        </div>
        <ScrollArea className="py-2 px-4">
          {data?.length && (
            <Table className="text-muted-foreground">
              <TableCaption className="text-sm text-muted">
                <Badge className="text-muted" variant="outline">
                  Top 10 global rankings.
                </Badge>
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="text-right">Accuracy</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((entry, index) => (
                  <GameLeaderboardRow
                    key={index}
                    rank={index + 1}
                    name={entry.name}
                    score={entry.score}
                    accuracy={+entry.accuracy}
                  />
                ))}
              </TableBody>
            </Table>
          )}
          {!data && (
            <Empty className="p-0">
              <EmptyHeader>
                <EmptyTitle>No Entries</EmptyTitle>
                <EmptyDescription>
                  Play the game to get a position on the global leaderboard.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}

import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import { GameLeaderboardRow, LbRow } from "./LbRow";
import { fetchLeaderboard } from "@/lib/games/game";
import { useQuery } from "@tanstack/react-query";

export const Leaderboard = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["todos", 1],
    queryFn: () => fetchLeaderboard({ data: 1 }), // EMAIL GAME ID = 1
    staleTime: 1000 * 60, // 1 minute
  });

  return (
    <div className="bg-card border border-border text-muted-foreground p-8">
      {data?.length && (
        <Table>
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
              <LbRow
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
    </div>
  );
};

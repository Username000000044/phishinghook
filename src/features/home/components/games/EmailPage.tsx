import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { GameLeaderboardRow } from "./GameLeaderboardRow";
import { useQuery } from "@tanstack/react-query";
import { fetchLeaderboard } from "@/lib/games/game";
import { generateEmail } from "@/lib/games/generateEmail";
import { useState } from "react";
import { EmailMenu } from "./EmailMenu";
import { EmailPlaying } from "./EmailPlaying";

export type Step = "Menu" | "Playing";

export function EmailGamePage() {
  const [step, setStep] = useState<Step>("Menu");
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["todos", 1],
    queryFn: () => fetchLeaderboard({ data: 1 }), // EMAIL GAME ID = 1
    staleTime: 1000 * 60, // 1 minute
  });

  const email = generateEmail();

  return (
    <div className="flex justify-center items-center md:h-full w-full md:p-5">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] w-full gap-5">
        {/* Email */}
        {step == "Menu" && <EmailMenu setStep={setStep} />}
        {step == "Playing" && <EmailPlaying email={email} />}

        {/* Leaderboard */}
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
              <TableBody className="">
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
        </div>
      </div>
    </div>
  );
}

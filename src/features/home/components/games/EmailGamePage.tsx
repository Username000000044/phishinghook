import { Button } from "@/components/ui/button";
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
import { Check, Hash, Lock, Target, Timer, X } from "lucide-react";
import { GameLeaderboardRow } from "./GameLeaderboardRow";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { fetchLeaderboard } from "@/lib/games/game";
import { EmailTemplate } from "./EmailTemplate";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateEmail } from "@/lib/games/generateEmail";

export function EmailGamePage() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["todos", 1],
    queryFn: () => fetchLeaderboard({ data: 1 }), // EMAIL GAME ID = 1
    staleTime: 1000 * 60, // 1 minute
  });

  const email = generateEmail();

  return (
    <div className="flex justify-center items-center md:h-full w-full md:p-5">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] w-full gap-5">
        <Card className="bg-transparent border-none p-0">
          <CardHeader className="flex justify-between items-center rounded-xl text-center">
            <CardTitle className="text-2xl">Question 1</CardTitle>
            <CardDescription>
              <div className="flex justify-center gap-2">
                <Badge className="h-min" variant="outline">
                  <Target /> 80%
                </Badge>
                <Badge className="h-min" variant="outline">
                  <Hash /> 4325
                </Badge>
                <Badge className="h-min" variant="outline">
                  <Timer /> 1:30
                </Badge>
                <Badge
                  className="h-min border-fuchsia-800 text-fuchsia-800"
                  variant="outline"
                >
                  <Lock /> {email.difficulty}
                </Badge>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-card border border-border rounded-xl py-10">
            <div className="flex justify-center w-full ">
              <EmailTemplate
                email={email.header.email}
                date={email.header.date}
                abbr={email.header.name_abbr}
                text={email.body.text}
                hasAttachment={email.body.hasAttachment}
                attachment={email.body.attachment}
              />
            </div>

            <div className="flex justify-center gap-2">
              <Button
                size="lg"
                variant="outline"
                className="w-45 rounded-md cursor-pointer rounded-none rounded-l-md"
              >
                <X /> Phishing
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-45 rounded-md cursor-pointer rounded-none rounded-r-md"
              >
                <Check /> Real
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="bg-card rounded-xl border border-border text-muted-foreground p-8">
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

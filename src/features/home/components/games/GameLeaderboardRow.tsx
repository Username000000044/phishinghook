import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface RowTypes {
  rank: number;
  name: string;
  score: number;
  accuracy: number;
}

export const GameLeaderboardRow = ({
  rank,
  name,
  score,
  accuracy,
}: RowTypes) => {
  const calcAccuracy = Math.floor(accuracy * 100);
  return (
    <TableRow>
      <TableCell className="font-medium">#{rank}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{score}</TableCell>
      <TableCell className="text-right w-[125px]">
        <div
          className={cn("h-5 w-full rounded-sm px-2", {
            "bg-emerald-200": calcAccuracy >= 80,
            "bg-emerald-400": calcAccuracy >= 50 && calcAccuracy < 80,
            "bg-emerald-800": calcAccuracy >= 0 && calcAccuracy < 50,
          })}
        >
          <p className="text-background">{calcAccuracy}%</p>
        </div>
      </TableCell>
    </TableRow>
  );
};

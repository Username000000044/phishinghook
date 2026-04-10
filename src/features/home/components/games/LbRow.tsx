import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface RowTypes {
  rank: number;
  name: string;
  score: number;
  accuracy: number;
}

export const LbRow = ({ rank, name, score, accuracy }: RowTypes) => {
  const calcAccuracy = Math.floor(accuracy * 100);
  return (
    <TableRow>
      <TableCell className="font-medium">#{rank}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{score}</TableCell>
      <TableCell className="text-right">
        <div
          className={cn("h-5 w-full rounded-sm px-2", {
            "bg-fuchsia-600": calcAccuracy >= 80,
            "bg-fuchsia-500": calcAccuracy >= 50 && calcAccuracy < 80,
            "bg-fuchsia-400": calcAccuracy >= 0 && calcAccuracy < 50,
          })}
        >
          <p className="text-background">{calcAccuracy}%</p>
        </div>
      </TableCell>
    </TableRow>
  );
};

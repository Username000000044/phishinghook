import { Card, CardDescription } from "@/components/ui/card";
import { Result, Step } from "./EmailPage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EmailScoreTypes {
  setStage: React.Dispatch<React.SetStateAction<Step>>;
  result: Result | undefined;
}
export const ResultMenu = ({ setStage, result }: EmailScoreTypes) => {
  return (
    <Card className="bg-secondary min-h-80 h-full">
      <CardDescription className="relative flex flex-col justify-center items-center text-center leading-tight px-15 h-full">
        <h1 className="text-[2.5rem] font-bold text-foreground">Results</h1>
        <div className="flex mt-2">
          <Badge variant="outline" className="text-muted-foreground">
            Correct: {result?.correct}
          </Badge>
          <Badge variant="outline" className="text-muted-foreground">
            Time: {result?.time || "2m"}
          </Badge>
          <Badge variant="outline" className="text-muted-foreground">
            ~ Difficulty: {result?.time || "Hard"}
          </Badge>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-62">
          <Button className="w-full" onClick={() => setStage("playing")}>
            Replay
          </Button>
        </div>
      </CardDescription>
    </Card>
  );
};

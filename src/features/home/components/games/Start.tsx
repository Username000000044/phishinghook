import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { Step } from "./EmailPage";

export const StartMenu = ({
  setStage,
}: {
  setStage: React.Dispatch<React.SetStateAction<Step>>;
}) => {
  return (
    <Card className="bg-secondary min-h-80 h-full">
      <CardDescription className="relative flex flex-col justify-center items-center text-center leading-tight px-15 h-full">
        <h1 className="text-[2.5rem] font-bold text-foreground">Email Game</h1>
        <h2 className="text text-muted-foreground">
          INCORRECT ANSWER ENDS GAME
        </h2>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-62">
          <Button className="w-full" onClick={() => setStage("playing")}>
            Start Game
          </Button>
        </div>
      </CardDescription>
    </Card>
  );
};

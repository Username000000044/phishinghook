import { Result, Step } from "./Email";
import { Button } from "@/components/ui/button";

interface EmailScoreTypes {
  setStage: React.Dispatch<React.SetStateAction<Step>>;
  result: Result | undefined;
}
export const EmailScore = ({ setStage, result }: EmailScoreTypes) => {
  return (
    <div>
      <Button onClick={() => setStage("menu")}>Replay</Button>
      <p>Correct:{result?.correct}</p>
      <p># of Questions: {result?.currentQuestion}</p>
    </div>
  );
};

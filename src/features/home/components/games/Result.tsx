import { Result, Step } from "./EmailPage";
import { Button } from "@/components/ui/button";

interface EmailScoreTypes {
  setStage: React.Dispatch<React.SetStateAction<Step>>;
  result: Result | undefined;
}
export const ResultMenu = ({ setStage, result }: EmailScoreTypes) => {
  return (
    <div>
      <Button onClick={() => setStage("start")}>Replay</Button>
      <p>Correct:{result?.correct}</p>
      <p># of Questions: {result?.currentQuestion}</p>
    </div>
  );
};

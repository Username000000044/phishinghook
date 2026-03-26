import { useRouter } from "node_modules/@tanstack/react-router/dist/esm/useRouter";
import { Result, Step } from "./Email";
import { Button } from "@/components/ui/button";

interface EmailScoreTypes {
  setStage: React.Dispatch<React.SetStateAction<Step>>;
  result: Result | undefined;
}
export const EmailScore = ({ setStage, result }: EmailScoreTypes) => {
  const router = useRouter();

  return (
    <div>
      <Button onClick={() => setStage("menu")}>Replay</Button>
    </div>
  );
};

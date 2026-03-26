import { EmailMenu } from "./EmailMenu";
import { useState } from "react";
import { EmailLeaderboard } from "./EmailLeaderboard";
import { EmailPlaying } from "./EmailPlaying";
import { EmailScore } from "./EmailScore";

export type Step = "menu" | "playing" | "result";
export type Result = {
  userAnswers: Array<boolean>;
  realAnswers: Array<boolean>;
};
export function EmailGamePage() {
  const [stage, setStage] = useState<Step>("menu");
  const [result, setResult] = useState<Result>();

  return (
    <div className="flex justify-center items-center md:h-full w-full md:p-5">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] w-full gap-5">
        {/* Email */}
        {stage === "menu" && <EmailMenu setStage={setStage} />}
        {stage === "playing" && (
          <EmailPlaying
            setStage={setStage}
            setResult={setResult}
            result={result}
          />
        )}
        {stage === "result" && (
          <EmailScore setStage={setStage} result={result} />
        )}

        {/* Leaderboard */}
        <EmailLeaderboard />
      </div>
    </div>
  );
}

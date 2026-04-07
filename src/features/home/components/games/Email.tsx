import { EmailMenu } from "./EmailMenu";
import { useState } from "react";
import { EmailLeaderboard } from "./EmailLeaderboard";
import { EmailPlaying } from "./EmailPlaying";
import { EmailScore } from "./EmailScore";

export type Step = "menu" | "playing" | "result";
export type Result = {
  correct: number;
  currentQuestion: number;
  time?: number;
};
export function EmailGamePage() {
  const [stage, setStage] = useState<Step>("menu");
  const [result, setResult] = useState<Result>();

  return (
    <div className="container grid-col-layout mt-30">
      <section className="col-span-full xl:col-span-10 bg-card h-100"></section>

      <section className="hidden xl:block col-span-2 bg-secondary h-100">
        {/* Absolute positioning container to place it at the bottom-left */}
        <h2 className="text-3xl">
          FIND THE <br />
          <span className="text-primary">REAL</span> EMAIL
        </h2>
      </section>
    </div>

    // <div className="flex justify-center items-center md:h-full w-full md:p-5">
    //   <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] w-full gap-5">
    //     {/* Email */}
    //     {stage === "menu" && <EmailMenu setStage={setStage} />}
    //     {stage === "playing" && (
    //       <EmailPlaying
    //         setStage={setStage}
    //         setResult={setResult}
    //         result={result}
    //       />
    //     )}
    //     {stage === "result" && (
    //       <EmailScore setStage={setStage} result={result} />
    //     )}

    //     {/* Leaderboard */}
    //     <EmailLeaderboard />
    //   </div>
    // </div>
  );
}

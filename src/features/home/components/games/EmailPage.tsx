import { useState } from "react";
import { StartMenu } from "./Start";
import { Game } from "./Game";
import { ResultMenu } from "./Result";

export type Step = "start" | "playing" | "result";
export type Result = {
  correct: number;
  currentQuestion: number;
  time?: number;
};
export function EmailPage() {
  const [stage, setStage] = useState<Step>("start");
  const [result, setResult] = useState<Result>();

  return (
    <div className="container grid-col-layout">
      {/* Game */}
      <section className="col-span-full xl:col-span-10">
        {stage == "start" && <StartMenu setStage={setStage} />}
        {stage == "playing" && (
          <Game setStage={setStage} result={result} setResult={setResult} />
        )}
        {stage == "result" && (
          <ResultMenu setStage={setStage} result={result} />
        )}
      </section>

      {/* Side Text */}
      <section className="hidden xl:block relative col-span-2">
        {/* Absolute positioning container to place it at the bottom-left */}
        <h2 className="text-4xl absolute bottom-35 left-17 rotate-90 origin-top-left w-full">
          FIND THE <span className="text-primary">REAL</span> EMAIL
        </h2>
      </section>

      {/* #1 Player */}
      <section className="hidden xl:block col-span-2 h-55 bg-card"></section>

      {/* Leaderboard */}
      <section className="col-span-full xl:col-span-8 bg-secondary h-100"></section>
    </div>
  );
}

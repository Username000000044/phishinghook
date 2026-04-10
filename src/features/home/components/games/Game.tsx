import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Timer, X, Check, Hash, Lock, Trophy } from "lucide-react";
import { EmailTemplate } from "./EmailTemplate";
import { Badge } from "@/components/ui/badge";
import { generateEmail } from "@/lib/games/generateEmail";
import { Result, Step } from "./EmailPage";
import { useEffect, useState } from "react";

interface EmailPlayingTypes {
  setStage: React.Dispatch<React.SetStateAction<Step>>;
  setResult: React.Dispatch<React.SetStateAction<Result | undefined>>;
  result: Result | undefined;
}

export const Game = ({ setStage, setResult, result }: EmailPlayingTypes) => {
  //Reset Values
  useEffect(() => {
    setResult({
      correct: 0,
      currentQuestion: 1,
    });
  }, [setResult]);

  const [email, setEmail] = useState(() => generateEmail());

  // Submit Question
  const submitResponse = (res: "real" | "phishing") => {
    if (result == null) return <h1>Default values not set.</h1>;
    console.log(result);

    const isRealUserAnswer = res === "real";
    const isRealAnswer = email.isReal;

    if (isRealUserAnswer == isRealAnswer) {
      const correct = result.correct;
      const currentQuestion = result.currentQuestion;

      setResult({
        correct: correct + 1,
        currentQuestion: currentQuestion + 1,
      });

      setEmail(generateEmail());
    } else {
      setStage("result");
    }
  };

  //

  return (
    <>
      <div className="flex justify-between items-center text-center p-0 mb-2">
        <h1 className="text-4xl">Email {result?.currentQuestion}</h1>
        <div>
          <div className="flex justify-center gap-2">
            <Badge className="h-min" variant="ghost">
              <Trophy /> {2342}
            </Badge>
            <Badge className="h-min" variant="ghost">
              <Hash /> {result?.currentQuestion}
            </Badge>
            <Badge className="h-min" variant="ghost">
              <Timer /> {"1:30"}
            </Badge>
            <Badge
              className={cn("h-min text-primary", {
                // "text-green-200": email.difficulty == "Easy",
                // "text-amber-500": email.difficulty == "Medium",
                // "text-red-500": email.difficulty == "Hard",
                // "text-fuchsia-800": email.difficulty == "Intense",
              })}
              variant="ghost"
            >
              <Lock /> {email.difficulty}
            </Badge>
          </div>
        </div>
      </div>
      <Card className="bg-transparent p-0">
        <CardContent className="bg-secondary border border-border py-10">
          <div className="flex justify-center w-full">
            <EmailTemplate
              email={email.header.email}
              date={email.header.date}
              from_name={email.header.from_name}
              text={email.body.text}
              hasAttachment={email.body.hasAttachment}
              attachment={email.body.attachment}
            />
          </div>

          <div className="flex justify-center gap-2">
            <div>
              <Button
                size="lg"
                variant="outline"
                className="w-45 rounded-md cursor-pointer rounded-none rounded-l-md"
                onClick={() => submitResponse("phishing")}
              >
                <X /> Phishing
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-45 rounded-md cursor-pointer rounded-none rounded-r-md"
                onClick={() => submitResponse("real")}
              >
                <Check /> Real
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

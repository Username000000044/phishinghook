import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Target, Timer, X, Check, Hash, Lock } from "lucide-react";
import { EmailTemplate } from "./EmailTemplate";
import { Badge } from "@/components/ui/badge";
import { generateEmail } from "@/lib/games/generateEmail";
import { Result, Step } from "./Email";
import { useEffect, useState } from "react";

interface EmailPlayingTypes {
  setStage: React.Dispatch<React.SetStateAction<Step>>;
  setResult: React.Dispatch<React.SetStateAction<Result | undefined>>;
  result: Result | undefined;
}

export const EmailPlaying = ({
  setStage,
  setResult,
  result,
}: EmailPlayingTypes) => {
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

  return (
    <Card className="bg-transparent border-none p-0">
      <CardHeader className="flex justify-between items-center text-center">
        <CardTitle className="text-2xl">
          Question {result?.currentQuestion}
        </CardTitle>
        <CardDescription>
          <div className="flex justify-center gap-2">
            <Badge className="h-min" variant="outline">
              <Hash /> {result?.correct}
            </Badge>
            <Badge className="h-min" variant="outline">
              <Timer /> 1:30
            </Badge>
            <Badge
              className={cn("h-min", {
                "border-green-500 text-green-200": email.difficulty == "Easy",
                "border-amber-500 text-amber-500": email.difficulty == "Medium",
                "border-red-500 text-red-500": email.difficulty == "Hard",
                "border-fuchsia-800 text-fuchsia-800":
                  email.difficulty == "Intense",
              })}
              variant="outline"
            >
              <Lock /> {email.difficulty}
            </Badge>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-card border border-border py-10">
        <div className="flex justify-center w-full">
          <EmailTemplate
            email={email.header.email}
            date={email.header.date}
            abbr={email.header.name_abbr}
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
  );
};

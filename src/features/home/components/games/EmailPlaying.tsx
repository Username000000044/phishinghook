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
      realAnswers: [],
      userAnswers: [],
    });
  }, [setResult]);

  const [email, setEmail] = useState(() => generateEmail());

  const QUESTIONS_AMOUNT = 10;

  // Submit Question
  const submitResponse = (res: "real" | "phishing") => {
    let isRealUserAnswer = res === "real"; // is true if real

    setResult((prev) => {
      if (!prev) return prev;
      return {
        realAnswers: [...prev.realAnswers, email.isReal],
        userAnswers: [...prev.userAnswers, isRealUserAnswer],
      };
    });

    if ((result?.userAnswers.length ?? 0) >= QUESTIONS_AMOUNT - 1) {
      setStage("result");
    } else {
      setEmail(generateEmail());
    }
  };

  let wrongAnswers;
  if (result?.realAnswers && result?.userAnswers) {
    wrongAnswers = countIndexedDifferences(
      result?.realAnswers,
      result?.userAnswers,
    );
  }

  const accuracy = (wrongAnswers ?? QUESTIONS_AMOUNT / QUESTIONS_AMOUNT) * 100;

  return (
    <Card className="bg-transparent border-none p-0">
      <CardHeader className="flex justify-between items-center text-center">
        <CardTitle className="text-2xl">
          Question{" "}
          {result?.userAnswers.length ? result?.userAnswers.length + 1 : 1}
        </CardTitle>
        <CardDescription>
          <div className="flex justify-center gap-2">
            <Badge className="h-min" variant="outline">
              {/* 0.95 * 100 = 95% */}
              <Target /> {accuracy}%
            </Badge>
            {/* <Badge className="h-min" variant="outline">
              <Hash /> 10
            </Badge> */}
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

function countIndexedDifferences(arr1: Array<boolean>, arr2: Array<boolean>) {
  let differenceCount = 0;
  const minLength = Math.min(arr1.length, arr2.length);

  for (let i = 0; i < minLength; i++) {
    if (arr1[i] !== arr2[i]) {
      differenceCount++;
    }
  }
  // If lengths are different, the remaining elements in the longer array are also differences
  if (arr1.length !== arr2.length) {
    differenceCount += Math.abs(arr1.length - arr2.length);
  }

  return differenceCount;
}

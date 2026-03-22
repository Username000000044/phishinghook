import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Swords, Clock, Infinity } from "lucide-react";
import { Step } from "./EmailPage";

type EmailMenuProps = {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
};

export const EmailMenu = ({ setStep }: EmailMenuProps) => {
  return (
    <Card className="bg-transparent border-none p-0">
      <CardHeader className="flex justify-between items-center text-center">
        <CardTitle className="text-2xl">Detect Email</CardTitle>
        <CardDescription>
          <Skeleton className="hidden lg:block h-6 w-64" />
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-transparent border-none p-0">
        <div className="grid md:grid-cols-2 gap-5 ">
          <div
            className="flex gap-5 border border-border p-5 cursor-pointer transform hover:-translate-y-1 hover:scale-102 transition duration-300 ease-in-out"
            onClick={() => setStep("Playing")}
          >
            <div>
              <p className="text-2xl font-bold flex items-center gap-2">
                <Infinity /> Infinite
              </p>
              <p className="text-muted-foreground">
                A limitless game to assess your knowledge on phishing emails.
              </p>
            </div>
          </div>
          <div className="flex gap-5 border border-border p-5 blur-xs">
            <div>
              <p className="text-2xl font-bold flex items-center gap-2">
                <Clock /> Timed
              </p>
              <p className="text-muted-foreground">
                A timed solution that requires fast analyzing and interpretation
                of phishing emails.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center"></div>
      </CardContent>
    </Card>
  );
};

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, Search, Target } from "lucide-react";
import { Step } from "./Email";

export const EmailMenu = ({
  setStage,
}: {
  setStage: React.Dispatch<React.SetStateAction<Step>>;
}) => {
  return (
    <Card className="bg-transparent border-none p-0">
      <CardHeader>
        <CardTitle className="text-2xl">Detect Email</CardTitle>
        <CardDescription>
          <p>Unlimited Questions</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col bg-transparent border-none p-0 text-center">
        <div className="flex justify-center gap-2 md:gap-4 mt-5">
          <div className="flex flex-col gap-1">
            <span className="flex gap-2 items-center font-medium text-lg">
              <Eye size="15" />
              Examine
            </span>
            <span className="text-muted-foreground">Email & Attachments</span>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col gap-1">
            <span className="flex gap-2 items-center font-medium  text-lg">
              <Search size="15" /> Find
            </span>
            <span className="text-muted-foreground">Abnormalities</span>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col gap-1">
            <span className="flex items-center gap-2 font-medium  text-lg">
              <Target size="15" />
              Decide
            </span>
            <span className="text-muted-foreground">Real or Phishing</span>
          </div>
        </div>
        <Button
          className="w-full mt-10 cursor-pointer"
          variant="outline"
          onClick={() => setStage("playing")}
        >
          Start Game
        </Button>
      </CardContent>
    </Card>
  );
};

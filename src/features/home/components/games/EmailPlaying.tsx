import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Target,
  Timer,
  X,
  Check,
  Hash,
  Lock,
  ArrowBigLeft,
} from "lucide-react";
import { EmailTemplate } from "./EmailTemplate";
import { Badge } from "@/components/ui/badge";
import { Email } from "../../client/generateEmail";
import { useNavigate, useRouter } from "@tanstack/react-router";

export const EmailPlaying = ({ email }: { email: Email }) => {
  const navigate = useNavigate();

  return (
    <Card className="bg-transparent border-none p-0">
      <CardHeader className="flex justify-between items-center text-center">
        <CardTitle className="text-2xl">Question 1</CardTitle>
        <CardDescription>
          <div className="flex justify-center gap-2">
            <Badge className="h-min" variant="outline">
              <Target /> 80%
            </Badge>
            <Badge className="h-min" variant="outline">
              <Hash /> 4325
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
      <CardContent className="bg-card border border-border  py-10">
        <div className="flex justify-center w-full ">
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
          <Button
            size="lg"
            variant="outline"
            className="w-45 rounded-md cursor-pointer rounded-none rounded-l-md"
          >
            <X /> Phishing
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-45 rounded-md cursor-pointer rounded-none rounded-r-md"
          >
            <Check /> Real
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

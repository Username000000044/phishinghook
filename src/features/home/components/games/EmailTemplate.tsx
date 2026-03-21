import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Paperclip, ChevronDown } from "lucide-react";

type EmailTemplateProps = {
  email: string;
  date: string;
  abbr: string;
  text: string;
  hasAttachment: boolean;
  attachment: string | undefined;
};

export const EmailTemplate = ({
  email,
  date,
  abbr,
  text,
  hasAttachment,
  attachment,
}: EmailTemplateProps) => {
  return (
    <div>
      <div className="grid grid-cols-[auto_1fr] gap-5 max-w-200 w-full">
        <Avatar>
          <AvatarFallback>{abbr}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex justify-between items-center">
            <p>{email}</p>
            <p className="flex items-center gap-2 text-muted-foreground text-sm">
              <Paperclip size={15} /> {date}
            </p>
          </div>
          <p className="flex text-muted-foreground text-sm">
            to me <ChevronDown size={15} />
          </p>
          <p className="mt-4">{text}</p>

          {hasAttachment && (
            <div>
              <p className="mt-4 text-sm">
                One attachment &#x2022;{" "}
                <span className="text-muted-foreground">Scanned by Email</span>
              </p>
              <p className="text-sm text-blue-500 underline cursor-pointer">
                {attachment}
              </p>
            </div>
          )}
        </div>
      </div>
      <Separator className="my-10" />
    </div>
  );
};

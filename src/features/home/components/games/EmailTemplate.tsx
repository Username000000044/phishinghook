import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Paperclip, ChevronDown } from "lucide-react";

type EmailTemplateProps = {
  email: string;
  date: string;
  from_name: string;
  text: string;
  hasAttachment: boolean;
  attachment: string | undefined;
};

export const EmailTemplate = ({
  email,
  date,
  from_name,
  text,
  hasAttachment,
  attachment,
}: EmailTemplateProps) => {
  return (
    <div className="w-full">
      {/* Info */}
      <div className="grid grid-cols-[auto_1fr] gap-4 w-full">
        <Avatar>
          <AvatarFallback className="bg-foreground text-background font-bold">
            {from_name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex gap-4 w-full">
            <div>
              {from_name}
              <p className="flex items-center gap-2 text-muted-foreground text-sm">
                To me <ChevronDown size={10} />
              </p>
            </div>
            <p className="ml-auto lg:m-0 text-muted-foreground text-sm">
              {`<${email}>`}
            </p>
            <p className="hidden lg:block ml-auto text-muted-foreground text-sm">
              {date}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-180 py-8">
        <p className="whitespace-pre-wrap">{text}</p>
        {hasAttachment && (
          <div>
            <Separator className="my-10" />
            <p className="mt-4 text-sm">
              One attachment &#x2022;{" "}
              <span className="text-muted-foreground">
                Not scanned by Email
              </span>
            </p>
            <p className="text-sm text-primary underline cursor-pointer">
              {attachment}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

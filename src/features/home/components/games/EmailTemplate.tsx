import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Paperclip, ChevronDown } from "lucide-react";

export const EmailTemplate = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-5 max-w-200 w-full">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex justify-between items-center">
          <p>willlevi@proton.me</p>
          <p className="flex items-center gap-2 text-muted-foreground text-sm">
            <Paperclip size={15} /> Mar 13, 2026, 8:56 AM
          </p>
        </div>
        <p className="flex text-muted-foreground text-sm">
          to me <ChevronDown size={15} />
        </p>
        <p className="mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
          molestie imperdiet elementum. Morbi convallis, odio at bibendum
          ullamcorper, tortor magna tempor enim, eget vestibulum justo justo
          quis nunc. Phasellus sit amet magna in erat egestas posuere at et
          risus. Nunc mollis suscipit nisi, sit amet
        </p>
        <p className="mt-4 text-sm">
          One attachment &#x2022;{" "}
          <span className="text-muted-foreground">Scanned by Email</span>
        </p>
        <p className="text-sm text-blue-500 underline cursor-pointer">
          Community Meeting Updates.pdf
        </p>

        <Separator className="my-10" />
      </div>
    </div>
  );
};

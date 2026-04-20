import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Brain, MailOpen, Plus, Send, X } from "lucide-react";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ollamaChat, sendOllamaEmail } from "../utils/ollama";
import { useRequiredSession } from "@/hooks/auth";
import { toast } from "sonner";
import { Email } from "@/types/emails";

export const DemoDialog = ({
  onEmailAdded,
}: {
  onEmailAdded: (newEmail: Email) => void;
}) => {
  const session = useRequiredSession();

  const [input, setInput] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    mutate: handleGenerate,
    data,
    isPending,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: (items: string[]) => ollamaChat({ data: items }),
  });

  function addItem() {
    setInput("");
    setItems((prev) => [...prev, input]);
    inputRef.current?.focus();
  }

  async function sendAIEmail() {
    if (!data) return;
    await sendOllamaEmail({
      data: { user: session.user, email: data },
    });

    // add item to table
  }

  return (
    <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="secondary"
          className="text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <MailOpen /> Send Demo
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-sm">
        <AlertDialogHeader>
          <div className="flex justify-between w-full">
            <AlertDialogTitle>Demo Email</AlertDialogTitle>
            <AlertDialogCancel size="icon-xs" asChild>
              <Button
                variant="secondary"
                size="icon-xs"
                onClick={() => {
                  reset();
                  setInput("");
                  setItems([]);
                }}
              >
                <X />
              </Button>
            </AlertDialogCancel>
          </div>
        </AlertDialogHeader>
        <AlertDialogDescription className="text-sm">
          To <span className="text-xs text-primary">GENERATE</span>, enter
          topics that should be included in the email .{" "}
        </AlertDialogDescription>

        {/* Input */}
        <div className="my-4">
          <Field orientation="horizontal">
            <Input
              ref={inputRef}
              type="search"
              placeholder="Add item..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key == "Enter" && input.trim().length >= 2) {
                  addItem();
                }
              }}
              value={input}
              maxLength={25}
              autoFocus
            />
            <Button
              onClick={addItem}
              disabled={input.length == 0 || input.trim().length < 2}
              className="cursor-pointer"
            >
              <Plus />
            </Button>
          </Field>

          {/* Items */}
          <div className="flex gap-2 flex-wrap mt-4">
            {items.map((item, idx) => (
              <Badge
                variant="outline"
                className="text-muted-foreground hover:bg-destructive/20 cursor-pointer"
                onClick={() =>
                  setItems((prev) => prev.filter((_, i) => i !== idx))
                }
                key={idx}
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>

        {/* AI Error */}
        {isError && <p className="text-destructive">{error.message}</p>}

        {/* Buttons */}
        <AlertDialogFooter>
          {isSuccess ? (
            <Button
              variant="outline"
              className="cursor-pointer w-full"
              onClick={async () => {
                await sendAIEmail();
                toast.success("Sent Demo Email!");

                //Add to email list
                onEmailAdded({
                  id: "728e252f",
                  user: session.user,
                  sent_date: String(
                    new Date().toLocaleDateString("en-US", {
                      month: "numeric",
                      day: "numeric",
                      year: "numeric",
                    }),
                  ),
                  status: "Recieved",
                });

                // Close alert
                setOpen(false);
              }}
            >
              <Send /> Send
            </Button>
          ) : (
            <Button
              className="cursor-pointer w-full"
              variant="default"
              disabled={items.length <= 0 || isPending}
              onClick={() => handleGenerate(items)}
            >
              {isPending ? (
                <span className="animate-bounce">Generating...</span>
              ) : (
                <span className="flex gap-2 items-center">
                  <Brain />
                  Generate
                </span>
              )}
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

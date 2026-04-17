import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Brain, MailOpen } from "lucide-react";
import React, { useState } from "react";
import { useChat, fetchServerSentEvents } from "@tanstack/ai-react";

export const DemoDialog = () => {
  const [input, setInput] = useState("");

  const { messages, sendMessage, isLoading, error } = useChat({
    connection: fetchServerSentEvents("/api/chat"),
    onFinish: () => {
      console.log("Stream finished");
      console.log(messages);
    },
  });

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      // Send the actual user input
      sendMessage("how are you doing today?"); // {input}
      setInput("");
    }
  }

  return (
    <AlertDialog>
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
        <form onSubmit={handleSubmit} id="demo-form" className="space-y-4">
          <AlertDialogHeader>
            <AlertDialogTitle>Create Demo</AlertDialogTitle>
            <AlertDialogDescription>
              Enter some details about yourself then press{" "}
              <span className="text-xs text-primary">GENERATE</span> to have AI
              create your personalized email.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {!isLoading && (
            <>
              <Field>
                <Textarea
                  placeholder="Enter here:"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </Field>

              <p className="text-sm text-muted">
                Example: Finance, Enterprise, Analyst Position, Bonus
              </p>
            </>
          )}

          {error && <p className="text-destructive text-sm">{error.message}</p>}

          <AlertDialogFooter>
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="cursor-pointer"
            >
              {isLoading ? (
                <span className="animate-bounce">Generating...</span>
              ) : (
                <>
                  <Brain /> Generate
                </>
              )}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

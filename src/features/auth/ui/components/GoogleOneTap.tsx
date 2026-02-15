import { redirect } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { authClient } from "../../client/auth-client";

export function GoogleOneTap() {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      authClient.oneTap({
        button: {
          container: buttonRef.current,
          config: {
            theme: "filled_black",
            size: "medium",
            type: "standard",
          },
        },
        fetchOptions: {
          onSuccess: () => {
            throw redirect({ to: "/dashboard" });
          },
        },
      });
    }
  });

  return <div ref={buttonRef}></div>;
}

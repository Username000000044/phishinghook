import { authClient } from "@/features/auth/client/auth-client";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

export function GoogleOneTap() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
            navigate({ to: "/dashboard" });
          },
        },
      });
    }
  });

  return <div ref={buttonRef}></div>;
}

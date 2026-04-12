import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/features/auth/client/auth-client";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export function GoogleOneTap() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    if (buttonRef.current) {
      authClient.oneTap({
        button: {
          container: buttonRef.current,
          config: {
            theme: "filled_black",
            size: "large",
            type: "icon",
          },
        },
        cancelOnTapOutside: true,
        fetchOptions: {
          onSuccess: () => {
            navigate({ to: "/dashboard" });
          },
        },
      });
    }

    setIsLoading(false);
  });

  return (
    <div>
      {isLoading && <Skeleton className="size-10" />}
      {!isLoading && <div className="" ref={buttonRef}></div>}
    </div>
  );
}

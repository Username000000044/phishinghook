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

    setIsLoading(false);
  });

  return (
    <div>
      {isLoading && <Skeleton className="h-[30px] w-[180px]" />}
      {!isLoading && <div ref={buttonRef}></div>}
    </div>
  );
}

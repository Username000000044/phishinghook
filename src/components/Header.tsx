import { getRouteApi, Link } from "@tanstack/react-router";
import { Badge } from "@ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@ui/hover-card";
import { MailQuestionMark, QrCode } from "lucide-react";
import { Button } from "@ui/button";
import UserDropdown from "./UserDropdown";

export default function Header() {
  const routeApi = getRouteApi("/_home");
  const { isAuthenicated } = routeApi.useLoaderData();

  return (
    <div className="w-full flex justify-between items-center pb-[1rem]">
      {/* left */}
      <div className="flex gap-5">
        <Link to="/">
          <img src="/brand/pish-white.svg" width="60" alt="PhishingHook Logo" />
        </Link>
        <Badge variant="outline" className="self-end">
          Alpha
        </Badge>
      </div>

      {/* middle */}
      <ol className="hidden md:flex gap-5 font-code text-md">
        <li>
          <HoverCard openDelay={10} closeDelay={100}>
            <HoverCardTrigger asChild>
              <Button variant="ghost" asChild>
                <Link to=".">Games</Link>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="max-w-120 w-full">
              <div className="grid grid-cols-2 divide-x-2 divide-dotted divide-muted">
                {/* email game */}
                <Button variant="ghost" asChild>
                  <Link
                    to="/games/email"
                    className="flex flex-col items-center w-full h-full text-center"
                  >
                    <MailQuestionMark className="size-10" strokeWidth=".75" />
                    <h1 className="text-2xl font-bold">Detect Email</h1>
                    <h2 className="text-wrap text-sm text-muted-foreground">
                      Find phisihing emails and their masked identify and
                      author.
                    </h2>
                  </Link>
                </Button>

                {/* url game */}
                <Button variant="ghost" asChild>
                  <Link
                    to="/games/url"
                    className="flex flex-col items-center w-full h-full text-center"
                  >
                    <QrCode className="size-10" strokeWidth=".75" />
                    <h1 className="text-2xl font-bold">Fishy URL?</h1>
                    <h2 className="text-wrap text-sm text-muted-foreground">
                      Find counterfeit URLs and their camouflaged appearnce.
                    </h2>
                  </Link>
                </Button>
              </div>
            </HoverCardContent>
          </HoverCard>
        </li>
        <li>
          <Button variant="ghost" asChild>
            <Link to="/products">Products</Link>
          </Button>
        </li>
        <li>
          <Button variant="ghost" asChild>
            <Link to="/resources">Resources</Link>
          </Button>
        </li>
        <li>
          <Button variant="ghost" asChild>
            <Link to="/pricing">Pricing</Link>
          </Button>
        </li>
      </ol>

      {/* right */}
      <div className="flex gap-5">
        {isAuthenicated && <UserDropdown />}
        {!isAuthenicated && (
          <>
            <Button variant="outline" asChild>
              <Link to="/">Get Started</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign up</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

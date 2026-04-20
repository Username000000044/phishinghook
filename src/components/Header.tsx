import { Link } from "@tanstack/react-router";
import { Badge } from "@ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@ui/hover-card";
import { KeySquare, MailQuestionMark, QrCode } from "lucide-react";
import { Button } from "@ui/button";
import UserDropdown from "./UserDropdown";
import { useSession } from "@/hooks/auth";

export default function Header() {
  // check if user isAuthenicated
  const session = useSession();

  return (
    <div>
      {/* Inorganic Shape */}
      <svg
        className="-translate-x-25 md:translate-x-0 absolute text-primary/80 -z-10"
        width="202"
        height="284"
        viewBox="0 0 202 284"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M57 -17C65.8366 -17 73 -9.83656 73 -1V15C73 23.8366 80.1634 31 89 31H186C194.837 31 202 38.1634 202 47V88C202 96.8366 194.837 104 186 104H89C80.1634 104 73 111.163 73 120V268C73 276.837 65.8366 284 57 284H4C-4.83656 284 -12 276.837 -12 268V-1C-12 -9.83656 -4.83656 -17 4 -17H57Z"
          fill="currentColor"
        />
      </svg>

      <header className="w-full flex justify-between items-center px-4 mt-13 mb-25 md:mb-30 md:mt-11 md:px-8">
        {/* left */}
        <div className="flex items-center gap-5">
          <Link to="/">
            <img
              src="/brand/pish-black.svg"
              width="70"
              alt="PhishingHook Logo"
            />
          </Link>
          <Badge variant="secondary" className="h-min hidden md:block">
            Alpha
          </Badge>
        </div>

        {/* middle */}
        <nav className="rounded-lg p-2">
          <ol className="hidden md:flex gap-8">
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
                        <MailQuestionMark
                          className="size-10"
                          strokeWidth=".75"
                        />
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
                <Link to="/impact">Impact</Link>
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
        </nav>

        {/* right */}

        <div>
          {session && <UserDropdown />}
          {!session && (
            <Button className="bg-foreground" asChild>
              <Link to="/login">
                Login <KeySquare />
              </Link>
            </Button>
          )}
        </div>
      </header>
    </div>
  );
}

export function BareHeader({ className }: { className: string }) {
  return (
    <div>
      {/* Inorganic Shape */}
      <svg
        className="-translate-x-25 md:translate-x-0 absolute text-primary/80 -z-10"
        width="202"
        height="284"
        viewBox="0 0 202 284"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M57 -17C65.8366 -17 73 -9.83656 73 -1V15C73 23.8366 80.1634 31 89 31H186C194.837 31 202 38.1634 202 47V88C202 96.8366 194.837 104 186 104H89C80.1634 104 73 111.163 73 120V268C73 276.837 65.8366 284 57 284H4C-4.83656 284 -12 276.837 -12 268V-1C-12 -9.83656 -4.83656 -17 4 -17H57Z"
          fill="currentColor"
        />
      </svg>

      <header className={`${className} w-full px-4 mt-13 md:px-8`}>
        {/* left */}
        <div className="flex items-center gap-5">
          <Link to="/">
            <img
              src="/brand/pish-black.svg"
              width="70"
              alt="PhishingHook Logo"
            />
          </Link>
          <Badge variant="secondary" className="h-min hidden md:block">
            Alpha
          </Badge>
        </div>
      </header>
    </div>
  );
}

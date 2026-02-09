import { Link } from "@tanstack/react-router";
import { Badge } from "@ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@ui/hover-card";
import { MailQuestionMark, QrCode } from "lucide-react"
import { Button } from "@ui/button"

export default function Header () {
    return <div className="w-full flex justify-between items-center">
        {/* left */}
        <div className="flex gap-3">
            <Link to="/">
                <img src="/pish-white.svg" width="60" alt="PhishingHook Logo" />
            </Link>
            <Badge variant="outline" className="self-end">Alpha</Badge>
        </div>

        {/* middle */}
        <ol className="flex gap-5 font-code text-md">
            <li>
                <HoverCard openDelay={10} closeDelay={100}>
                    <HoverCardTrigger asChild>
                        <Button variant="ghost" asChild>
                            <Link to="/">Games</Link>
                        </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="max-w-120 w-full">
                        <div className="grid grid-cols-2 divide-x-2 divide-dotted divide-muted">

                            {/* email game */}
                            <Button variant="ghost" asChild>
                                <Link to="/games/email" className="flex flex-col items-center w-full h-full text-center">
                                    <MailQuestionMark className="size-10" strokeWidth=".75"/>
                                    <h1 className="text-2xl font-bold">Email Game</h1>
                                    <h2 className="text-wrap text-sm text-muted-foreground">Find phisihing emails and their masked identify and author.</h2>
                                </Link>
                            </Button>

                            {/* url game */}
                            <Button variant="ghost" asChild>
                                <Link to="/games/url" className="flex flex-col items-center w-full h-full text-center">
                                    <QrCode className="size-10" strokeWidth=".75"/>
                                    <h1 className="text-2xl font-bold">URL Game</h1>
                                    <h2 className="text-wrap text-sm text-muted-foreground">Find counterfeit URLs and their camouflaged appearnce.</h2>
                                </Link>
                            </Button>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </li>
            <li><Button variant="ghost" asChild><Link to="/products">Products</Link></Button></li>
            <li><Button variant="ghost" asChild><Link to="/resources">Resources</Link></Button></li>
            <li><Button variant="ghost" asChild><Link to="/pricing">Pricing</Link></Button></li>
        </ol>

        {/* right */}
        <div className="flex gap-3">
            <Button variant="outline" asChild>
                <Link to="/">Get Started</Link>
            </Button>
            <Button asChild>
                <Link to="/auth">Sign in</Link>
            </Button>
            
        </div>
    </div>  
}
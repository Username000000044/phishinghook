import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PricingCard } from "./PricingCard";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Coins, KeySquare, Mail } from "lucide-react";

const pricingData = [
  {
    id: "starter",
    title: "Starter",
    perks: [
      "10 phishing simulation emails per month",
      "1 user account",
      "Basic email templates",
      "Manual campaign sending",
      "Basic reporting dashboard",
      "Email support",
    ],
    monthly: 0,
    annual: 0,
  },
  {
    id: "team",
    title: "Team",
    perks: [
      "20 phishing simulation emails per user/month",
      "Up to 10 users",
      "Advanced template library",
      "Custom email templates",
      "Scheduled campaigns",
      "Team performance analytics",
      "CSV user import",
      "Basic phishing awareness training modules",
      "Priority email support",
    ],
    monthly: 199,
    annual: 899,
    most_popular: true,
  },
  {
    id: "organization",
    title: "Organization",
    perks: [
      "Unlimited phishing simulation emails",
      "Up to 200 users",
      "Full template library + custom templates",
      "Automated & recurring campaigns",
      "Advanced analytics & reporting",
      "Real-time tracking & alerts",
      "User segmentation & targeting",
      "SSO / SAML integration",
      "API access",
      "Compliance-ready reporting (SOC2, HIPAA, etc.)",
      "Dedicated account manager",
      "Priority support + SLA",
    ],
    monthly: 200,
    annual: 1299,
  },
];

export function HomePage() {
  return (
    <div className="relative container grid-col-layout mt-30">
      {/* Fishing Hook + Card */}
      <div className="xl:block hidden absolute col-start-10 -translate-y-54">
        {/* Line */}
        <svg
          className="text-chart-4 relative z-20"
          width="161"
          height="444"
          viewBox="0 0 161 444"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M111.926 426.955C111.873 428.01 113.848 430.769 118.466 434.205C127.474 440.91 139.249 434.738 146.725 430.068C149.322 426.209 151.679 422.034 153.597 415.755C154.354 411.532 152.084 387.231 149.377 377.355C129.396 277.601 113.68 226.866 103.239 175.995C92.7977 125.124 7.25573 -270.357 6.28149 -274"
            stroke="currentColor"
            strokeWidth="13"
          />
        </svg>
        {/* Card */}
        <Card className="p-0 gap-0 absolute w-75 rounded-none rounded-b-xl max-w-90 -translate-y-18 translate-x-10 -rotate-20 relative z-10">
          <CardContent className="flex aspect-[3/3.5] bg-secondary"></CardContent>
          <div className=" h-15 rounded-b-xl"></div>
        </Card>
        {/* Hook */}
        <svg
          className="text-chart-4 translate-x-24 -translate-y-129"
          width="33"
          height="55"
          viewBox="0 0 33 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.04473 52.4482C5.83434 43.9232 6.01597 28.9246 8.46292 17.2247C9.41343 12.68 12.3598 8.86593 13.0029 6.75158C13.6267 4.70034 11.4876 15.6947 11.8638 23.9801C13.9547 29.7084 16.9778 33.6252 20.0054 36.9736C21.5305 38.6603 23.0329 40.3219 27.6162 45.3905"
            stroke="currentColor"
            strokeWidth="13"
          />
        </svg>
      </div>

      {/* Hero */}
      <section className="col-span-full mb-20 md:mb-40">
        <h1 className="break-all text-[4.3rem] font-bold leading-16 lg:text-[6rem] lg:leading-20 wrap-all">
          DIGITAL
          <span className="relative flex flex-col md:flex-row md:gap-4">
            <span className="flex items-end text-primary">
              MAIL&thinsp;
              <div className="mx-2 h-12 w-12 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-white from-50% to-primary to-50% mb-1"></div>
            </span>
            SECURITY
          </span>
          TRAINING
        </h1>
        <h2 className="mt-4 text-2xl md:text-3xl text-muted">
          Online phishing training for any user of the internet.
        </h2>
        <div className="mt-8 flex gap-4">
          <Button size="lg" asChild>
            <Link to="." hash="prices">
              <Coins /> Prices
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/signup">
              <Mail /> Start Free
            </Link>
          </Button>
        </div>
      </section>

      {/* Cards */}
      <ScrollArea id="prices" className="col-span-full">
        <div className="flex gap-4">
          {pricingData.map((data) => (
            <PricingCard pricingData={data} key={data.id} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

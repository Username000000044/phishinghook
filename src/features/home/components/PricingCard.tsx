import { useState } from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";

type PricingPlan = {
  id: string;
  title: string;
  perks: string[];
  monthly: number;
  annual: number;
  most_popular?: boolean;
};

export const PricingCard = ({ pricingData }: { pricingData: PricingPlan }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  const price = isAnnual ? pricingData.annual : pricingData.monthly;
  const period = isAnnual ? "year" : "month";
  const savings = isAnnual
    ? pricingData.monthly * 12 - pricingData.annual
    : null;

  const RegularCard = () => {
    return (
      <Card className="bg-background hover:bg-secondary transition duration-300 ease-in-out w-80 md:w-100 h-full border-none">
        <CardHeader>
          <p className="text-sm font-thin">{pricingData.title.toUpperCase()}</p>

          <CardDescription className="text-foreground text-4xl mt-2">
            ${price}
            <span className="text-lg text-muted-foreground"> / {period}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="bg-accent" />

          <div className="flex flex-col gap-4 mt-6">
            {pricingData.perks.map((benefit, i) => (
              <div key={i} className="flex gap-4 items-center">
                <Checkbox checked />
                <p>{benefit}</p>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="block mt-auto">
          <div className="mb-2">
            <Separator className="bg-accent" />
          </div>

          <div className="flex flex-col w-full gap-4">
            <div className="flex justify-between">
              <p>Annual plan</p>
              <Switch
                checked={isAnnual}
                onCheckedChange={() => setIsAnnual(!isAnnual)}
              />
            </div>
            <Button className="w-full" asChild>
              <Link to=".">Get Started</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  };

  const PopularCard = () => {
    return (
      <Card className="bg-secondary hover:bg-card transition duration-300 ease-in-out w-80 md:w-100 h-full  border-none">
        <CardHeader>
          <CardTitle className="flex justify-between items-center flex-wrap p-0 gap-0 w-full">
            <p className="text-sm font-thin">
              {pricingData.title.toUpperCase()}
            </p>
            <Badge variant="ghost" className="border border-primary/20 h-6">
              Most Popular
            </Badge>
          </CardTitle>

          <CardDescription className="text-foreground text-4xl mt-2">
            ${price}
            <span className="text-lg text-muted-foreground"> / {period}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="bg-background" />

          <div className="flex flex-col gap-4 mt-6">
            {pricingData.perks.map((benefit, i) => (
              <div key={i} className="flex gap-4 items-center">
                <Checkbox checked />
                <p>{benefit}</p>
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="block mt-auto">
          <div className="mb-2">
            <Separator className="bg-background" />
          </div>

          <div className="flex flex-col w-full gap-4">
            <div className="flex justify-between">
              <p>Annual plan</p>
              <Switch
                checked={isAnnual}
                onCheckedChange={() => setIsAnnual(!isAnnual)}
              />
            </div>
            <Button className="w-full" asChild>
              <Link to=".">Get Started</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div>
      {!pricingData.most_popular && <RegularCard />}
      {pricingData.most_popular && <PopularCard />}
    </div>
  );
};

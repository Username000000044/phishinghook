import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardAction,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export const PricingCard = () => {
  return (
    <Card className="w-70 !pt-0">
      <div className="inset-0 z-30 aspect-video bg-black/35" />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle>Design systems meetup</CardTitle>
        <CardDescription>
          A practical talk on component APIs, accessibility, and shipping
          faster.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View Event</Button>
      </CardFooter>
    </Card>
  );
};

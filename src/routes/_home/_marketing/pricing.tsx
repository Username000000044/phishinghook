import { PricingPage } from "@/features/home";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_home/_marketing/pricing")({
  component: PricingPage,
});

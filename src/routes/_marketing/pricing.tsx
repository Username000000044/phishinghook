import { PricingPage } from '@/features/marketing'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_marketing/pricing')({ component: PricingPage })

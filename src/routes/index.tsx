import { createFileRoute } from '@tanstack/react-router'
import { LandingPage } from '@features/home'

export const Route = createFileRoute('/')({ component: LandingPage })

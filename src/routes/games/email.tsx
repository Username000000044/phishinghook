import { createFileRoute } from '@tanstack/react-router'
import { EmailGamePage } from '@/features/games/'

export const Route = createFileRoute('/games/email')({ component: EmailGamePage })

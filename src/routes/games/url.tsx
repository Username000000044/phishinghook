import { createFileRoute } from '@tanstack/react-router'
import { URLGamePage } from '@/features/games/'

export const Route = createFileRoute('/games/url')({ component: URLGamePage })

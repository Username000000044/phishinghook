import { ProductsPage } from '@/features/marketing'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_marketing/products')({ component: ProductsPage })

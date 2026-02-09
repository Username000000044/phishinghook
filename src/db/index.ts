import { drizzle } from 'drizzle-orm/node-postgres'

// Initialize Drizzle Connection
export const db = drizzle(process.env.DATABASE_URL!);

import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '@db/schema.ts'

// Initialize Drizzle Connection
export const db = drizzle(process.env.DATABASE_URL!, { 
    schema,
 });

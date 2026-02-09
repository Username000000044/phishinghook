import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

// Parses data + sets up .env to use process.env and parses .env on start
config({ path: ['.env'] })

// Main drizzle config
export default defineConfig({
  out: './src/db/migrations',
  schema: './src/features/**/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true
})

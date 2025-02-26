import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  NODE_ENV: z.string(),
  PORT: z.coerce.number(),
  SECRET_KEY: z.string(),
})

export const env = envSchema.parse(process.env)

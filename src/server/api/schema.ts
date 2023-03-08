import { z } from 'zod'

export const createAppSchema = z.object({
  icon: z.string().emoji(),
  name: z.string().min(1),
  description: z.string().min(1),
  demoInput: z.string().min(1),
  prompt: z.string().min(1),
})

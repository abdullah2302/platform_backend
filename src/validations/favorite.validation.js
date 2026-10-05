import { z } from 'zod'

export default {
  add: z.object({ body: z.object({ person: z.string().min(1), list: z.string().optional() }) }),
  list: z.object({ body: z.object({ name: z.string().min(1).max(100), description: z.string().max(500).optional() }) }),
}

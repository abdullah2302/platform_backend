import { z } from 'zod'

export default {
  create: z.object({ body: z.object({ person: z.string().min(1), note: z.string().max(2000).optional() }) }),
  review: z.object({ body: z.object({ status: z.enum(['approved', 'rejected']) }) }),
}

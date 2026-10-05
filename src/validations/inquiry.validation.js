import { z } from 'zod'

export default {
  create: z.object({ body: z.object({
    person: z.string().min(1),
    service: z.string().optional(),
    subject: z.string().min(1).max(160),
    message: z.string().min(1).max(5000),
  }) }),
  status: z.object({ body: z.object({ status: z.enum(['accepted', 'declined', 'closed']) }) }),
}

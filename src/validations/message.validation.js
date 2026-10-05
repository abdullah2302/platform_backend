import { z } from 'zod'

export default {
  create: z.object({ body: z.object({ body: z.string().min(1).max(5000) }) }),
}

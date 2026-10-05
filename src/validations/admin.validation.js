import { z } from 'zod'

export default {
  report: z.object({ body: z.object({ person: z.string().min(1), reason: z.string().min(1).max(2000) }) }),
  reportUpdate: z.object({ body: z.object({ status: z.enum(['reviewing', 'resolved', 'dismissed']), resolution: z.string().max(2000).optional() }) }),
}

import { z } from 'zod'

const fields = {
  name: z.string().min(1).optional(),
  bio: z.string().optional(),
  country: z.string().optional(),
  industry: z.string().optional(),
  profession: z.string().optional(),
  topics: z.array(z.string()).optional(),
}

export default {
  create: z.object({ body: z.object({ ...fields, name: z.string().min(1) }), query: z.record(z.string()).optional(), params: z.record(z.string()).optional() }),
  update: z.object({ body: z.object(fields).refine((value) => Object.keys(value).length > 0), query: z.record(z.string()).optional(), params: z.record(z.string()).optional() }),
}

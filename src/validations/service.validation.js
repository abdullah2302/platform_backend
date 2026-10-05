import { z } from 'zod'

const fields = {
  title: z.string().min(1).max(120),
  description: z.string().min(1).max(3000),
  serviceType: z.string().max(80).optional(),
  price: z.number().min(0).optional(),
  currency: z.string().max(3).optional(),
  active: z.boolean().optional(),
}

export default {
  create: z.object({ body: z.object(fields) }),
  update: z.object({ body: z.object(fields).partial().refine((value) => Object.keys(value).length > 0) }),
}

import { z } from 'zod'

const credentials = z.object({ email: z.string().email(), password: z.string().min(8) })
export default {
  register: z.object({ body: credentials.extend({ name: z.string().min(1) }), query: z.record(z.string()).optional(), params: z.record(z.string()).optional() }),
  login: z.object({ body: credentials, query: z.record(z.string()).optional(), params: z.record(z.string()).optional() }),
}

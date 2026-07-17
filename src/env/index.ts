import 'dotenv/config'
import z from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3000),
})

// safeParse valida se as variáveis de ambiente existem e foram carregadas corretamente.
const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.') // o throw impede que o código após o mesmo execute, derrubando a aplicação.
}

export const env = _env.data

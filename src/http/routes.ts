import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'

// Controller: A função "register" abaixo (que cuida da entrada de dados proveniente de uma requisição http e devolve uma resposta de alguma forma.)
export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
}

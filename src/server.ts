import { app } from './app'
import { env } from './env'

app
  .listen({
    host: '0.0.0.0', // para permitir conexão com frontends consumindo nossa API.
    port: env.PORT,
  })
  .then(() => {
    console.log('🚀 HTTP Server Running!')
  })

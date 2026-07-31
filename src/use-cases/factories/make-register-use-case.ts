import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { RegisterUseCase } from '../register'

/**
 * A factory pattern é muito útil para criar fábricas: funções que criam entidades maiores e mais complexas, com dependências, cálculos, etc.
 * Normalmente, uma factory não deve possuir regras de negócio; servem apenas para instanciação de classes.
 */
export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(prismaUsersRepository)

  return registerUseCase
}

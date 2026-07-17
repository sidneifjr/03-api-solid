/**
 * Repository Pattern: serve para abstrair a parte de comunicação (requisições) aos bancos de dados em um arquivo separado.
 *
 * - Dentro da classe abaixo, terei todos os métodos que interceptam ou que são as portas de entrada para todas as operações no banco de dados.
 * - Essa pattern é muito útil para isolar as operações referente ao banco de dados do resto do código.
 * - Assim, caso uma mudança de ORM ou de abordagem seja necessária, somente os repositórios serão afetados pela mudança
 *
 * IMPORTANTE: todas as operações do banco de dados sempre passarão pelos repositórios.
 */
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaUsersRepository {
  // O Prisma gera as tipagens das nossas tabelas, devido à sua integração com TypeScript.
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}

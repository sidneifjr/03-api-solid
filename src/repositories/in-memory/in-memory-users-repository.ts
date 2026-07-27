import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

// Procurando por usuário usando JavaScript, ao invés de utilizar o banco de dados.
// Dessa forma, o processo é mais rápido e evita inserção de dados desnecessária.
export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}

import { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

// Autenticação é um processo que envolve entrada e saída. Portanto, é importante definir as tipagens para o mesmo.
interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

// O uso de classes facilita a implementação da Inversão de Dependências.
export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    /**
     * Etapas da autenticação:
     *
     * 1) Buscar o usuário no banco pelo e-mail;
     * 2) Comparar se a senha salva no banco bate com a senha do param.
     */
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}

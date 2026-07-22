import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

/**
 * - SOLID
 *
 * D -> Inversion Dependency Principle
 *
 * Ao invés da minha classe instanciar as dependências que ela precisa, ela vai receber as dependências como parâmetro.
 *
 * O DIP propõe que as camadas mais altas de uma aplicação não dependam diretamente das camadas mais baixas, mas sim de uma abstração entre elas. Isso permite maior flexibilidade e facilidade de manutenção do código.
 */
export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) { }

  // Separar este código em um use-case é importante pois, atualmente, estamos registrando um usuário via rota HTTP.
  // Ao desacoplar esse código, ele será reutilizável em outras contextos; assim, podemos registrar um usuário de outras formas.
  async execute({ name, email, password }: RegisterUseCaseRequest) {
    // 6 rounds de geração de hash contínuo (um hash é gerado a partir da senha e, a partir desse hash, um novo hash é gerado - repete 6 vezes).
    // Em aplicações de muito tráfego, essa quantidade de rounds causará um consumo alto de processamento; portanto, não é apropriado para esse cenário.
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    // const prismaUsersRepository = new PrismaUsersRepository()

    // Graças à implementação do DIP, não há mais dependência direto do Prisma.
    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}

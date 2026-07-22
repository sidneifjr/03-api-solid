import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

// SOLID
// D -> Inversion Dependency Principle
// Ao invés da minha classe instanciar as dependências que ela precisa, ela vai receber as dependências como parâmetro.
export class RegisterUseCase {
  constructor(private usersRepository: any) { }

  // Separar este código em um use-case é importante pois, atualmente, estamos registrando um usuário via rota HTTP.
  // Ao desacoplar esse código, ele será reutilizável em outras contextos; assim, podemos registrar um usuário de outras formas.
  async execute({ name, email, password }: RegisterUseCaseRequest) {
    // 6 rounds de geração de hash contínuo (um hash é gerado a partir da senha e, a partir desse hash, um novo hash é gerado - repete 6 vezes).
    // Em aplicações de muito tráfego, essa quantidade de rounds causará um consumo alto de processamento; portanto, não é apropriado para esse cenário.
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new Error('E-mail already exists.')
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

import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

// Separar este código em um use-case é importante pois, atualmente, estamos registrando um usuário via rota HTTP.
// Ao desacoplar esse código, ele será reutilizável em outras contextos; assim, podemos registrar um usuário de outras formas.
export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
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

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}

import { compare } from 'bcryptjs'
import type { OrgRepository } from '../../../repositories/org.repository'
import { InvalidCredencialsError } from '../../errors/invalid-credentials'
import jwt from 'jsonwebtoken'
import { env } from '../../../env'

export interface AuthenticateOrgServiceInput {
  email: string
  password: string
}

export interface AuthenticateOrgServiceOutput {
  token: string
}

export class AuthenticateOrgService {
  constructor(private orgRepository: OrgRepository) {}

  async execute(
    data: AuthenticateOrgServiceInput
  ): Promise<AuthenticateOrgServiceOutput> {
    const orgWithExistingEmail = await this.orgRepository.findByEmail(
      data.email
    )

    if (!orgWithExistingEmail) {
      throw new InvalidCredencialsError()
    }

    const isPasswordValid = await compare(
      data.password,
      orgWithExistingEmail.password
    )

    if (!isPasswordValid) {
      throw new InvalidCredencialsError()
    }

    const token = await jwt.sign(
      {
        sub: orgWithExistingEmail.id,
      },
      env.SECRET_KEY,
      { expiresIn: '10m' }
    )

    return { token }
  }
}

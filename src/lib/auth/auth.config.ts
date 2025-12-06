import { PrismaAdapter } from '@auth/prisma-adapter'
import { AuthConfig } from '@auth/core'
import { prisma } from '../db/prisma'

const authConfig: AuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Add providers here
    // For example, EmailProvider for email/password authentication
  ],
  secret: process.env.AUTH_SECRET,
  trustHost: process.env.AUTH_TRUST_HOST === 'true',
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user',
  },
}

export default authConfig
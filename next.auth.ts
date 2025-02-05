import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Mot de passe', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Veuillez fournir un email et un mot de passe.');
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user) {
                    throw new Error('Email ou mot de passe incorrect.');
                }

                const passwordMatch = await bcrypt.compare(credentials.password, user.password);

                if (!passwordMatch) {
                    throw new Error('Email ou mot de passe incorrect.');
                }

                return user;
            }
        })
    ],
    callbacks: {
        async session({ session, token, user }) {
            if (session?.user) {
                session.user.id = token.sub;
                session.user.role = user.role;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login'
    }
});
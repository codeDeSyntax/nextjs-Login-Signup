import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import connectToDatabase from '../../../lib/mongoose';
import User from '@/models/User'

export default NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials: Record<"email" | "password", string> | undefined) => {
        await connectToDatabase();
        if (credentials) {
          const user = await User.findOne({ email: credentials.email });
          if (user && (await user.matchPassword(credentials.password))) {
            return { id: user.id, name: user.name, email: user.email, role: user.role };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session(params: { session: any, token: any, user: any, newSession: any, trigger: any }) {
      const { session, user } = params;
      session.user.id = user.id;
      session.user.role = user.role;
      return session;
    },
    async jwt(params: { token: any, user: any }) {
      const { token, user } = params;
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  secret: process.env.JWT_SECRET,
});

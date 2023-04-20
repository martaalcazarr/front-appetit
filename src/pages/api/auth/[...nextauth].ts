import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      credentials: {
        email: {
          type: 'text',
        },
        password: {
          type: 'text',
        },
      },
      //@ts-ignore
      async authorize(credentials: any) {
        try {
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL || '');
          const user = {
            name: credentials?.name,
            email: credentials?.email,
            image: credentials?.image,
          };
          if (user) {
            return user;
          } else return null;
        } catch (e) {
          console.log(e);
          
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signIn',
  },
};
export default NextAuth(authOptions);

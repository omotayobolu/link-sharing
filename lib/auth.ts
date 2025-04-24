import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDB } from "./db";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid email or password";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new InvalidLoginError();
          }
          let user = null;

          user = await getUserFromDB(
            credentials.email as string,
            credentials.password as string
          );

          if (!user) {
            throw new InvalidLoginError();
          }

          return { id: user.id, email: user.email };
        } catch (error: any) {
          console.error("Authorize error:", error?.message);
          throw new InvalidLoginError();
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;

      return session;
    },
  },
  debug: true,
});

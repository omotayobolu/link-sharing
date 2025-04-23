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

  debug: true,
});

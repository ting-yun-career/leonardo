import { getUsers } from "@/util/user";
import { Awaitable, DefaultSession, Session } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      authorize: async function (credentials) {
        const result = await getUsers();
        console.log("authorize fetch result", result);

        if (result.status === "success") {
          return result?.data[0];
        }

        return null;
      },
    }),
  ],
  callbacks: {
    session({ token }) {
      return token.user as Awaitable<Session | DefaultSession>;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
});

export default handler;

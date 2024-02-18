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

        // what should be done
        // if (result.status === "success") {
        //   const user = result.data?.find((u: any) => u.email == credentials?.email);
        //   return user;
        // } else {
        //   return null;
        // }

        // ... but let's just keep things simple for the demo
        const { id, email } = result.data?.[0] ?? {
          id: "1",
          email: "abc@gmail.com",
        };
        return { id, email };
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

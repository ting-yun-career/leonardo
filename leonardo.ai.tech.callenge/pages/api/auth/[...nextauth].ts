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
      authorize: function (credentials) {
        const users: User[] = [
          {
            id: "1",
            email: "abc@gmail.com",
            password: "123",
            username: "abc",
            title: "SDE",
          },
        ];

        return users[0];
      },
    }),
  ],
  callbacks: {
    session({ session, token, user }) {
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

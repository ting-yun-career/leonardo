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
      authorize: function (credentials) {
        // return { id: "1", name: "aaa", email: "aaa" };
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        if (user) {
          return user;
        } else {
          return null;
        }
        // const result = await getUsers();
        // console.log("authorize fetch result", result);

        // if (result.status === "success") {

        //   console.log(result)
        //   return result?.data?.[0] ?? { id: "1", name: "", email: "" };
        // }

        // return null;
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

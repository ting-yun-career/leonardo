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
        console.log("authorize::credentials::", credentials);
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        // if (user) {
        //   return user;
        // } else {
        //   return null;
        // }

        const result = await getUsers();
        console.log(result);

        // what should be done
        // if (result.status === "success") {
        //   const user = result.data?.find((u: any) => u.email == credentials?.email);
        //   return user;
        // } else {
        //   return null;
        // }

        // what makes demo tester's life easier
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

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "abc" },
        password: { label: "Password", type: "password", placeholder: "123" },
      },
      async authorize(credentials, req) {
        const user = { id: "1", username: "abc", email: "abc@demo.com" };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});

export default handler;

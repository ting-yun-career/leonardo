import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "abc" },
        password: { label: "Password", type: "password", placeholder: "123" },
      },
      async authorize(credentials) {
        const users = [
          { id: "1", username: "abc", password: "123" },
          { id: "2", username: "cdf", password: "123" },
        ];

        return { id: "1", username: "abc", password: "123" };

        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        const user = users.find(
          (u) => u.username === username && u.password === password
        );

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

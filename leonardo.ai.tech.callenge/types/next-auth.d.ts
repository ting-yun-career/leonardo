import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      username: string | null;
      password: string | null;
      title: string | null;
    } & DefaultSession["user"];
  }
}

type User = {
  id: string;
  email: string;
  password: string;
  username?: string | null;
  title?: string | null;
};

type UserContextType = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

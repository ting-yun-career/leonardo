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
  hasProfile?: boolean;
};

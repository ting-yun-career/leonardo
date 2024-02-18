import { createContext, useMemo, useState } from "react";

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => null,
  hasProfile: undefined,
  host: undefined,
  setHost: () => null,
});

interface Props {
  children: React.ReactNode;
}

export function UserContextProvider(props: Props) {
  const [user, setUser] = useState<User>();
  const [host, setHost] = useState<string>();

  const hasProfile = useMemo(() => {
    return Boolean(user?.username || user?.title);
  }, [user]);

  const context = { user, setUser, hasProfile, host, setHost };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

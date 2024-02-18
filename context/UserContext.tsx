import { createContext, useMemo, useState } from "react";

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => null,
  hasProfile: undefined,
});

interface Props {
  children: React.ReactNode;
}

export function UserContextProvider(props: Props) {
  const [user, setUser] = useState<User>();
  const hasProfile = useMemo(
    () => Boolean(user?.username || user?.title),
    [user]
  );

  const context = { user, setUser, hasProfile };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

import { createContext, useState } from "react";

export const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => null,
});

interface Props {
  children: React.ReactNode;
}

export function UserContextProvider(props: Props) {
  const [user, setUser] = useState<User>();

  const context = { user, setUser };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

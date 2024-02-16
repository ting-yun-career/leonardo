import { Button } from "@chakra-ui/button";
import Navigation from "../components/Navigation/Navigation";
import { signIn, useSession } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  const { data: session } = useSession();

  return (
    <>
      {session && <Navigation />}
      <main>{props.children}</main>
    </>
  );
}

export default Layout;

import Link from "next/link";
import classes from "./Navigation.module.css";
import { Button } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";

interface Props {}

function Navigation(props: Props) {
  const { data: session } = useSession();

  return (
    <>
      <header className={classes.header}>
        <Link href="/">Demo</Link>
        <nav>
          <ul>
            <li>
              <Link href="/posts">Posts</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        {!session && (
          <Button colorScheme="green" onClick={() => signIn()}>
            Sign In
          </Button>
        )}
        {session && (
          <Button colorScheme="yellow" onClick={() => signOut()}>
            Sign out
          </Button>
        )}
      </header>
    </>
  );
}
<div></div>;

export default Navigation;

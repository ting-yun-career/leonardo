import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import classes from "./LoginButton.module.css";
import { useEffect, useRef } from "react";

export default function Login() {
  const inputRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <div className={classes.container}>
        <Button
          onClick={() => signIn("Credentials", { callbackUrl: "/" })}
          ref={inputRef}
        >
          Sign In
        </Button>
      </div>
    </>
  );
}

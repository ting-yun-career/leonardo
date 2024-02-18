import { useState, useEffect, useContext } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { UserContext } from "@/context/UserContext";
import { getUser } from "@/components/Home/helper";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext<UserContextType>(UserContext);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      if (user) {
        setIsLoading(false);
        return;
      }

      try {
        const session = await getSession();
        if (session) {
          const user = session as unknown as User;
          // Calling getUser() is required because the session return by getSession() isn't reliable due to caching..
          // This is probably due to JWT token storing user data on client side.

          // There should be some smarter way to go about this, however since next-auth isn't
          // the focus of the demo I'm using a brute force refetch to emulate this behaviour.
          const payload = await getUser(user.id);

          if (payload.status === "success") {
            setUser(payload.data);
          }
          setIsLoading(false);
        } else {
          router.replace("/login");
        }
      } catch (error) {
        router.replace("/login");
      }
    };

    fetchSession();
    return () => {};
  }, [user, router, setUser]);

  return { isLoading };
};

export default useAuth;

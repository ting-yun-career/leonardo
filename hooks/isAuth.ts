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
          // Calling getUser() is required because the session return by getSession() isn't reliable (it returns cached session). On page reload, it
          // returns cached data and does not fetch latest user data from server, which causes stale data to show up after page reload.

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

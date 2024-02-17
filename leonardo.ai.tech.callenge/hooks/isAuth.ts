import { useState, useEffect, useContext } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { UserContext } from "@/context/UserContext";

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
          setUser(session as unknown as User);
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

import useAuth from "@/hooks/isAuth";
import InfoComp from "@/components/Info/Info";

export default function PageInfo() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <InfoComp />;
}

import Head from "next/head";
import HomeComp from "@/components/Home/Home";
import useAuth from "@/hooks/isAuth";

export default function Root() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>Leonardo.AI Challenge {`>`} Home</title>
      </Head>
      <HomeComp />
    </>
  );
}

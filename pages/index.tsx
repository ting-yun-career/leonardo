import Head from "next/head";
import HomeComp from "@/components/Home/Home";
import useAuth from "@/hooks/isAuth";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function Root(props: any) {
  const { setHost } = useContext(UserContext);

  setHost(props.host);

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

export async function getStaticProps() {
  return {
    props: {
      host: process.env.host,
    },
  };
}

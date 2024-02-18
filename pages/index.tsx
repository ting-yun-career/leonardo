import Head from "next/head";
import HomeComp from "@/components/Home/Home";
import useAuth from "@/hooks/isAuth";

export default function Root(props: any) {
  console.log(props);

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
      server: process.env.VERCEL_URL,
    },
  };
}

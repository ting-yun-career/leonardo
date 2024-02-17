import Head from "next/head";
import { Inter } from "next/font/google";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { UserContext } from "@/context/UserContext";
import HomeComp from "@/components/Home/Home";
import useAuth from "@/hooks/isAuth";

const inter = Inter({ subsets: ["latin"] });

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

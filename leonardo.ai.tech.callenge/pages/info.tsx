import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { UserContext } from "@/context/UserContext";
import Home from "@/components/Home/Home";

export default function Info() {
  const [isLoading, setIsLoading] = useState(true);

  return <>{isLoading ? <p>...Loading</p> : <Info />}</>;
}

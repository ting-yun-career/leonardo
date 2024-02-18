import Head from "next/head";
import HomeComp from "@/components/Home/Home";
import useAuth from "@/hooks/isAuth";
import { Card, Center, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

export default function Root() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <Center height="calc(100vh - 75px)">
        <Card minWidth={{ base: "10rem", sm: "20rem" }} p="2rem">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Card>
      </Center>
    );
  }

  return (
    <>
      <Head>
        <title>Leonardo.AI Challenge | Home</title>
      </Head>
      <HomeComp />
    </>
  );
}

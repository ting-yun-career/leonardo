import useAuth from "@/hooks/isAuth";
import InfoComp from "@/components/Info/Info";
import { Box, Skeleton, Stack } from "@chakra-ui/react";
import Head from "next/head";

interface Props {
  countries: Country[];
}

export default function PageInfo(props: Props) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box w="75%" ml="auto" mr="auto" pt="1rem" maxWidth="50rem">
        <Stack>
          <Skeleton height="5rem" mt="2rem" />
          <Skeleton height="5rem" mt="1rem" />
          <Skeleton height="5rem" mt="1rem" />
          <Skeleton height="5rem" mt="1rem" />
        </Stack>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>Leonardo.AI Challenge | Information</title>
      </Head>
      <InfoComp countries={props.countries as Country[]} />
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.host}/api/info`);
  const payload = await res.json();

  return {
    props: {
      countries: payload.data,
    },
  };
}

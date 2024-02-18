import { setHostUrl } from "@/context/host";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document(props: any) {
  setHostUrl(props.host);

  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
export async function getStaticProps() {
  return {
    props: {
      host: process.env.host,
    },
  };
}

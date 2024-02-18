import useAuth from "@/hooks/isAuth";
import InfoComp from "@/components/Info/Info";

interface Props {
  payload: any;
}

export default function PageInfo(props: Props) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const { status, data, error } = props.payload;

  if (status === "error") {
    return <p>Error: {error}</p>;
  }

  return <InfoComp data={data} />;
}

export async function getStaticProps() {
  console.log(process.env.host);

  const res = await fetch(`${process.env.host}/api/info`);

  const payload = await res.json();

  return {
    props: {
      payload,
    },
  };
}

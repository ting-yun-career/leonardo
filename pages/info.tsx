import useAuth from "@/hooks/isAuth";
import InfoComp from "@/components/Info/Info";

interface Props {
  countries: Country[];
}

export default function PageInfo(props: Props) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <InfoComp countries={props.countries as Country[]} />;
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

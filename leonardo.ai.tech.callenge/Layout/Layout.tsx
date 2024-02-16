import Navigation from "../components/Navigation/Navigation";

interface Props {
  children: React.ReactNode;
}

function Layout(props: Props) {
  return (
    <>
      <Navigation />
      <main>{props.children}</main>
    </>
  );
}

export default Layout;

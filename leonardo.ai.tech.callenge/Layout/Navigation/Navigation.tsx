import Link from "next/link";
import classes from "./Navigation.module.css";

interface Props {}

function Navigation(props: Props) {
  return (
    <>
      <header className={classes.header}>
        <Link href="/">Demo</Link>
        <nav>
          <ul>
            <li>
              <Link href="/posts">Posts</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navigation;

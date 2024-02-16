import Link from "next/link";
import classes from "./Navigation.module.css";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { ExternalLinkIcon, HamburgerIcon } from "@chakra-ui/icons";

interface Props {}

function Navigation(props: Props) {
  return (
    <>
      <header className={classes.header}>
        <nav className={classes.links}>
          <Link href="/">Demo</Link>
          <Link href="/info">Information</Link>
        </nav>
        <div className={classes.menu}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <MenuItem icon={<ExternalLinkIcon />} onClick={() => signOut()}>
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </header>
    </>
  );
}
<div></div>;

export default Navigation;

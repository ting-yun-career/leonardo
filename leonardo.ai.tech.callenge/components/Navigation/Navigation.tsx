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
import { ExternalLinkIcon, HamburgerIcon, InfoIcon } from "@chakra-ui/icons";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

interface Props {}

function Navigation(props: Props) {
  const { hasProfile } = useContext<UserContextType>(UserContext);

  return (
    <>
      <header className={classes.header}>
        <nav className={classes.links}>
          <Link href="/">Demo</Link>
          {hasProfile && <Link href="/info">Information</Link>}
        </nav>
        <div className={classes.menu}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Navigation Menu"
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

export default Navigation;

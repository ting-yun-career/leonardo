import Link from "next/link";
import classes from "./Navigation.module.css";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useSize } from "@chakra-ui/react-use-size";
import { signOut } from "next-auth/react";
import { ExternalLinkIcon, HamburgerIcon, InfoIcon } from "@chakra-ui/icons";
import { UserContext } from "@/context/UserContext";
import { useContext, useRef } from "react";
import { useRouter } from "next/router";

function Navigation() {
  const router = useRouter();
  const { hasProfile } = useContext<UserContextType>(UserContext);

  const elementRef = useRef<HTMLDivElement>(null);
  const { width } = useSize(elementRef) ?? { width: window.innerWidth };

  const breakWidth = 300; // navigation break threshold

  const ShortMenuItemList = (
    <>
      <MenuItem icon={<ExternalLinkIcon />} onClick={() => signOut()}>
        Sign out
      </MenuItem>
    </>
  );

  const LongMenuItemList = (
    <>
      <MenuItem as="a" href="/info" icon={<InfoIcon />}>
        Home
      </MenuItem>
      {hasProfile && (
        <MenuItem as="a" href="/info" icon={<InfoIcon />}>
          Information
        </MenuItem>
      )}
      <MenuItem icon={<ExternalLinkIcon />} onClick={() => signOut()}>
        Sign out
      </MenuItem>
    </>
  );

  return (
    <>
      <header
        ref={elementRef}
        className={classes.header}
        style={{
          justifyContent: width > breakWidth ? "flex-start" : "flex-end",
        }}
      >
        {width > breakWidth && (
          <nav className={classes.links}>
            <Link href="/" className={router.pathname == "/" ? "active" : ""}>
              Home
            </Link>
            {hasProfile && (
              <Link
                href="/info"
                className={router.pathname == "/info" ? "active" : ""}
              >
                Information
              </Link>
            )}
          </nav>
        )}
        <div>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Navigation Menu"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              {width > breakWidth ? ShortMenuItemList : LongMenuItemList}
            </MenuList>
          </Menu>
        </div>
      </header>
    </>
  );
}

export default Navigation;

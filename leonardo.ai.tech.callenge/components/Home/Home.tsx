import { UserContext } from "@/context/UserContext";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Center,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";

export default function Home() {
  const { user, setUser, hasProfile } =
    useContext<UserContextType>(UserContext);

  return (
    <Center height="calc(100vh - 75px)">
      {/* 100vh - height of the nav header*/}
      <Card minWidth={{ base: "10rem", sm: "20rem" }}>
        <CardHeader>
          <Heading size="md">Profile</Heading>
        </CardHeader>
        <CardBody>
          {hasProfile ? (
            <>
              <Text>
                Username: <Text as="b">{user?.username ?? "N/A"}</Text>
              </Text>
              <Text>
                Job Title: <Text as="b">{user?.title ?? "N/A"}</Text>
              </Text>
            </>
          ) : (
            <Text>No Profile</Text>
          )}
        </CardBody>
        <CardFooter>
          <Button onClick={() => {}}>
            {hasProfile ? `Update Profile` : `Add Profile`}
          </Button>
        </CardFooter>
      </Card>
    </Center>
  );
}

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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { saveUser } from "./helper";

export default function HomeComp() {
  const { user, hasProfile } = useContext<UserContextType>(UserContext);
  const [modalData, setModalData] = useState<Partial<User>>({});

  // Username Modal
  const {
    isOpen: isOpenUsername,
    onOpen: onOpenUsername,
    onClose: onCloseUsername,
  } = useDisclosure();

  const onUsernameChange = (username: string) => {
    setModalData({ ...modalData, username });
  };

  const onUsernameSave = () => {
    onCloseUsername();
    onOpenTitle();
  };

  // Job Title Modal
  const {
    isOpen: isOpenTitle,
    onOpen: onOpenTitle,
    onClose: onCloseTitle,
  } = useDisclosure();

  const onTitleChange = (title: string) => {
    setModalData({ ...modalData, title });
  };

  const onTitleSave = () => {
    onCloseTitle();
    saveUser({ ...user, ...modalData } as User);
  };

  return (
    <>
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
                  Username: <Text as="b">{user?.username}</Text>
                </Text>
                <Text>
                  Job Title: <Text as="b">{user?.title}</Text>
                </Text>
              </>
            ) : (
              <Text>No Profile</Text>
            )}

            <div>{JSON.stringify(modalData)}</div>
          </CardBody>
          <CardFooter>
            <Button
              onClick={() => {
                onOpenUsername();
              }}
            >
              {hasProfile ? `Update Profile` : `Add Profile`}
            </Button>
          </CardFooter>
        </Card>
      </Center>

      <Modal isOpen={isOpenUsername} onClose={onCloseUsername} isCentered>
        <ModalOverlay />
        <ModalContent pb="1rem">
          <ModalHeader>Enter Username</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                onChange={(e) => onUsernameChange(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => onUsernameSave()}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenTitle} onClose={onCloseTitle} isCentered>
        <ModalOverlay />
        <ModalContent pb="1rem">
          <ModalHeader>Enter Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                onChange={(e) => onTitleChange(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => onTitleSave()}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

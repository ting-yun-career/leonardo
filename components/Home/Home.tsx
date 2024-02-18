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
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { saveUser } from "./helper";

export default function HomeComp() {
  const { user, setUser, hasProfile, host } =
    useContext<UserContextType>(UserContext);

  const [username, setUsername] = useState(user?.username);
  const [title, setTitle] = useState(user?.title);
  const [blockModalOpen, setBlockModalOpen] = useState(false);

  const toast = useToast();

  // Username Modal
  const {
    isOpen: isOpenUsername,
    onOpen: onOpenUsername,
    onClose: onCloseUsername,
  } = useDisclosure();

  const usernameInputRef = useRef(null);

  const onUsernameChange = (username: string) => {
    setUsername(username);
  };

  const onUsernameSave = () => {
    fetch(`${host}/api/hello`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    return;

    onCloseUsername();
    saveUser({ ...user, username } as User)
      .then((payload) => {
        if (payload.status === "success") {
          setUser(payload.data);
          toast({
            description: "Data saved",
            status: "success",
            duration: 1000,
          });

          setBlockModalOpen(true);
          setTimeout(() => {
            onOpenTitle();
            setBlockModalOpen(false);
          }, 1000);
        } else {
          setUsername(user?.username);
          toast({
            description: "Data not saved",
            status: "error",
            duration: 2000,
          });
        }
      })
      .catch(() => {
        setUsername(user?.username);
        toast({
          description: "Data not saved",
          status: "error",
          duration: 2000,
        });
      });
  };

  // Job Title Modal
  const {
    isOpen: isOpenTitle,
    onOpen: onOpenTitle,
    onClose: onCloseTitle,
  } = useDisclosure();

  const titleInputRef = useRef(null);
  const modalTriggerRef = useRef(null);

  const onTitleChange = (title: string) => {
    setTitle(title);
  };

  const onTitleSave = () => {
    onCloseTitle();
    saveUser({ ...user, title } as User)
      .then((payload) => {
        if (payload.status === "success") {
          setUser(payload.data);
          toast({
            description: "Data saved",
            status: "success",
            duration: 1000,
          });
        } else {
          setTitle(user?.title);
          toast({
            description: "Data not saved",
            status: "error",
            duration: 2000,
          });
        }
      })
      .catch(() => {
        setTitle(user?.title);
        toast({
          description: "Data not saved",
          status: "error",
          duration: 2000,
        });
      });
  };

  useEffect(() => {
    if (!hasProfile) {
      onOpenUsername();
    }
  }, []);

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
          </CardBody>
          <CardFooter>
            <Button
              autoFocus={true}
              ref={modalTriggerRef}
              isLoading={blockModalOpen}
              onClick={() => {
                onOpenUsername();
              }}
            >
              {hasProfile ? `Update Profile` : `Add Profile`}
            </Button>
          </CardFooter>
        </Card>
      </Center>

      <Modal
        initialFocusRef={usernameInputRef}
        finalFocusRef={modalTriggerRef}
        isOpen={isOpenUsername}
        onClose={() => {
          onCloseUsername();
          setUsername(user?.username);
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent pb="1rem">
          <ModalHeader>Enter Username</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                ref={usernameInputRef}
                focusBorderColor="gray.600"
                value={username ?? ""}
                onChange={(e) => onUsernameChange(e.target.value)}
                autoComplete="off"
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

      <Modal
        initialFocusRef={titleInputRef}
        finalFocusRef={modalTriggerRef}
        isOpen={isOpenTitle}
        onClose={() => {
          onCloseTitle();
          setTitle(user?.title);
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent pb="1rem">
          <ModalHeader>Enter Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                ref={titleInputRef}
                focusBorderColor="gray.600"
                value={title ?? ""}
                onChange={(e) => onTitleChange(e.target.value)}
                autoComplete="off"
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

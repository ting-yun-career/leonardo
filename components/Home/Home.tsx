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
  const { user, setUser, hasProfile } =
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
    onCloseUsername();
    setBlockModalOpen(true);

    saveUser({ ...user, username } as User)
      .then((payload) => {
        if (payload.status === "success") {
          delete payload.data._id;
          setUser(payload.data);
          toast({
            description: "Data saved",
            status: "success",
            duration: 1000,
          });

          setTimeout(() => {
            onOpenTitle();
            setBlockModalOpen(false);
          }, 1000);
        } else {
          throw "Data not saved";
        }
      })
      .catch(() => {
        setUsername(user?.username);
        setBlockModalOpen(false);
        toast({
          description: "Data not saved",
          status: "error",
          duration: 2000,
        });
      });
  };

  // Job Title Modal
  // (This piece and Modal template code is 80% simliar to above and is a good candidate for reusable abstraction, however, it's
  // for demo purpose and is limited to scope of this file so effort doesn't overweight benefits of
  // patterning it, but I am aware of it)
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
    setBlockModalOpen(true);
    saveUser({ ...user, title } as User)
      .then((payload) => {
        if (payload.status === "success") {
          setUser(payload.data);
          setBlockModalOpen(false);
          toast({
            description: "Data saved",
            status: "success",
            duration: 1000,
          });
        } else {
          throw "Data not saved";
        }
      })
      .catch(() => {
        setTitle(user?.title);
        setBlockModalOpen(false);
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
  }, []); // this is intentional, as this ensures wrapped code is triggered only until refresh.

  return (
    <>
      <Center height="calc(100vh - 75px)">
        {/* 100vh - height of the nav header*/}
        <Card
          minWidth={{ base: "10rem", sm: "20rem" }}
          role="region"
          aria-label={hasProfile ? "User Profile" : "No Profile"}
        >
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
              aria-label={hasProfile ? "Update Profile" : "Add Profile"}
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

import {
  Text,
  SimpleGrid,
  Box,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Heading,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  countries: Country[];
}

export default function InfoComp({ countries }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const showCountryModal = (country: Country) => {
    setSelectedCountry(country);
    onOpen();
  };

  return (
    <>
      <Box height="calc(100vh - 75px)">
        <Box w="75%" ml="auto" mr="auto" pt="1rem" maxWidth="50rem">
          <Heading size="md" mb="1rem">
            Information
          </Heading>
          <SimpleGrid minChildWidth="120px" spacing="1rem">
            {countries?.length > 0 ? (
              countries.map((country, index) => (
                <Button
                  autoFocus={index === 0}
                  key={country.code}
                  height="5rem"
                  borderWidth="1px"
                  borderRadius="lg"
                  justifyContent="center"
                  alignItems="center"
                  whiteSpace="wrap"
                  _hover={{
                    background: "#eee",
                    cursor: "pointer",
                  }}
                  sx={{
                    background:
                      country.code === selectedCountry?.code ? "#eee" : "none",
                  }}
                  onClick={() => {
                    showCountryModal(country);
                  }}
                  p="0.5rem"
                >
                  {country.name}
                </Button>
              ))
            ) : (
              <Button>No Countries Info</Button>
            )}
          </SimpleGrid>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent pb="1rem">
          <ModalHeader>{selectedCountry?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Country Code: <Text as="b">{selectedCountry?.code}</Text>
            </Text>
            <Text>
              Capital: <Text as="b">{selectedCountry?.capital}</Text>
            </Text>
            <Text>
              Languages:{" "}
              <Text as="b">{selectedCountry?.languages.join(", ")}</Text>
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

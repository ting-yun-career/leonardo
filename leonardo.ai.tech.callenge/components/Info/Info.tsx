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
} from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  data: any;
}

type Country = {
  name: string;
  code: string;
  capital: string;
  languages: Array<string>;
};

export default function InfoComp({ data }: Props) {
  const countries = data as Array<Country>;

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
            {countries.map((country) => (
              <Flex
                key={country.code}
                height="5rem"
                borderWidth="1px"
                borderRadius="lg"
                justifyContent="center"
                alignItems="center"
                _hover={{
                  background: "#ddd",
                  cursor: "pointer",
                }}
                sx={{
                  background:
                    country.code === selectedCountry?.code ? "#ddd" : "none",
                }}
                onClick={() => {
                  showCountryModal(country);
                }}
                p="0.5rem"
              >
                <Text textAlign="center">{country.name}</Text>
              </Flex>
            ))}
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

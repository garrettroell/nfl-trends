import { Button, Heading, HStack, Link } from "@chakra-ui/react";
import { FiGithub } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <HStack
      maxW="500px"
      m="auto"
      height="50px"
      justify="space-between"
      px="10px"
    >
      <Heading fontSize="16px">
        <Link
          href="https://garrettroell.com"
          _hover={{ color: "#0070f3" }}
          isExternal
        >
          Garrett Roell {currentYear}
        </Link>
      </Heading>
      <HStack>
        <Link href="https://github.com/garrettroell/nfl-trends" isExternal>
          <Button variant="outline">
            <FiGithub />
          </Button>
        </Link>
      </HStack>
    </HStack>
  );
};

export default Footer;

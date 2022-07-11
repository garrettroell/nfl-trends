import { Button, Heading, HStack, Link } from "@chakra-ui/react";
import { FiGithub } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <HStack
      width="500px"
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
        {/* <Button onClick={toggleColorMode} variant="outline">
          {colorMode === "light" ? (
            <MoonIcon w={4} h={4} p="0" color="white" />
          ) : (
            <SunIcon w={4} h={4} px="0" />
          )}
        </Button> */}
      </HStack>
    </HStack>
  );
};

export default Footer;

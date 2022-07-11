import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useColorMode, Button, Heading, HStack } from "@chakra-ui/react";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack maxW="500px" w="100%" m="auto" p="10px" justify="space-between">
      <Heading fontSize="2xl">Fantasy Visualizer</Heading>
      <Button onClick={toggleColorMode} variant="outline">
        {colorMode === "light" ? (
          <MoonIcon w={4} h={4} p="0" />
        ) : (
          <SunIcon w={4} h={4} px="0" />
        )}
      </Button>
    </HStack>
  );
};

export default NavBar;

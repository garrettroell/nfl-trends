import { useColorMode } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Heading, HStack } from "@chakra-ui/react";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack minW="500px" m="auto" py="10px" justify="space-between">
      <Heading fontSize="2xl">Fantasy Visualizer</Heading>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </HStack>
  );
};

export default NavBar;

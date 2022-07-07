import { Button, HStack } from "@chakra-ui/react";

const PositionSelector = ({ position, setPosition }) => {
  return (
    <>
      <HStack gap="20px">
        <Button
          variant={position === "QB" ? "solid" : "ghost"}
          onClick={() => setPosition("QB")}
        >
          QB
        </Button>
        <Button
          variant={position === "RB" ? "solid" : "ghost"}
          onClick={() => setPosition("RB")}
        >
          RB
        </Button>
        <Button
          variant={position === "WR" ? "solid" : "ghost"}
          onClick={() => setPosition("WR")}
        >
          WR
        </Button>
        <Button
          variant={position === "TE" ? "solid" : "ghost"}
          onClick={() => setPosition("TE")}
        >
          TE
        </Button>
      </HStack>
    </>
  );
};

export default PositionSelector;

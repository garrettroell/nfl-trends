import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "../components/Navbar";
import PlayerList from "../components/PlayerList";
import PositionSelector from "../components/PositionSelector";

export default function Home() {
  const [position, setPosition] = useState("QB");
  return (
    <>
      <VStack maxW="500px" m="auto" align="center">
        <NavBar />
        <PositionSelector position={position} setPosition={setPosition} />
        <PlayerList position={position} />
      </VStack>
    </>
  );
}

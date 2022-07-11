import { Spacer } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useRef, useState } from "react";
import AllPlayerGraph from "../components/AllPlayerGraph";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import PlayerList from "../components/PlayerList";
import PositionSelector from "../components/PositionSelector";

export default function Home() {
  const [position, setPosition] = useState("QB");
  const accordionElement = useRef();

  return (
    <>
      <Head>
        <title>NFL Fantasy Trends</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <VStack maxW="500px" m="auto" align="center">
        <NavBar />
        <PositionSelector position={position} setPosition={setPosition} />
        <AllPlayerGraph
          position={position}
          accordionElement={accordionElement}
        />
        <PlayerList position={position} accordionElement={accordionElement} />
        <Box h="20px" />
      </VStack>
      <Footer />
    </>
  );
}

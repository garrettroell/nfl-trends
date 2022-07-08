import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

import fantasyData from "../data/fantasy_player_data.json";

const PlayerList = ({ position }) => {
  const lastYearPositionData = fantasyData["2021"][position];
  console.log(lastYearPositionData);
  return (
    <>
      <Accordion w="100%" allowMultiple allowToggle>
        {lastYearPositionData.map((player, index) => {
          return (
            <AccordionItem w="100%" key={index}>
              <h2>
                <AccordionButton w="100%">
                  <Box flex="1" textAlign="left">
                    {player.player}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {player.fantasy_points_ppr} <br></br>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default PlayerList;

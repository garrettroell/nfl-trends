import { Box, HStack, Text, VStack } from "@chakra-ui/react";

import fantasyData from "../data/fantasy_player_data.json";

const PlayerList = ({ position }) => {
  // console.log(fantasyData);
  const lastYearPositionData = fantasyData["2021"][position];
  console.log(lastYearPositionData);
  return (
    <>
      <VStack w="100%" maxW="400px">
        {lastYearPositionData.map((player, index) => {
          return (
            <HStack key={index} w="100%" justify="space-between">
              <Text>{player.player}</Text>
              <Text>{player.fantasy_points_ppr}</Text>
            </HStack>
          );
        })}
      </VStack>
    </>
  );
};

export default PlayerList;

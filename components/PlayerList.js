import {
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
} from "@chakra-ui/react";

import fantasySeasonData from "../data/player_season_stats_by_season.json";
import fantasyGameStats from "../data/player_stats_by_player.json";
import PlayerDetailPanel from "./PlayerDetailPanel";

const PlayerList = ({ position, accordionElement }) => {
  const lastYearPositionData = fantasySeasonData["2021"][position];

  return (
    <>
      <Accordion w="100%" ref={accordionElement} allowMultiple allowToggle>
        {lastYearPositionData.map((player, index) => {
          let playerName = player.player;
          playerName = playerName.replace("&#39;", "'");
          return (
            <AccordionItem w="100%" key={index}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton w="100%" h="40px">
                      <Box flex="1" textAlign="left">
                        <Heading fontSize="md">{playerName}</Heading>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <PlayerDetailPanel
                    isExpanded={isExpanded}
                    player={player}
                    playerGames={fantasyGameStats}
                  />
                </>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default PlayerList;

import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

import fantasySeasonData from "../data/player_season_stats_by_season.json";
import fantasyGameStats from "../data/player_stats_by_player.json";
import PlayerDetailPanel from "./PlayerDetailPanel";

const PlayerList = ({ position }) => {
  const lastYearPositionData = fantasySeasonData["2021"][position];
  // const allValueArray = [...Array(lastYearPositionData.length).keys()];
  // console.log();
  return (
    <>
      <Accordion w="100%" allowMultiple allowToggle>
        {lastYearPositionData.map((player, index) => {
          let playerName = player.player;
          playerName = playerName.replace("&#39;", "'");
          return (
            <AccordionItem w="100%" key={index}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton w="100%">
                      <Box flex="1" textAlign="left">
                        {playerName}
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

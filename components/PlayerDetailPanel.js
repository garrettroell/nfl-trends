import { AccordionPanel } from "@chakra-ui/react";
import PastPerformanceGraph from "./PastPerformanceGraph";

const PlayerDetailPanel = ({ player, playerGames, isExpanded }) => {
  return (
    <>
      <AccordionPanel pb={4}>
        {isExpanded ? (
          <PastPerformanceGraph
            isExpanded={isExpanded}
            pastData={playerGames[player.playerId]}
          />
        ) : (
          <></>
        )}
      </AccordionPanel>
    </>
  );
};

export default PlayerDetailPanel;

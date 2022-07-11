import { useState } from "react";
import fantasyGameStats from "../data/player_stats_by_player.json";
import { removeLinebreaks } from "../helpers/removeLinebreaks";

// Function opens player details and focuses it
function openPlayerDetails(playerName, accordionElement) {
  if (accordionElement.current) {
    Array.from(accordionElement.current.children).forEach((node) => {
      // this is need for safari to match player name
      const nodePlayerName = removeLinebreaks(node.innerText);
      if (playerName === nodePlayerName) {
        const nameButtonNode = node.children[0].children[0];
        nameButtonNode.click();
        nameButtonNode.focus();
        // nameButtonNode.blur();
        nameButtonNode.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  }
}

const AllPlayerGraphLine = ({
  string,
  playerId,
  setFocusPlayer,
  accordionElement,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // get the player's name
  const firstWeek = Object.keys(fantasyGameStats[playerId][2021])[0];
  let playerName = fantasyGameStats[playerId][2021][firstWeek].player_name;
  playerName = playerName.replace("&#39;", "'");

  return (
    <polyline
      fill="none"
      stroke={isHovered ? "red" : "currentColor"}
      strokeWidth="1"
      points={string}
      opacity={isHovered ? "1" : "0.3"}
      onMouseEnter={() => {
        setFocusPlayer(playerName);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setFocusPlayer("");
        setIsHovered(false);
      }}
      onClick={() => {
        openPlayerDetails(playerName, accordionElement);
      }}
    />
  );
};

export default AllPlayerGraphLine;

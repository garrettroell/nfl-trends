import { useState } from "react";
import fantasyGameStats from "../data/player_stats_by_player.json";

// Function opens player details and focuses it
function openPlayerDetails(playerName, accordionElement) {
  if (accordionElement.current) {
    Array.from(accordionElement.current.children).forEach((node) => {
      if (playerName === node.innerText) {
        const nameButtonNode = node.children[0].children[0];
        nameButtonNode.click();
        nameButtonNode.focus();
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

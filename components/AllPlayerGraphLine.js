import { useState } from "react";
import fantasyGameStats from "../data/player_stats_by_player.json";

const AllPlayerGraphLine = ({ string, playerId, setFocusPlayer }) => {
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
        console.log(playerId);
        setFocusPlayer(playerName);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setFocusPlayer("");
        setIsHovered(false);
      }}
    />
  );
};

export default AllPlayerGraphLine;

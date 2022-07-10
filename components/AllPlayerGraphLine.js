import { Box } from "@chakra-ui/react";
import { useState } from "react";

const AllPlayerGraphLine = ({ string }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <polyline
      fill="none"
      stroke={isHovered ? "red" : "currentColor"}
      strokeWidth="1"
      points={string}
      opacity={isHovered ? "1" : "0.3"}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    />
  );
};

export default AllPlayerGraphLine;

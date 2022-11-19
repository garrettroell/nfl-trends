import {
  AspectRatio,
  Box,
  Heading,
  HStack,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
import fantasySeasonData from "../data/player_season_stats_by_season.json";
import fantasyGameStats from "../data/player_stats_by_player.json";
import { ensureOdd } from "../helpers/ensureOdd";
import { gameDataToFantasyPoints } from "../helpers/gameDataToFantasyPoints";
import savitzkyGolay from "../helpers/sgFilter";
import AllPlayerGraphLine from "./AllPlayerGraphLine";

// A function to convert game data to an array of objects that can be plotted
function getPlottableData(playerData) {
  let plottableData = [];

  // loop over each year getting the weeks from each year
  for (const year of [2018, 2019, 2020, 2021]) {
    // account for the 17 game seasons starting in 2021
    let lastWeek;
    if (year >= 2021) {
      lastWeek = 17;
    } else {
      lastWeek = 16;
    }

    // loop over the relevant weeks from a single year
    for (let weekNum = 1; weekNum <= lastWeek; weekNum += 1) {
      // if the player played no games in a year
      if (!playerData[year]) {
        playerData[year] = {};
      }

      // get the player's data from that week
      const gameData = playerData[year][`week ${weekNum}`];

      // convert the game data to fantasy points
      let fantasyPoints;
      if (!gameData) {
        fantasyPoints = "no data";
      } else {
        fantasyPoints = gameDataToFantasyPoints(gameData, 0.5);
      }

      // add data point to array
      plottableData.push({
        year: year,
        weekNum: parseInt(weekNum),
        fantasyPoints: fantasyPoints,
      });
    }
  }

  // get the first index that has data
  let firstIndex = plottableData.length - 1;
  plottableData.forEach((game, index) => {
    if (game.fantasyPoints !== "no data" && index < firstIndex) {
      firstIndex = index;
    }
  });

  // make an array of data to pass to smoothing function
  let dataToSmooth = [];
  for (let index = firstIndex; index < plottableData.length; index++) {
    if (plottableData[index].fantasyPoints === "no data") {
      dataToSmooth = [...dataToSmooth, 0];
    } else {
      dataToSmooth = [...dataToSmooth, plottableData[index].fantasyPoints];
    }
  }

  // window size will be between 5 and 25 based on number of games
  let windowSize = Math.min(25, ensureOdd(dataToSmooth.length));
  windowSize = Math.max(5, windowSize);

  let options = {
    windowSize: windowSize,
    derivative: 0,
    polynomial: 2,
    pad: "pre",
    padValue: "symmetric",
  };

  // only plot players with more than 3 games
  if (dataToSmooth.length > 3) {
    let smoothedData = savitzkyGolay(dataToSmooth, 1, options);

    // replace negative values with zeros
    smoothedData = smoothedData.map((val) => Math.max(val, 0));

    // temporarily set arbitrary max value
    const maxValue = 30;
    const numPoints = 65;

    // convert to svg coordinates
    const coordinates = smoothedData.map((dataPoint, index) => {
      const xValue = (200 / numPoints) * (index + firstIndex);
      const yValue = (92 / maxValue) * (maxValue - dataPoint);
      return `${xValue},${yValue}`;
    });

    const svgString = coordinates.join(" ");

    return svgString;
  }

  return "";
}

const AllPlayerGraph = ({ position, accordionElement }) => {
  const [focusPlayer, setFocusPlayer] = useState("");
  const lastYearPositionData = fantasySeasonData["2021"][position];

  const playerIds = lastYearPositionData.map((player) => player.playerId);

  // get the svg string for each player
  let svgStrings = {};

  playerIds.forEach((playerId) => {
    let playerData = fantasyGameStats[playerId];
    if (getPlottableData(playerData).length > 0) {
      svgStrings[playerId] = getPlottableData(playerData);
    }
  });

  return (
    <>
      <VStack
        w="100%"
        // h="238px"
      >
        <HStack w="100%" h="100%">
          {/* y axis label */}
          <Box w="30px">
            <Heading
              fontSize="sm"
              transform="rotate(270deg) translateY(-60px)"
              maxH="30px"
              minW="150px"
              m="0"
              textAlign="center"
            >
              Fantasy Points
            </Heading>
          </Box>
          {/* main plotting area */}
          <Box
            w="100%"
            h="100%"
            borderLeft="2px solid"
            borderBottom="2px solid"
            position="relative"
          >
            <AspectRatio
              w="100%"
              ratio={200 / 92}
              position="relative"
              top="0px"
              left="0px"
            >
              {/* <Box w="100%" h="100%" position="absolute" top="0px" left="0px"> */}
              <svg viewBox="0 0 200 92">
                {Object.keys(svgStrings).map((playerId, index) => {
                  return (
                    <AllPlayerGraphLine
                      playerId={playerId}
                      string={svgStrings[playerId]}
                      setFocusPlayer={setFocusPlayer}
                      accordionElement={accordionElement}
                      key={index}
                    />
                  );
                })}
              </svg>
            </AspectRatio>

            {/* y axis label */}
            <Box
              position="absolute"
              top="-4px"
              left="-40px"
              w="40px"
              textAlign="right"
            >
              <Heading fontSize="14px">{30} -</Heading>
            </Box>
          </Box>
        </HStack>
        {/* x axis label */}
        <Box w="100%" textAlign="right">
          <HStack justify="space-between" w="calc(100% - 35px)" ml="auto">
            <Heading fontSize="sm">2018</Heading>
            <Heading fontSize="sm">2019</Heading>
            <Heading fontSize="sm">2020</Heading>
            <Heading fontSize="sm">2021</Heading>
            <Heading fontSize="sm"></Heading>
          </HStack>
        </Box>
      </VStack>
      {/* player name here */}
      <Box h="25px">
        <Heading fontSize="lg">{focusPlayer}</Heading>
      </Box>

      <Spacer h="20px" />
    </>
  );
};

export default AllPlayerGraph;

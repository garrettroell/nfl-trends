import {
  Tooltip,
  HStack,
  VStack,
  Heading,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { gameDataToFantasyPoints } from "../helpers/gameDataToFantasyPoints";
import { roundUpToNearestFive } from "../helpers/roundUpToNearestFive";
import savitzkyGolay from "../helpers/sgFilter";

// A function to convert game data to an array of objects that can be plotted
function getPlottableData(firstYear, firstWeek, pastData) {
  let plottableData = [];

  // only go as far back as to 2018
  firstYear = Math.max(firstYear, 2018);

  // get the years from the first year until 2021
  let mostRecentYear = 2021;
  let relevantYears = [...Array(1 + mostRecentYear - firstYear).keys()].map(
    (diff) => firstYear + diff
  );

  // loop over each year getting the weeks from each year
  for (const year of relevantYears) {
    let startingWeek;
    let lastWeek;

    // if its the players first season, start their data with the first week they played
    if (year === firstYear) {
      startingWeek = firstWeek.split("week ")[1];
    } else {
      startingWeek = 1;
    }

    // account for the 17 game season in 2021
    if (year >= 2021) {
      lastWeek = 17;
    } else {
      lastWeek = 16;
    }

    // loop over the relevant weeks from a single year
    for (let weekNum = startingWeek; weekNum <= lastWeek; weekNum++) {
      // if the player played no games in a year
      if (!pastData[year]) {
        pastData[year] = {};
      }

      // get the player's data from that week
      const gameData = pastData[year][`week ${weekNum}`];

      // convert the game data to fantasy points
      let fantasyPoints;
      if (!gameData) {
        fantasyPoints = 0;
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

  // calculate the max fantasy points the player has scored since 2018 (rounded up to nearest 5)
  const allPointValues = plottableData.map((game) => game.fantasyPoints);
  let maxPointValue = Math.max(...allPointValues);
  maxPointValue = roundUpToNearestFive(maxPointValue);

  // add the percentOfMax value to each data point to help with plotting
  plottableData = plottableData.map((game) => {
    return {
      ...game,
      percentOfMax: 100 * (game.fantasyPoints / maxPointValue),
    };
  });

  // return data array and the max fantasy point value
  return [plottableData, maxPointValue];
}

const PastPerformanceGraph = ({ pastData }) => {
  const pointColor = useColorModeValue("gray.800", "white");
  const lineColor = useColorModeValue("blue");

  // get the first year the player played
  let yearsPlayed = Object.keys(pastData).map((year) => parseInt(year));
  let firstYear = Math.min(...yearsPlayed);

  // get the first week the player played
  let firstWeek = Object.keys(pastData[firstYear])[0];

  // get the array of data points from the player's past data
  let [plottableData, maxPointValue] = getPlottableData(
    firstYear,
    firstWeek,
    pastData
  );

  // Get smoothed data

  let options = {
    windowSize: 15,
    derivative: 0,
    polynomial: 2,
    pad: "pre",
    padValue: "replicate",
  };

  // get fantasy points as an array
  let data = plottableData.map((game) => game.fantasyPoints);

  // get smoothed data
  let smoothedData = savitzkyGolay(data, 1, options);

  // calculate the max fantasy points the player has scored since 2018 (rounded up to nearest 5)
  const allPointValues = plottableData.map((game) => game.fantasyPoints);
  let smoothMaxPointValue = Math.max(...allPointValues);
  maxPointValue = roundUpToNearestFive(smoothMaxPointValue);

  // add the percentOfMax value to each data point to help with plotting
  let smoothPlottableData = smoothedData.map((smoothValue) => {
    return {
      smoothValue: smoothValue,
      percentOfMax: Math.max(100 * (smoothValue / smoothMaxPointValue), 0),
    };
  });

  // console.log(smoothPlottableData);

  // let smoothData = savitzkyGolay(data, h, options)

  return (
    <>
      <VStack w="100%" h="200px">
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
            {/* raw data points */}
            <HStack
              justify="space-between"
              h="100%"
              w="100%"
              spacing="0px"
              position="absolute"
            >
              {plottableData.map((game, index) => {
                return (
                  <VStack
                    m="0"
                    h="100%"
                    minW="5px"
                    align="flex-end"
                    justify="flex-end"
                    spacing="0px"
                    key={index}
                  >
                    <Tooltip
                      hasArrow
                      label={`${game.year} week ${game.weekNum}: ${game.fantasyPoints}`}
                      bg="gray.300"
                      color="black"
                    >
                      <Box
                        minH="5px"
                        w="100%"
                        bg={pointColor}
                        borderRadius="100%"
                        cursor="none"
                      />
                    </Tooltip>
                    <Box minH={`${game.percentOfMax}%`} w="100%" />
                  </VStack>
                );
              })}
            </HStack>

            {/* smoothed data line */}
            <HStack
              justify="space-between"
              h="100%"
              w="100%"
              spacing="0px"
              position="absolute"
              pointerEvents="none"
            >
              {smoothPlottableData.map((game, index) => {
                return (
                  <VStack
                    m="0"
                    h="100%"
                    minW="5px"
                    align="flex-end"
                    justify="flex-end"
                    spacing="0px"
                    key={index}
                  >
                    <Box
                      minH="5px"
                      w="100%"
                      // bg={lineColor}
                      bg="red"
                      borderRadius="100%"
                      cursor="none"
                    />
                    <Box minH={`${game.percentOfMax}%`} w="100%" />
                  </VStack>
                );
              })}
            </HStack>

            {/* y axis label */}
            <Box
              position="absolute"
              top="-4px"
              left="-40px"
              w="40px"
              textAlign="right"
            >
              <Heading fontSize="14px">{maxPointValue} -</Heading>
            </Box>
          </Box>
        </HStack>
        {/* x axis label */}
        <Heading fontSize="sm">Games</Heading>
      </VStack>
    </>
  );
};

export default PastPerformanceGraph;

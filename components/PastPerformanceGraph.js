import { Tooltip } from "@chakra-ui/react";
import {
  HStack,
  VStack,
  Heading,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

// move function later
// round to near
function roundUpToNearestFive(x) {
  return Math.ceil(x / 5) * 5;
}
// move function later
function gameDataToFantasyPoints(gameData) {
  let fantasyPoints =
    6 * gameData.rush_td +
    6 * gameData.rec_td +
    4 * gameData.pass_td +
    0.1 * gameData.rush_yds +
    0.1 * gameData.rec_yds +
    0.04 * gameData.pass_yds -
    2 * gameData.pass_int -
    2 * gameData.fumbles_lost;

  return parseFloat(fantasyPoints.toFixed(2));
}

// move function later
function getPlottableData(firstYear, firstWeek, pastData) {
  let plottableData = [];

  // only do back 5 years max
  firstYear = Math.max(firstYear, 2018);

  let mostRecentYear = 2021;
  let relevantYears = [...Array(1 + mostRecentYear - firstYear).keys()].map(
    (diff) => firstYear + diff
  );

  // only do regular season games for now
  for (const year of relevantYears) {
    let startingWeek;
    let lastWeek;
    if (year === firstYear) {
      startingWeek = firstWeek.split("week ")[1];
    } else {
      startingWeek = 1;
    }

    if (year === 2021) {
      lastWeek = 17;
    } else {
      lastWeek = 16;
    }

    for (let weekNum = startingWeek; weekNum <= lastWeek; weekNum++) {
      // handle if the player played no games that year
      if (!pastData[year]) {
        pastData[year] = {};
      }
      const gameData = pastData[year][`week ${weekNum}`];

      let fantasyPoints;
      if (!gameData) {
        fantasyPoints = 0;
      } else {
        fantasyPoints = gameDataToFantasyPoints(gameData);
      }
      plottableData.push({
        year: year,
        weekNum: parseInt(weekNum),
        fantasyPoints: fantasyPoints,
      });
    }
  }

  const allPointValues = plottableData.map((game) => game.fantasyPoints);
  let maxPointValue = Math.max(...allPointValues);
  maxPointValue = roundUpToNearestFive(maxPointValue);

  plottableData = plottableData.map((game) => {
    return {
      ...game,
      percentOfMax: 100 * (game.fantasyPoints / maxPointValue),
    };
  });

  return [plottableData, maxPointValue];
}

const PastPerformanceGraph = ({ pastData }) => {
  const pointColor = useColorModeValue("gray.800", "white");
  const [maxPointValue, setMaxPointValue] = useState(0);

  let yearsPlayed = Object.keys(pastData).map((year) => parseInt(year));
  let firstYear = Math.min(...yearsPlayed);

  let firstWeek = Object.keys(pastData[firstYear])[0];

  let [plottableData, _maxPointValue] = getPlottableData(
    firstYear,
    firstWeek,
    pastData
  );

  useEffect(() => {
    setMaxPointValue(_maxPointValue);
  }, [pastData]);

  // setMaxPointValue(_maxPointValue);

  // console.log(plottableData);

  return (
    <>
      <VStack w="100%" h="200px">
        <HStack w="100%" h="100%">
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
          <Box
            w="100%"
            h="100%"
            borderLeft="2px solid"
            borderBottom="2px solid"
            position="relative"
          >
            <HStack justify="space-between" h="100%" spacing="0px">
              {plottableData.map((game, index) => {
                console.log(game);
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
        <Heading fontSize="sm">Games</Heading>
      </VStack>
    </>
  );
};

export default PastPerformanceGraph;

import {
  HStack,
  VStack,
  Heading,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

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
  console.log(plottableData);

  return plottableData;
}

const PastPerformanceGraph = ({ pastData }) => {
  const pointColor = useColorModeValue("gray.800", "white");
  console.log("pointColor", pointColor);
  // console.log(pastData);
  let yearsPlayed = Object.keys(pastData).map((year) => parseInt(year));
  let firstYear = Math.min(...yearsPlayed);

  let firstWeek = Object.keys(pastData[firstYear])[0];

  let plottableData = getPlottableData(firstYear, firstWeek, pastData);

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
          >
            <HStack justify="space-between" h="100%" spacing="0px">
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
                    <Box
                      minH="5px"
                      w="100%"
                      bg={pointColor}
                      borderRadius="100%"
                    />
                    <Box minH={`${game.percentOfMax}%`} w="100%" />
                  </VStack>
                );
              })}
            </HStack>
          </Box>
        </HStack>
        <Heading fontSize="sm">Games</Heading>
      </VStack>
    </>
  );
};

export default PastPerformanceGraph;

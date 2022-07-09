import { Box, Heading, HStack, VStack, Spacer } from "@chakra-ui/react";

const AllPlayerGraph = ({ position }) => {
  return (
    <>
      <VStack w="100%" h="250px">
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
            {/* <HStack
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
            </HStack> */}

            {/* smoothed data line
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
            </HStack> */}

            {/* y axis label */}
            <Box
              position="absolute"
              top="-4px"
              left="-40px"
              w="40px"
              textAlign="right"
            >
              <Heading fontSize="14px">pi -</Heading>
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

        {/* player name here */}
        <Heading fontSize="lg"></Heading>
        <Spacer h="20px" />
      </VStack>
    </>
  );
};

export default AllPlayerGraph;

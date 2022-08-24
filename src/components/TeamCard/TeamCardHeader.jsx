import React from 'react';
import { Box, Center, HStack, Text, VStack } from 'native-base';

const TeamCardHeader = () => {
    return (
        <Box
            bg="gray.800"
            mb={1}
            borderColor={'darkslategray'}
            borderWidth={'1'}
        >
            <HStack w={'100%'} h="2em">
                <Text
                    w={'10%'}
                    alignSelf="center"
                    textAlign={'center'}
                    fontSize="0.8em"
                    fontWeight={100}
                >
                    Rank
                </Text>
                <Text
                    w={'5%'}
                    alignSelf="center"
                    textAlign={'center'}
                    fontSize="0.8em"
                    fontWeight={100}
                ></Text>
                <Text
                    alignSelf="start"
                    justifySelf={'center'}
                    fontSize="0.8em"
                    w={'15%'}
                ></Text>
                <Text
                    alignSelf="center"
                    textAlign={'start'}
                    fontSize="0.8em"
                    fontWeight={100}
                    w={'45%'}
                >
                    Team
                </Text>
                <Text
                    w={'12.5%'}
                    alignSelf="center"
                    textAlign={'center'}
                    fontSize="0.8em"
                    fontWeight={100}
                >
                    GW
                </Text>
                <Text
                    w={'12.5%'}
                    alignSelf="center"
                    textAlign={'center'}
                    fontSize="0.8em"
                    fontWeight={100}
                >
                    {'Total'}
                </Text>
            </HStack>
        </Box>
    );
};

export default TeamCardHeader;

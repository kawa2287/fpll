import { Box, Center, HStack, Text, VStack } from 'native-base';
import React from 'react';
import { logoLinks } from '../../static/LogoLinks';

/**
 *
 * @param {object} props
 * @param {LeagueB_Standings_Item} props.team
 * @param {number} props.rank
 * @returns
 */
const TeamCardB = (props) => {
    const { team, rank } = props;
    return (
        <Box
            bg="gray.800"
            mb={1}
            borderColor={'darkslategray'}
            borderWidth={'1'}
        >
            <HStack w={'100%'} h="3.5em">
                <Text
                    w={'10%'}
                    alignSelf="center"
                    textAlign={'center'}
                    fontSize="lg"
                    fontWeight={100}
                >
                    {rank}
                </Text>
                <Text
                    w={'5%'}
                    alignSelf="center"
                    textAlign={'center'}
                    fontSize="lg"
                    fontWeight={100}
                ></Text>
                <Center w={'15%'} p="0.5">
                    {team.manager.entry in logoLinks
                        ? logoLinks[team.manager.entry].logo
                        : null}
                </Center>
                <VStack
                    w={'25%'}
                    ml={2}
                    alignItems={'center'}
                    justifyContent="center"
                    style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    <Text
                        alignSelf="start"
                        justifySelf={'center'}
                        fontSize="0.8em"
                    >
                        {team.manager.entry_name.toUpperCase()}
                    </Text>
                    <Text
                        alignSelf="start"
                        fontWeight={100}
                        style={{ color: 'darkgray' }}
                        fontSize="0.6em"
                    >
                        {`${team.manager.player_name} `}
                    </Text>
                </VStack>
                <Text
                    w={'12%'}
                    alignSelf="center"
                    textAlign={'center'}
                    fontSize="0.8em"
                    fontWeight={100}
                >
                    {`${team.wins}-${team.losses}-${team.ties}`}
                </Text>
                <Text
                    w={'8.25%'}
                    alignSelf="center"
                    textAlign={'center'}
                    fontSize="0.8em"
                    fontWeight={100}
                >
                    {team.pointsFor}
                </Text>
                <Text
                    w={'8.25%'}
                    alignSelf="center"
                    textAlign={'center'}
                    fontSize="0.8em"
                    fontWeight={100}
                >
                    {team.pointsAgainst}
                </Text>
                <Text
                    w={'8.25%'}
                    alignSelf="center"
                    textAlign={'center'}
                    fontSize="0.8em"
                    fontWeight={100}
                >
                    {team.pointsFor - team.pointsAgainst}
                </Text>
                <Text
                    w={'8.25%'}
                    alignSelf="center"
                    textAlign={'center'}
                    fontSize="1.1em"
                    fontWeight={500}
                    style={{ color: 'gold' }}
                >
                    {team.standingsPoints}
                </Text>
            </HStack>
        </Box>
    );
};

export default TeamCardB;

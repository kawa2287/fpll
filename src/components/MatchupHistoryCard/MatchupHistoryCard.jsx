import { Box, Center, HStack, Text } from 'native-base';
import React from 'react';
import TeamLogo from '../TeamLogo.jsx/TeamLogo';

/**
 *
 * @param {object} props
 * @param {Matchup} props.matchup
 * @param {number} props.gw
 * @param {number} props.entry
 * @returns
 */
const MatchupHistoryCard = (props) => {
    // Destructure
    const { matchup, gw, entry } = props;
    return (
        <HStack>
            <Text>{gw}</Text>
            <Center w={'10%'}>
                <TeamLogo entry={matchup.teamA_entry} />
            </Center>
            <Center w={'10%'}>
                <TeamLogo entry={matchup.teamB_entry} />
            </Center>
        </HStack>
    );
};

export default MatchupHistoryCard;

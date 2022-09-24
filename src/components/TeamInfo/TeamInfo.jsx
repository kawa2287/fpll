import { Box, ScrollView, Text, VStack } from 'native-base';
import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import SmacksBanner from '../../assets/banners/SmacksBanner';
import { useLeagueB_store } from '../../states/store_LeagueB';
import { useManagerStore } from '../../states/store_Managers';
import { logoLinks } from '../../static/LogoLinks';
import MatchupCard from '../MatchupCard/MatchupCard';
import MatchupHistoryCard from '../MatchupHistoryCard/MatchupHistoryCard';
import TeamRadarChart from '../TeamRadarChart/TeamRadarChart';

const TeamInfo = () => {
    const { teamEntry } = useParams();
    const managerStore = useManagerStore();
    const leagueB_store = useLeagueB_store();

    let managerInfo = null;
    if (managerStore.managers.length > 0) {
        /** @type {Manager} */
        managerInfo = managerStore.managers.find(
            (m) => m.entry.toString() === teamEntry.toString(),
        );
    }

    const entryMatches = GetEntryMatches(teamEntry, leagueB_store.results);
    console.log(entryMatches);

    if (managerInfo !== undefined && managerInfo) {
        return (
            <ScrollView w={'90%'} maxW={'600px'} mb="5">
                <Box
                    w={'100%'}
                    height="max(min(40vw,25em), 14em)"
                    left="0"
                    display="flex"
                    justifyContent={'start'}
                    alignItems="flex-start"
                >
                    {logoLinks[managerInfo.entry].banner}
                </Box>
                <Text position="absolute" left="5" style={s.teamName}>
                    {managerInfo.entry_name.toUpperCase()}
                </Text>
                <Text
                    position="absolute"
                    left="8"
                    top="max(min(6vw,2.8em), 1.6em)"
                    style={s.playerName}
                >
                    {managerInfo.player_name.toUpperCase()}
                </Text>
                <Box
                    position={'absolute'}
                    w="max(min(40vw,15em), 10em)"
                    h="max(min(40vw,15em), 10em)"
                    right={'0'}
                    top="max(min(10vw,3.5em), 1.5em)"
                >
                    <TeamRadarChart />
                </Box>
                <Box w="400px" margin="auto">
                    {entryMatches.map((item, i) => (
                        <MatchupCard matchup={item} />
                    ))}
                </Box>
            </ScrollView>
        );
    } else {
        return null;
    }
};

export default TeamInfo;

const s = {
    teamName: {
        textShadow: '2px 2px 2px #000000',
        color: 'white',
        fontSize: 'max(min(5vw,2.8em), 1.6em)',
        overflow: 'hidden',
        fontFamily: 'Roboto',
        fontWeight: '300',
    },
    playerName: {
        textShadow: '2px 2px 2px #000000',
        color: 'lightgray',
        fontSize: '1.2em',
        fontFamily: 'Roboto Condensed',
        fontWeight: '100',
    },
};

/**
 *
 * @param {number} entry
 * @param {LeagueB_WeekMatchups[]} leageResults
 */
const GetEntryMatches = (entry, leageResults) => {
    let matchups = [];

    // Loop through all gameweeks
    leageResults.forEach((gw) => {
        // Filter only matchups that contain the entry
        let filtered = gw.matchups.filter(
            (item) =>
                item.teamA_entry.toString() === entry.toString() ||
                item.teamB_entry.toString() === entry.toString(),
        );
        filtered.forEach((element) => {
            matchups.push(element);
        });
    });

    return matchups;
};

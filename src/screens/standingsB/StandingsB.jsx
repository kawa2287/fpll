import { Box, Heading, ScrollView, Text } from 'native-base';
import React, { Fragment } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import TeamCardB from '../../components/TeamCardB/TeamCardB';
import TeamCardHeaderB from '../../components/TeamCardB/TeamCardHeaderB';
import { useLeagueB_store } from '../../states/store_LeagueB';
import { useScreenTypeStore } from '../../states/store_ScreenQuery';

const StandingsB = () => {
    const leagueB_store = useLeagueB_store();
    const screenType = useScreenTypeStore().screenType;

    /** @type {LeagueB_Standings_Item[]} */
    let standings = leagueB_store.standings;
    standings = standings.sort(
        (a, b) =>
            b.standingsPoints - a.standingsPoints ||
            b.pointsFor - b.pointsAgainst - (a.pointsFor - a.pointsAgainst),
    );

    return (
        <Fragment>
            <Heading fontSize={'1.5em'} mb={3}>
                Head to Head Standings
            </Heading>
            <Box w={'85%'} maxW={screenType === 'desktop' ? '600px' : '400px'}>
                <TeamCardHeaderB />
            </Box>
            <ScrollView
                w={'85%'}
                maxW={screenType === 'desktop' ? '600px' : '400px'}
            >
                <Box w="100%" alignItems={'center'}>
                    <LoadingSpinner
                        height="80"
                        width="80"
                        visible={!leagueB_store.resultsLoaded}
                    />
                </Box>
                {standings.map((m, i) => (
                    <TeamCardB key={m.manager.entry} rank={i + 1} team={m} />
                ))}
            </ScrollView>
        </Fragment>
    );
};

export default StandingsB;

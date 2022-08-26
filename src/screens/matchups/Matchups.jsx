import { Divider, Heading, ScrollView, Text } from 'native-base';
import React, { Fragment } from 'react';
import { useBootstrapStaticStore } from '../../states/store_BootstrapStatic';
import { useLeagueB_store } from '../../states/store_LeagueB';
import MatchupCard from '../../components/MatchupCard/MatchupCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const Matchups = (props) => {
    // Bind Stores
    const leagueB_Store = useLeagueB_store();
    const bootStrapStaticStore = useBootstrapStaticStore();

    // Filter out specific GW
    /**
     * @type {Matchup[]}
     */
    let currentMatchups = [];
    let previousMatchups = [];
    let nextMatchups = [];

    // Set the Gameweeks
    if (leagueB_Store.matchups.length > 0) {
        currentMatchups =
            leagueB_Store.matchups[parseInt(bootStrapStaticStore.currentGW) - 1]
                .matchups;
        previousMatchups =
            leagueB_Store.matchups[
                parseInt(bootStrapStaticStore.previousGW) - 1
            ].matchups;
        nextMatchups =
            leagueB_Store.matchups[parseInt(bootStrapStaticStore.nextGW) - 1]
                .matchups;
    }
    if (leagueB_Store.results.length > 0) {
        currentMatchups =
            leagueB_Store.results[parseInt(bootStrapStaticStore.currentGW) - 1]
                .matchups;
        previousMatchups =
            leagueB_Store.results[parseInt(bootStrapStaticStore.previousGW) - 1]
                .matchups;
        nextMatchups =
            leagueB_Store.results[parseInt(bootStrapStaticStore.nextGW) - 1]
                .matchups;
    }

    return (
        <Fragment>
            <Text fontSize={'2em'} mb={3}>
                Fantasy Premiere League League Test League B
            </Text>
            {leagueB_Store.matchupsLoaded ? (
                <ScrollView w={'80%'} maxW={'400px'} mb="5">
                    <MatchupTable
                        gw={bootStrapStaticStore.previousGW}
                        matchups={previousMatchups}
                        title={'Previous Gameweek'}
                    />
                    <CustomDivider />
                    <MatchupTable
                        gw={bootStrapStaticStore.currentGW}
                        matchups={currentMatchups}
                        title={'Current Gameweek'}
                    />
                    <CustomDivider />
                    <MatchupTable
                        gw={bootStrapStaticStore.nextGW}
                        matchups={nextMatchups}
                        title={'Next Gameweek'}
                    />
                </ScrollView>
            ) : (
                <LoadingSpinner height="80" width="80" visible={true} />
            )}
        </Fragment>
    );
};

export default Matchups;

const CustomDivider = () => (
    <Divider mt={3} mb={3} bgColor={'coolGray.700'} w="80%" margin={'auto'} />
);

/**
 *
 * @param {object} props
 * @param {object} props.matchups
 * @param {string} props.title
 * @param {number} props.gw
 */
const MatchupTable = (props) => {
    const { matchups, title, gw } = props;
    return (
        <Fragment>
            <Heading
                fontFamily={'Roboto Condensed'}
                fontWeight={100}
            >{`${title} - GW${gw}`}</Heading>
            {matchups
                ? matchups.map((m, j) => (
                      <MatchupCard
                          matchup={m}
                          key={m.teamA_entry + m.teamB_entry}
                      />
                  ))
                : null}
        </Fragment>
    );
};

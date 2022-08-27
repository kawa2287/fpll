import React, { Fragment } from 'react';
import {  Heading, ScrollView } from 'native-base';
import '../../schemas/api/type_bootstrapStatic';
import '../../schemas/api/type_fixtures';
import FixtureCard from '../../components/FixtureCard/FixtureCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { useBootstrapStaticStore } from '../../states/store_BootstrapStatic';
import { useFixtureStore } from '../../states/store_Fixtures';

const Fixtures = (props) => {
    // Bind States
    const bootstrapStore = useBootstrapStaticStore();
    const fixtureStore = useFixtureStore();
    const plTeams = bootstrapStore.plTeams;

    return (
        <Fragment>
            <Heading
                mb="5"
                mt="3"
                fontSize="1.5em"
                fontWeight="100"
            >{`Fixtures For GW ${bootstrapStore.currentGW}`}</Heading>
            {fixtureStore.fixturesLoaded ? (
                <ScrollView w="90%" h="100%" maxW={'500px'} overflowY="scroll">
                    {CreateGameWeek(
                        fixtureStore.fixtures,
                        bootstrapStore.currentGW,
                    ).map((match) => (
                        <FixtureCard
                            key={match.id}
                            fixture={match}
                            teams={plTeams ? plTeams : []}
                        />
                    ))}
                </ScrollView>
            ) : (
                <LoadingSpinner height="80" width="80" visible={true} />
            )}
        </Fragment>
    );
};

export default Fixtures;

/**
 *
 * @param {API_fixtureResponse[]} fixtureResponse
 * @returns {API_fixtureResponse[]}
 */
const CreateGameWeek = (fixtureResponse, gw) => {
    let arr = [];
    if (fixtureResponse.length > 0) {
        arr = fixtureResponse.filter((item) => item.event === gw);
    }
    return arr;
};

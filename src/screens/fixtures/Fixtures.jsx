import React, { Fragment } from 'react';
import { Box, Center, ScrollView, Text } from 'native-base';
import '../../schemas/api/bootstrapStatic';
import '../../schemas/api/fixtures';
import FixtureCard from '../../components/FixtureCard/FixtureCard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { getWithExpiry, setWithExpiry } from '../../res/localStorageExpiry';
import { useManagerStore } from '../../states/Managers';
import { useBootstrapStaticStore } from '../../states/BootstrapStatic';
import { useGameweekStatsStore } from '../../states/GameweekStats';

const Fixtures = (props) => {
    const [fixtureResponse, setFixtureResponse] = React.useState(null);

    const [bootStrapIsLoaded, setBootStrapIsLoaded] = React.useState(false);
    const [fixturesIsLoaded, setFixturesIsLoaded] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [gw, setGw] = React.useState(1);

    // Bind States
    const managers = useManagerStore().managers;
    const bootstrapStore = useBootstrapStaticStore();
    const gameweekStatsStore = useGameweekStatsStore();
    const plTeams = bootstrapStore.plTeams;
    console.log(gameweekStatsStore);

    React.useEffect(() => {
        bootstrapStore.fetch();
        setBootStrapIsLoaded(true);
        /*
        const tempBootstrap = getWithExpiry('bootstrap');
        if (tempBootstrap === null || tempBootstrap === undefined) {
            fetch('/api/bootstrap-static/', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        setBootStrapIsLoaded(true);
                        setApiResponse(result);
                        setWithExpiry(
                            'bootstrap',
                            JSON.stringify(result),
                            60000,
                        );
                    },
                    (error) => {
                        setBootStrapIsLoaded(true);
                        setError(error);
                    },
                );
        } else {
            setApiResponse(JSON.parse(tempBootstrap));
            setBootStrapIsLoaded(true);
        }
        */
    }, []);

    React.useEffect(() => {
        gameweekStatsStore.fetch(managers, gw, bootstrapStore);
    }, [gw, managers, bootstrapStore]);

    React.useEffect(() => {
        const tempFixtures = getWithExpiry('fixtures');
        if (tempFixtures === null || tempFixtures === undefined) {
            fetch('/api/fixtures/', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            })
                .then((res) => res.json())
                .then(
                    (result) => {
                        setFixturesIsLoaded(true);
                        setFixtureResponse(result);
                        setWithExpiry(
                            'fixtures',
                            JSON.stringify(result),
                            60000,
                        );
                    },
                    (error) => {
                        setFixturesIsLoaded(true);
                        setError(error);
                    },
                );
        } else {
            setFixturesIsLoaded(true);
            setFixtureResponse(JSON.parse(tempFixtures));
        }
    }, []);

    return (
        <Fragment>
            <Text>Fixtures</Text>
            <LoadingSpinner
                height="80"
                width="80"
                visible={!fixturesIsLoaded || !bootStrapIsLoaded}
            />
            <ScrollView w="90%" h="100%" maxW={'500px'} overflowY="scroll">
                {fixtureResponse
                    ? CreateGameWeek(fixtureResponse, 1).map((match) => (
                          <FixtureCard
                              key={match.id}
                              fixture={match}
                              teams={plTeams ? plTeams : []}
                          />
                      ))
                    : null}
            </ScrollView>
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
    return fixtureResponse.filter((item) => item.event === gw);
};

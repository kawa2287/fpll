import React from 'react';
import { ScrollView, Text, VStack } from 'native-base';
import { Fragment } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import TeamCard from '../../components/TeamCard/TeamCard';
import { getWithExpiry, setWithExpiry } from '../../res/localStorageExpiry';
import { useManagerStore } from '../../states/Managers';

const Standings = (props) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [error, setError] = React.useState(null);

    // Bind Manager State
    const managerStore = useManagerStore();
    const managers =
        managerStore.managers.length > 0 ? managerStore.managers : null;

    // Sort the Array
    if (managers) {
        managers.sort((a, b) => b.event_total - a.event_total);
    }

    // On-Load hook to query API
    React.useEffect(() => {
        managerStore.fetch();
        setIsLoaded(true);
        /*
        const getUsers = async () => {
            const response = await fetch(
                '/api/leagues-classic/1016416/standings/',
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                },
            );
            const result = await response.json();
            setIsLoaded(true);
            setUsers(result.standings.results);
            setWithExpiry(
                'users',
                JSON.stringify(result.standings.results),
                60000,
            );
        };
        const tempUsers = getWithExpiry('users');

        if (tempUsers === null || tempUsers === undefined) {
            getUsers();
        } else if (tempUsers.length === 0) {
            getUsers();
        } else {
            setUsers(JSON.parse(tempUsers));
            setIsLoaded(true);
        }
        */
    }, []);

    return (
        <Fragment>
            <Text fontSize={'2em'} mb={3}>
                FPL Standings
            </Text>
            <LoadingSpinner height="80" width="80" visible={!isLoaded} />
            <ScrollView w={'80%'} maxW={'400px'}>
                {managers
                    ? managers.map((m, i) => (
                          <TeamCard user={m} key={m.entry} rank={i + 1} />
                      ))
                    : null}
            </ScrollView>
        </Fragment>
    );
};

export default Standings;

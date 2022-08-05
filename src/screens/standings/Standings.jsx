import React from 'react';
import { ScrollView, Text, VStack } from 'native-base';
import { Fragment } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import TeamCard from '../../components/TeamCard/TeamCard';

const Standings = (props) => {
    const [users, setUsers] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        fetch('/api/leagues-classic/1016416/standings/', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setUsers(result.new_entries.results);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                },
            );
    }, []);

    return (
        <Fragment>
            <Text fontSize={'2em'} mb={3}>
                FPL Standings
            </Text>
            <LoadingSpinner
                color="gray"
                height="80"
                width="80"
                visible={!isLoaded}
            />
            <ScrollView w={'80%'} maxW={'400px'}>
                {users.map((u, i) => (
                    <TeamCard user={u} key={u.entry} rank={i + 1} />
                ))}
            </ScrollView>
        </Fragment>
    );
};

export default Standings;

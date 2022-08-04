import './App.css';
import React from 'react';
import { Text, View } from 'native-base';
import TeamCard from './components/TeamCard';
function App() {
    const [users, setUsers] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [error, setError] = React.useState(true);

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

    console.log(users);

    return (
        <View
            w={'100%'}
            h="100%"
            bg={'#282C34'}
            display="flex"
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Text fontSize={'2em'} mb={3}>
                FPL Standings
            </Text>
            {users.map((u, i) => (
                <TeamCard user={u} key={u.entry} rank={i + 1} />
            ))}
        </View>
    );
}

export default App;

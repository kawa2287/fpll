import { ScrollView, Text, Box } from 'native-base';
import { Fragment } from 'react';
import LeaderboardTable from '../../components/LeaderboardTable/LeaderboardTable';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useManagerStore } from '../../states/Managers';

const Leaderboards = (props) => {
    // Bind States
    const managerStore = useManagerStore();

    return (
        <Fragment>
            <Text fontSize={'2em'} mb={3}>
                Leaderboards
            </Text>

            <ScrollView w={'85%'} maxW={'400px'}>
                <Box w="100%" alignItems={'center'}>
                    <LoadingSpinner
                        height="80"
                        width="80"
                        visible={!managerStore.managerStatsLoaded}
                    />
                </Box>
                {leaderBoards.map((lb) => (
                    <Fragment>
                        <LeaderboardTable
                            key={lb.stat}
                            managerStats={managerStore.managerPlayerStats}
                            stat={lb.stat}
                            statLabel={lb.statLabel}
                            title={lb.title}
                        />
                        <br />
                        <br />
                    </Fragment>
                ))}
            </ScrollView>
        </Fragment>
    );
};

export default Leaderboards;

const leaderBoards = [
    {
        stat: 'goals_scored',
        statLabel: 'Goals',
        title: 'Most Goals',
    },
    {
        stat: 'assists',
        statLabel: 'Assists',
        title: 'Most Assists',
    },
    {
        stat: 'saves',
        statLabel: 'Saves',
        title: 'Most Saves',
    },
    {
        stat: 'clean_sheets',
        statLabel: 'CS',
        title: 'Cleanest Sheets',
    },
    {
        stat: 'goals_conceded',
        statLabel: 'GC',
        title: 'Most Goals Conceded',
    },
    {
        stat: 'own_goals',
        statLabel: 'OG',
        title: 'Most Own Goals',
    },
    {
        stat: 'yellow_cards',
        statLabel: 'YC',
        title: 'Most Yellow Cards',
    },
    {
        stat: 'red_cards',
        statLabel: 'RC',
        title: 'Most Red Cards',
    },
];

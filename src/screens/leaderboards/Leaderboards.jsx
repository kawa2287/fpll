import { ScrollView, Text, Box, VStack } from 'native-base';
import { Fragment } from 'react';
import LeaderboardTable from '../../components/LeaderboardTable/LeaderboardTable';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useManagerStore } from '../../states/store_Managers';
import { useBootstrapStaticStore } from '../../states/store_BootstrapStatic';
import { useScreenTypeStore } from '../../states/store_ScreenQuery';

const Leaderboards = (props) => {
    // Bind States
    const managerStore = useManagerStore();
    const bootstrapStore = useBootstrapStaticStore();
    const screenType = useScreenTypeStore().screenType;

    return (
        <Fragment>
            <Text fontSize={'2em'} mb={3}>
                Leaderboards
            </Text>

            <ScrollView
                w={'85%'}
                maxW={screenType === 'desktop' ? '1000px' : '450px'}
            >
                <Box w="100%" alignItems={'center'}>
                    <LoadingSpinner
                        height="80"
                        width="80"
                        visible={!managerStore.managerStatsLoaded}
                    />
                </Box>
                <VStack
                    display={'flex'}
                    flexDirection="row"
                    flexWrap={'wrap'}
                    w="100%"
                    justifyContent={
                        screenType === 'desktop' ? 'space-evenly' : 'null'
                    }
                >
                    {leaderBoards.map((lb) => (
                        <Box
                            key={lb.stat}
                            display={screenType === 'desktop' ? 'flex' : 'null'}
                            w={screenType === 'desktop' ? 'null' : '100%'}
                        >
                            <LeaderboardTable
                                managerStats={managerStore.managerPlayerStats}
                                stat={lb.stat}
                                statLabel={lb.statLabel}
                                title={lb.title}
                                gameweeks={bootstrapStore.currentGW}
                            />
                            <br />
                            <br />
                        </Box>
                    ))}
                </VStack>
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
    {
        stat: 'creativity',
        statLabel: 'Cr',
        title: 'Most Creative',
    },
    {
        stat: 'influence',
        statLabel: 'In',
        title: 'Most Influential',
    },
    {
        stat: 'threat',
        statLabel: 'Th',
        title: 'Most Threatening',
    },
];

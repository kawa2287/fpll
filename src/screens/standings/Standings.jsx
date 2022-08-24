import React from 'react';
import { ScrollView, Text, Box } from 'native-base';
import { Fragment } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import TeamCard from '../../components/TeamCard/TeamCard';
import { useManagerStore } from '../../states/Managers';
import { useScreenTypeStore } from '../../states/ScreenQuery';
import TeamCardHeader from '../../components/TeamCard/TeamCardHeader';

const Standings = (props) => {
    // Bind Manager State
    const managerStore = useManagerStore();
    const managers =
        managerStore.managers.length > 0 ? managerStore.managers : null;
    const screenType = useScreenTypeStore().screenType;

    // Sort the Array
    if (managers) {
        managers.sort((a, b) => b.total - a.total);
    }

    return (
        <Fragment>
            <Text fontSize={'2em'} mb={3}>
                FPL Standings
            </Text>
            <Box w={'85%'} maxW={screenType === 'desktop' ? '800px' : '400px'}>
                <TeamCardHeader />
            </Box>
            <ScrollView
                w={'85%'}
                maxW={screenType === 'desktop' ? '800px' : '400px'}
            >
                <Box w="100%" alignItems={'center'}>
                    <LoadingSpinner
                        height="80"
                        width="80"
                        visible={!managerStore.standingsLoaded}
                    />
                </Box>
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

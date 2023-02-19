import React from 'react';
import { ScrollView, Box, Heading } from 'native-base';
import { Fragment } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import TeamCard from '../../components/TeamCard/TeamCard';
import { useManagerStore } from '../../states/store_Managers';
import { useScreenTypeStore } from '../../states/store_ScreenQuery';
import TeamCardHeader from '../../components/TeamCard/TeamCardHeader';

const Standings = (props) => {
    // Bind Manager State
    const managerStore = useManagerStore();
    const managers = managerStore.managers.length > 0 ? managerStore.managers : null;
    const screenType = useScreenTypeStore().screenType;

    // Sort the Array
    let sortedManagers = null;
    if (managers) {
        const copyManagers = structuredClone(managers);
        sortedManagers = copyManagers.sort((a, b) => b.total - a.total);
    }

    return (
        <Fragment>
            <Heading fontSize={'1.5em'} mb={3}>
                FPL Main Standings
            </Heading>
            <Box w={'85%'} maxW={screenType === 'desktop' ? '600px' : '400px'}>
                <TeamCardHeader />
            </Box>
            <ScrollView w={'85%'} maxW={screenType === 'desktop' ? '600px' : '400px'}>
                <Box w="100%" alignItems={'center'}>
                    <LoadingSpinner
                        height="80"
                        width="80"
                        visible={!managerStore.standingsLoaded}
                    />
                </Box>
                {sortedManagers
                    ? sortedManagers.map((m, i) => <TeamCard user={m} key={m.entry} rank={i + 1} />)
                    : null}
            </ScrollView>
        </Fragment>
    );
};

export default Standings;

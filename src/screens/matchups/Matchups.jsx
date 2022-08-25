import { Center, Divider, HStack, ScrollView, Text } from 'native-base';
import React, { Fragment } from 'react';
import { RoundRobinCreator } from '../../res/roundRobinCreator';
import { useBootstrapStaticStore } from '../../states/store_BootstrapStatic';
import { useManagerStore } from '../../states/store_Managers';
import { useMatchesStore } from '../../states/store_Matchups';
import { logoLinks } from '../../static/LogoLinks';

const Matchups = (props) => {
    // Bind Manager State
    const managerStore = useManagerStore();
    const matchesStore = useMatchesStore();
    const bootStrapStaticStore = useBootstrapStaticStore();
    const managers =
        managerStore.managers.length > 0 ? managerStore.managers : null;
    React.useEffect(() => {
        matchesStore.setMatchups(3, managers);
    }, [managers]);

    // Filter out specific GW
    let matchups = [];
    if (matchesStore.matchups.length > 0) {
        matchups =
            matchesStore.matchups[parseInt(bootStrapStaticStore.currentGW) - 1]
                .matchups;
    }

    return (
        <Fragment>
            <Text fontSize={'2em'} mb={3}>
                GW {bootStrapStaticStore.currentGW} Matchups
            </Text>
            <ScrollView w={'80%'} maxW={'400px'}>
                {matchups
                    ? matchups.map((m, j) => (
                          <HStack
                              key={m[0].id + m[1].id}
                              justifyContent="space-evenly"
                          >
                              <Text>{`GW - ${parseInt(
                                  bootStrapStaticStore.currentGW,
                              )}`}</Text>
                              <Center w={'10%'}>
                                  {m[0].entry in logoLinks
                                      ? logoLinks[m[0].entry].logo
                                      : null}
                              </Center>
                              <Text>{'vs'}</Text>
                              <Center w={'10%'}>
                                  {m[1].entry in logoLinks
                                      ? logoLinks[m[1].entry].logo
                                      : null}
                              </Center>
                          </HStack>
                      ))
                    : null}
            </ScrollView>
        </Fragment>
    );
};

export default Matchups;

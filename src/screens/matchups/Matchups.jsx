import { Center, Divider, HStack, ScrollView, Text } from 'native-base';
import React, { Fragment } from 'react';
import { RoundRobinCreator } from '../../res/roundRobinCreator';
import { useManagerStore } from '../../states/Managers';
import { useMatchesStore } from '../../states/Matchups';
import { logoLinks } from '../../static/LogoLinks';

const Matchups = (props) => {
    // Bind Manager State
    const managerStore = useManagerStore();
    const matchesStore = useMatchesStore();
    const managers =
        managerStore.managers.length > 0 ? managerStore.managers : null;
    React.useEffect(() => {
        matchesStore.setMatchups(3, managers);
    }, [managers]);

    console.log(matchesStore.matchups);

    return (
        <Fragment>
            <Text fontSize={'2em'} mb={3}>
                FPL Season Matchups
            </Text>
            <ScrollView w={'80%'} maxW={'400px'}>
                {matchesStore.matchups
                    ? matchesStore.matchups.map((m, i) => (
                          <Fragment>
                              {m.matchups.map((matches, j) => (
                                  <HStack
                                      key={
                                          m.gameweek +
                                          i.toString() +
                                          j.toString()
                                      }
                                      justifyContent="space-evenly"
                                  >
                                      <Text>{`GW - ${m.gameweek}`}</Text>
                                      <Center w={'10%'}>
                                          {matches[0].entry in logoLinks
                                              ? logoLinks[matches[0].entry].logo
                                              : null}
                                      </Center>
                                      <Text>{'vs'}</Text>
                                      <Center w={'10%'}>
                                          {matches[1].entry in logoLinks
                                              ? logoLinks[matches[1].entry].logo
                                              : null}
                                      </Center>
                                  </HStack>
                              ))}
                              <Divider mb={2} mt={1} />
                          </Fragment>
                      ))
                    : null}
            </ScrollView>
        </Fragment>
    );
};

export default Matchups;

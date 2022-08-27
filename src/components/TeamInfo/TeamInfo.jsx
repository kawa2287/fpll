import { Box, ScrollView, Text, VStack } from 'native-base';
import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import SmacksBanner from '../../assets/banners/SmacksBanner';
import { useManagerStore } from '../../states/store_Managers';
import { logoLinks } from '../../static/LogoLinks';
import TeamRadarChart from '../TeamRadarChart/TeamRadarChart';

const TeamInfo = () => {
    const { teamEntry } = useParams();
    const managerStore = useManagerStore();
    let managerInfo = null;
    if (managerStore.managers.length > 0) {
        /** @type {Manager} */
        managerInfo = managerStore.managers.find(
            (m) => m.entry.toString() === teamEntry.toString(),
        );
    }

    if (managerInfo !== undefined && managerInfo) {
        return (
            <Box w={'100%'} h="10px">
                <Box w={'100%'} position={'absolute'} top="0">
                    <Box
                        w={'100%'}
                        height="max(min(40vw,25em), 14em)"
                        position="absolute"
                        left="0"
                        display="flex"
                        justifyContent={'start'}
                        alignItems="flex-start"
                    >
                        {logoLinks[managerInfo.entry].banner}
                    </Box>
                    <Text position="absolute" left="5" style={s.teamName}>
                        {managerInfo.entry_name.toUpperCase()}
                    </Text>
                    <Text
                        position="absolute"
                        left="8"
                        top="max(min(6vw,2.8em), 1.6em)"
                        style={s.playerName}
                    >
                        {managerInfo.player_name.toUpperCase()}
                    </Text>
                    <Box
                        position={'absolute'}
                        w="max(min(40vw,15em), 10em)"
                        h="max(min(40vw,15em), 10em)"
                        right={'0'}
                        top="max(min(10vw,3.5em), 1.5em)"
                    >
                        <TeamRadarChart />
                    </Box>
                    <ScrollView
                        w={'100%'}
                        maxW={'600px'}
                        position="absolute"
                        top="max(min(40vw,15em), 10em)"
                        bg={'#00000050'}
                    ></ScrollView>
                </Box>
            </Box>
        );
    } else {
        return null;
    }
};

export default TeamInfo;

const s = {
    teamName: {
        textShadow: '2px 2px 2px #000000',
        color: 'white',
        fontSize: 'max(min(5vw,2.8em), 1.6em)',
        overflow: 'hidden',
        fontFamily: 'Roboto',
        fontWeight: '300',
    },
    playerName: {
        textShadow: '2px 2px 2px #000000',
        color: 'lightgray',
        fontSize: '1.2em',
        fontFamily: 'Roboto Condensed',
        fontWeight: '100',
    },
};

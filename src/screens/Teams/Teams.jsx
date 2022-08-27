import { Box, HStack } from 'native-base';
import React from 'react';
import { Outlet } from 'react-router-dom';
import TeamLogo from '../../components/TeamLogo.jsx/TeamLogo';
import { useScreenTypeStore } from '../../states/store_ScreenQuery';
import { logoLinks } from '../../static/LogoLinks';

const Teams = () => {
    const screenStore = useScreenTypeStore();
    let teams = [];

    console.log(screenStore.screenType);

    Object.keys(logoLinks).forEach((item) => teams.push(item));
    return (
        <Box w={'85%'} maxW={'600px'}>
            <HStack
                w="100%"
                bg={'#00000020'}
                mt="2"
                mb="2"
                display={'flex'}
                flexWrap="wrap"
                flexGrow={'inherit'}
                justifyContent={'space-between'}
                borderRadius="10px"
                p={'0.5em'}
            >
                {teams.map((item) => (
                    <Box key={item} w={'2.5em'}>
                        <TeamLogo entry={item} />
                    </Box>
                ))}
            </HStack>
            <Outlet />
        </Box>
    );
};

export default Teams;

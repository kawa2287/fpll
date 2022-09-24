import { Box, HStack } from 'native-base';
import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import TeamLogo from '../../components/TeamLogo.jsx/TeamLogo';
import { logoLinks } from '../../static/LogoLinks';

const Teams = () => {
    let teams = [];

    Object.keys(logoLinks).forEach((item) => teams.push(item));

    return (
        <Fragment>
            <HStack
                w="90%"
                bg={'#00000020'}
                mt="2"
                mb="2"
                display={'flex'}
                flexWrap="wrap"
                flexGrow={'inherit'}
                justifyContent={'space-evenly'}
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
        </Fragment>
    );
};

export default Teams;

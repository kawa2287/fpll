import moment from 'moment-timezone';
import React from 'react';
import { Badge, Box, Center, HStack, Text, VStack } from 'native-base';
import '../../schemas/api/type_fixtures';
import '../../schemas/api/type_bootstrapStatic';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGameweekStatsStore } from '../../states/store_GameweekStats';
import { logoLinks } from '../../static/LogoLinks';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ManchesterUnitedLogo from '../../assets/epl/ManchesterUnitedLogo';
import FulhamLogo from '../../assets/epl/FulhamLogo';
import { EPL_LOGOS } from '../../static/EPL_logoLinks';

/**
 *
 * @param {object} props
 * @param {API_fixtureResponse} props.fixture
 * @param {API_bootstrapStatic} props.teams
 * @returns
 */
const FixtureCard = (props) => {
    const { fixture, teams } = props;
    const kickoff_time_zulu = moment(fixture.kickoff_time);
    const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const kickoff_time_local = kickoff_time_zulu.clone().tz(localTimeZone);

    const gameweekStatsStore = useGameweekStatsStore();

    const activeManagers = DetermineManagersWithActivePlayers(
        gameweekStatsStore.managerPicks,
        fixture,
    );
    return (
        <Accordion
            style={{
                backgroundImage: 'linear-gradient(#282c34, #16181d)',
                marginBottom: '0.2em',
                border: '1px solid darkslategray',
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'gray' }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <HStack w="100%">
                    <HStack
                        color={'gray.500'}
                        w="25%"
                        justifyContent={'space-evenly'}
                        fontSize="0.8em"
                    >
                        {!fixture.started ? (
                            <VStack>
                                <Text fontSize={'0.8em'}>
                                    {kickoff_time_local.format('LT z')}
                                </Text>
                                <Text fontSize={'0.8em'}>
                                    {kickoff_time_local.format('l')}
                                </Text>
                            </VStack>
                        ) : null}

                        {fixture.started && !fixture.finished_provisional ? (
                            <Badge variant={'outline'} bg="amber.900" mt={1}>
                                LIVE
                            </Badge>
                        ) : null}
                        {fixture.started && fixture.finished_provisional
                            ? 'FINAL'
                            : null}
                    </HStack>

                    <Box w="15%" overflow="hidden">
                        <Center
                            left="0"
                            right="0"
                            margin={'auto'}
                            top="0"
                            bottom="0"
                            position="absolute"
                        >
                            {EPL_LOGOS[GetTeamName(fixture.team_a, teams)].logo}
                        </Center>
                    </Box>

                    <Text w="15%" textAlign={'center'} fontWeight="100">
                        {GetTeamName(fixture.team_a, teams)}
                    </Text>
                    <Text w="10%" textAlign={'center'} fontSize="1em">
                        {fixture.team_a_score}
                    </Text>
                    <Text
                        w="10%"
                        textAlign={'center'}
                        fontSize="0.9em"
                        fontWeight="100"
                    >
                        @
                    </Text>
                    <Text w="10%" textAlign={'center'} fontSize="1em">
                        {fixture.team_h_score}
                    </Text>
                    <Text w="20%" textAlign={'center'} fontWeight="100">
                        {GetTeamName(fixture.team_h, teams)}
                    </Text>
                    <Box w="15%" overflow="hidden">
                        <Center
                            left="0"
                            right="0"
                            margin={'auto'}
                            top="0"
                            bottom="0"
                            position="absolute"
                        >
                            {EPL_LOGOS[GetTeamName(fixture.team_h, teams)].logo}
                        </Center>
                    </Box>
                </HStack>
            </AccordionSummary>
            <AccordionDetails>
                <HStack
                    w="100%"
                    flexWrap={'wrap'}
                    justifyContent={
                        gameweekStatsStore.mangerPickesLoaded
                            ? 'flex-start'
                            : 'center'
                    }
                >
                    {gameweekStatsStore.mangerPickesLoaded ? (
                        activeManagers.map((m) => (
                            <PointsChart
                                manager={m}
                                fixture={fixture}
                                key={m.entry}
                            />
                        ))
                    ) : (
                        <LoadingSpinner height="80" width="80" visible={true} />
                    )}
                </HStack>
            </AccordionDetails>
        </Accordion>
    );
};
export default FixtureCard;

/**
 *
 * @param {object} props
 * @param {object} props.manager
 * @param {object} props.fixture
 */
const PointsChart = (props) => {
    const { manager, fixture } = props;
    const calcPoints = () => {
        let pts = 0;
        manager.picks.forEach((p) => {
            if (p.team === fixture.team_h || p.team === fixture.team_a) {
                p.stats.forEach((fixture) => {
                    fixture.stats.forEach((stat) => {
                        pts += stat.points * p.multiplier;
                    });
                });
            }
        });
        return pts;
    };
    return (
        <VStack w={'2.6em'} position="relative">
            <Center>{logoLinks[manager.entry].logo}</Center>
            <Text style={{ color: 'gold' }} textAlign="center">
                {calcPoints()}
            </Text>
        </VStack>
    );
};

/**
 *
 * @param {number} id
 * @param {[]} teams
 */
const GetTeamName = (id, teams) => {
    let filteredTeams = teams.filter((item) => item.id === id);

    if (filteredTeams.length > 0) {
        return filteredTeams[0]['short_name'];
    } else {
        return '';
    }
};

const DetermineManagersWithActivePlayers = (managerPicks, fixture) => {
    let activeManagers = [];

    managerPicks.forEach((m) => {
        let hasPlayerInFixture = false;

        if (m.picks) {
            m.picks.forEach((p) => {
                if (p.team === fixture.team_h || p.team === fixture.team_a) {
                    hasPlayerInFixture = true;
                }
            });
            if (hasPlayerInFixture) {
                activeManagers.push(m);
            }
        }
    });

    return activeManagers;
};

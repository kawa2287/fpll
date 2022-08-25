import moment from 'moment-timezone';
import React from 'react';
import { Badge, Box, Center, HStack, Text, VStack } from 'native-base';
import '../../schemas/api/type_fixtures';
import '../../schemas/api/type_bootstrapStatic';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getWithExpiry } from '../../res/localStorageExpiry';
import FixturePointsChart from '../FixturePointsChart/FixturePointsChart';
import { useGameweekStatsStore } from '../../states/store_GameweekStats';
import { logoLinks } from '../../static/LogoLinks';

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

    const users = JSON.parse(getWithExpiry('users'));
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
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <HStack w="100%">
                    <HStack
                        color={'gray.500'}
                        w="30%"
                        justifyContent={'space-evenly'}
                        fontSize="0.8em"
                    >
                        {/*fixture.started && !fixture.finished_provisional ? (
                            <Badge variant={'outline-success'} mt={1}>
                                {`${fixture.minutes}"`}
                            </Badge>
                        ) : null*/}
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
                    <Text w="20%" textAlign={'center'}>
                        {GetTeamName(fixture.team_a, teams)}
                    </Text>
                    <Text w="10%" textAlign={'center'} fontSize="1em">
                        {fixture.team_a_score}
                    </Text>
                    <Text w="10%" textAlign={'center'}>
                        @
                    </Text>
                    <Text w="10%" textAlign={'center'} fontSize="1em">
                        {fixture.team_h_score}
                    </Text>
                    <Text w="20%" textAlign={'center'}>
                        {GetTeamName(fixture.team_h, teams)}
                    </Text>
                </HStack>
            </AccordionSummary>
            <AccordionDetails>
                {/*
                <Box w="100%" h="20em">
                    <FixturePointsChart />
                        </Box>*/}
                <HStack w="100%" flexWrap={'wrap'} justifyContent="flex-start">
                    {activeManagers.map((m) => (
                        <PointsChart
                            manager={m}
                            fixture={fixture}
                            key={m.entry}
                        />
                    ))}
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

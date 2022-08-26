import { Box, Center, HStack, Text } from 'native-base';
import React, { Fragment } from 'react';
import { LineWave } from 'react-loader-spinner';
import { useLeagueB_store } from '../../states/store_LeagueB';
import { logoLinks } from '../../static/LogoLinks';

/**
 *
 * @param {object} props
 * @param {Matchup} props.matchup
 * @returns
 */
const MatchupCard = (props) => {
    const { matchup } = props;
    const leagueB_store = useLeagueB_store();
    const leagueB_standings = leagueB_store.standings;

    return (
        <HStack
            key={matchup.teamA_entry + matchup.teamB_entry}
            justifyContent="space-evenly"
            bg={'black'}
            mb="1"
            display={'flex'}
            alignItems="center"
            h={'2.5em'}
            borderColor={'darkslategray'}
            borderWidth={'1'}
        >
            <MatchupTeamInfo
                entry={matchup.teamA_entry}
                teamName={matchup.managers[0].entry_name}
                location="left"
                width="38%"
                standings={leagueB_standings}
            />
            <MatchupPoints
                score={matchup.teamA_score}
                width="10%"
                opponentScore={matchup.teamB_score}
            />

            <Text w="4%" textAlign="center" fontWeight={100}>
                {'-'}
            </Text>

            <MatchupPoints
                score={matchup.teamB_score}
                width="10%"
                opponentScore={matchup.teamA_score}
            />

            <MatchupTeamInfo
                entry={matchup.teamB_entry}
                teamName={matchup.managers[1].entry_name}
                location="right"
                width="38%"
                standings={leagueB_standings}
            />
        </HStack>
    );
};

export default MatchupCard;

/**
 *
 * @param {object} props
 * @param {number} props.entry
 * @param {string} props.teamName
 * @param {('left'|'right')} props.location
 * @param {string} props.width
 * @param {LeagueB_Standings_Item[]} props.standings
 */
const MatchupTeamInfo = (props) => {
    const { entry, location, teamName, width, standings } = props;
    // get user standings;
    let team = null;
    if (standings.length > 0) {
        team = standings.find((item) => item.manager.entry === entry);
    }
    return (
        <Fragment>
            <Box w={width} h="100%" overflow="hidden" opacity={0.3}>
                <Center
                    w={'100%'}
                    overflow="hidden"
                    position="absolute"
                    top="-40"
                    right={location === 'right' ? '-20' : null}
                    left={location === 'left' ? '-20' : null}
                >
                    {entry in logoLinks ? logoLinks[entry].logo : null}
                </Center>
            </Box>
            <Center
                position={'absolute'}
                right={location === 'right' ? '2' : null}
                left={location === 'left' ? '2' : null}
                top="1"
            >
                <Text
                    fontWeight={600}
                    fontSize="0.8em"
                    style={{
                        textShadow: '1px 1px 1px #000000',
                        color: 'white',
                    }}
                >
                    {`${teamName.toUpperCase().slice(0, 5)}`}
                </Text>
            </Center>
            <Center
                position={'absolute'}
                right={location === 'right' ? '2' : null}
                left={location === 'left' ? '2' : null}
                bottom="1"
            >
                <Text
                    fontWeight={100}
                    fontSize="0.6em"
                    style={{
                        textShadow: '1px 1px 1px #000000',
                        color: 'lightgray',
                    }}
                >
                    {team ? `(${team.wins}-${team.losses}-${team.ties})` : null}
                </Text>
            </Center>
        </Fragment>
    );
};

/**
 *
 * @param {object} props
 * @param {number} props.score
 * @param {number} props.opponentScore
 * @param {string} props.width
 */
const MatchupPoints = (props) => {
    const { score, width, opponentScore } = props;
    const leagueB_store = useLeagueB_store();

    return (
        <Text
            w={width}
            textAlign="center"
            fontSize={'1.5em'}
            style={{
                color:
                    opponentScore > score
                        ? 'salmon'
                        : opponentScore < score
                        ? 'yellow'
                        : 'gray',
            }}
        >
            {leagueB_store.resultsLoaded ? (
                score
            ) : (
                <LineWave
                    height="100%"
                    width="100%"
                    color="#999999"
                    ariaLabel="line-wave"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            )}
        </Text>
    );
};

import { Box, Heading, HStack, ScrollView, Stack, Text, VStack } from 'native-base';
import React from 'react';
import { Fragment } from 'react';
import TeamLogo from '../../components/TeamLogo.jsx/TeamLogo';
import { useManagerHistories, useManagers } from '../../states/store_Managers';
import { useScreenTypeStore } from '../../states/store_ScreenQuery';
import { promoRegSettings } from '../../static/promoRegSettings';

const StandingsC = () => {
    const managerHistories = useManagerHistories();
    const screenType = useScreenTypeStore().screenType;
    const data = generateWeeklyPromotionRelegationModel(managerHistories);
    const managers = useManagers();

    calcMoney(data, managers);
    const copyManagers = structuredClone(managers);
    copyManagers.sort((a, b) => b.pot - a.pot);

    return (
        <Fragment>
            <Heading fontSize={'1.5em'} mb={3}>
                Promotion / Relegation
            </Heading>
            <Text w={'85%'} maxW={screenType === 'desktop' ? '600px' : '400px'}>
                The first 6 gameweeks determine which league each team will start in. The 5 teams
                with the highest point totals will begin in the Upper League, and the remaining
                teams will be in the Lower League. Each week, the bottom 2 teams from the Upper
                League and the top 2 teams from the Lower League will swap. Only the top 2 teams in
                the Upper league will receive a percentage of the pot each week.
            </Text>
            <Box w={'85%'} maxW={screenType === 'desktop' ? '600px' : '400px'}></Box>
            <ScrollView w={'85%'} maxW={screenType === 'desktop' ? '600px' : '400px'}>
                <Box w="100%" alignItems={'center'}></Box>
                <VStack w="100%" space={1}>
                    <br />
                    {data.length === 0
                        ? null
                        : data.map((week, i) => (
                              <VStack
                                  key={i}
                                  h="130px"
                                  justifyContent={'center'}
                                  alignItems={'center'}
                                  bg="gray.800"
                                  borderColor={'darkslategray'}
                                  borderWidth={'1'}
                              >
                                  <Text textAlign="center" minW={'50px'} minH="30px">
                                      {i}
                                  </Text>
                                  <HStack flex="1">
                                      <Text textAlign="center" minW={'50px'} minH="30px">
                                          Upper
                                      </Text>
                                      {week.upper.map((tm, j) => (
                                          <TeamLogoTilePromoReleg
                                              key={tm.entry}
                                              mgrHist={tm}
                                              week={i}
                                              rank={j + 1}
                                              league={'upper'}
                                          />
                                      ))}
                                  </HStack>
                                  <HStack flex="1">
                                      <Text textAlign="center" minW={'50px'} minH="30px">
                                          Lower
                                      </Text>
                                      {week.lower.map((tm, j) => (
                                          <TeamLogoTilePromoReleg
                                              key={tm.entry}
                                              mgrHist={tm}
                                              week={i}
                                              rank={j + 1}
                                              league={'lower'}
                                          />
                                      ))}
                                  </HStack>
                              </VStack>
                          ))}
                    {copyManagers.length > 0
                        ? copyManagers.map((m) => (
                              <HStack key={m.entry}>
                                  <Text>{m.entry_name} </Text>

                                  <Text>${m.pot ? m.pot.toFixed(2) : null}</Text>
                              </HStack>
                          ))
                        : null}
                </VStack>
            </ScrollView>
        </Fragment>
    );
};

export default StandingsC;

/**
 *
 * @param {object} props
 * @param {'upper'|'lower} props.league
 * @param {number} props.week
 * @param {number} props.rank
 * @param {API_ManagerHistory} props.mgrHist
 */
const TeamLogoTilePromoReleg = (props) => {
    const { mgrHist, week, rank, league } = props;
    const settings = promoRegSettings;
    return (
        <VStack key={mgrHist.entry} flex="1" h="100%">
            <Stack flex="1" h="100%">
                <TeamLogo
                    entry={mgrHist.entry}
                    bg={week === 0 ? null : determineBackgroundColor(league, rank)}
                />
            </Stack>
            <Text h="20px" textAlign={'center'}>
                {week === 0
                    ? mgrHist.seedingPoints
                    : mgrHist.current[week + settings.seedWeeks - 1].points}
            </Text>
        </VStack>
    );
};

/**
 *
 * @param {API_ManagerHistory[]} managerHistories
 */
const generateWeeklyPromotionRelegationModel = (managerHistories) => {
    let data = [];
    if (managerHistories.length === 0) {
        return data;
    }
    const settings = promoRegSettings;
    const managerHistoriesCopy = structuredClone(managerHistories);

    // Add to data structure
    managerHistoriesCopy.forEach((mh) => {
        mh['seedingPoints'] = mh['current']
            .slice(0, settings.seedWeeks)
            .reduce((sum, i) => sum + parseInt(i.points), 0);
        mh['seedingBenchPoints'] = mh['current']
            .slice(0, settings.seedWeeks)
            .reduce((sum, i) => sum + parseInt(i.points_on_bench), 0);
    });

    managerHistoriesCopy.sort(
        (a, b) => b.seedingPoints - a.seedingPoints || b.seedingBenchPoints - a.seedingBenchPoints,
    );

    let initalStandings = {
        upper: managerHistoriesCopy.slice(0, 5),
        lower: managerHistoriesCopy.slice(5, 10),
        overall: managerHistoriesCopy,
    };

    // Push in Initial Leagues
    data.push(initalStandings);

    // Start to promote and relegate
    let prevWeekStandings = initalStandings;
    for (let i = 0; i < managerHistoriesCopy[0].current.length; i++) {
        if (i < settings.seedWeeks) {
            continue;
        } else {
            // Apply Points to leagues
            const weekStandings = _applyPointsToLeaguesForGivenWeek(
                i,
                prevWeekStandings,
                managerHistoriesCopy,
            );
            data.push(weekStandings);
        }
    }

    return data;
};

/**
 *
 * @param {'upper'|'lower'} league
 * @param {number} rank
 */
const determineBackgroundColor = (league, rank) => {
    const settings = promoRegSettings;
    if (league === 'upper') {
        if (rank === 1) {
            return '#FFD70060';
        }
        if (rank === 2) {
            return '#C0C0C060';
        }
        if (rank > settings.upperLeagueTeams - settings.teamToSwap) {
            return '#DC143C60';
        }
    }
    if (league === 'lower') {
        if (rank <= settings.teamToSwap) {
            return '#19197060';
        }
    }
    return null;
};

/**
 *
 * @param {number} week
 * @param {PromoRelegStructure} prevWeekObject
 */
const _applyPointsToLeaguesForGivenWeek = (week, prevWeekObject, managerHistoriesCopy) => {
    // Get points from week in question

    // Make a copy of the prev week
    let prevWeekCopy = structuredClone(prevWeekObject);

    // Sort Teams in Each League based on week
    prevWeekCopy.upper.sort(
        (a, b) =>
            b.current[week - 1].points - a.current[week - 1].points ||
            b.current[week - 1].points_on_bench - a.current[week - 1].points_on_bench ||
            b.current[week - 1].total_points - a.current[week - 1].total_points ||
            b.current[week - 1].rank_sort - a.current[week - 1].rank_sort,
    );
    prevWeekCopy.lower.sort(
        (a, b) =>
            b.current[week - 1].points - a.current[week - 1].points ||
            b.current[week - 1].points_on_bench - a.current[week - 1].points_on_bench ||
            b.current[week - 1].total_points - a.current[week - 1].total_points ||
            b.current[week - 1].rank_sort - a.current[week - 1].rank_sort,
    );

    // Perform the swaps
    const settings = promoRegSettings;
    const relegated = prevWeekCopy.upper.splice(
        settings.upperLeagueTeams - settings.teamToSwap,
        settings.upperLeagueTeams,
    );
    const promoted = prevWeekCopy.lower.splice(0, settings.teamToSwap);
    prevWeekCopy.upper = prevWeekCopy.upper.concat(promoted);
    prevWeekCopy.lower = prevWeekCopy.lower.concat(relegated);

    // Re-sort
    prevWeekCopy.upper.sort(
        (a, b) =>
            b.current[week].points - a.current[week].points ||
            b.current[week].points_on_bench - a.current[week].points_on_bench ||
            b.current[week].total_points - a.current[week].total_points ||
            b.current[week].rank_sort - a.current[week].rank_sort,
    );
    prevWeekCopy.lower.sort(
        (a, b) =>
            b.current[week].points - a.current[week].points ||
            b.current[week].points_on_bench - a.current[week].points_on_bench ||
            b.current[week].total_points - a.current[week].total_points ||
            b.current[week].rank_sort - a.current[week].rank_sort,
    );

    return prevWeekCopy;
};

/**
 *
 * @param {PromoRelegStructure[]} data
 * @param {Manager[]} managers
 */
const calcMoney = (data, managers) => {
    const sett = promoRegSettings;
    const payout = sett.pot_dol / (38 - sett.seedWeeks);
    const topPay = payout * sett.payoutPercentrage[0];
    const botPay = payout * sett.payoutPercentrage[1];

    managers.forEach((element) => {
        element['pot'] = 0.0;
    });
    for (let i = 1; i < data.length; i++) {
        const curWeek = data[i];
        let topManager = managers.find((m1) => m1.entry === curWeek.upper[0].entry);
        console.log(parseFloat(sett.payoutPercentrage[0] * sett.pot_dol));
        topManager.pot += topPay;

        let nextManager = managers.find((m1) => m1.entry === curWeek.upper[1].entry);
        nextManager.pot += botPay;
    }
};

/**
 * @typedef PromoRelegStructure
 * @property {API_ManagerHistory[]} upper
 * @property {API_ManagerHistory[]} lower
 * @property {API_ManagerHistory[]} overall
 */

/**
 * @typedef WeekStandingItem
 * @property {number} entry
 * @property {number} points
 * @property {number} benchPoints
 * @property {number} totalPoints
 */

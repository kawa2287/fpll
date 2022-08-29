import { DetermineIfGameweekIsComplete } from './EventService';

/**
 *
 * @param {API_ManagerHistory[]} managerHistories
 * @param {LeagueB_WeekMatchups[]} matchups
 * @param {Manager[]} managers
 * @param {Events[]} events
 * @param {*} set
 */
export const PopulateResults = (
    managerHistories,
    matchups,
    managers,
    events,
    set,
) => {
    // Create a copy of the matchups
    /**
     * @type {LeagueB_WeekMatchups[]}
     */
    let m = JSON.parse(JSON.stringify(matchups));
    let standings = PopulateStandings(managers);

    // Loop through each gameweek
    m.forEach((week) => {
        // Loop through each match in the week;
        week.matchups.forEach((match) => {
            // Check if stats exist for the managers in question
            let managerA_gws = managerHistories.find(
                (m) => m.entry === match.teamA_entry,
            );
            let managerB_gws = managerHistories.find(
                (m) => m.entry === match.teamB_entry,
            );

            if (managerA_gws !== undefined && managerB_gws !== undefined) {
                // Check if the managers have any info on the current gameweek
                let managerA_Idx = managerA_gws.current.findIndex(
                    (gw) => gw.event === week.gameweek,
                );
                let managerB_Idx = managerB_gws.current.findIndex(
                    (gw) => gw.event === week.gameweek,
                );

                if (managerA_Idx !== -1 && managerB_Idx !== -1) {
                    // Found info - set stats
                    match.teamA_score =
                        managerA_gws.current[managerA_Idx].points;
                    match.teamB_score =
                        managerB_gws.current[managerB_Idx].points;

                    // Check if this is a completed week
                    if (
                        DetermineIfGameweekIsComplete(week.gameweek, events) &&
                        standings.length > 0
                    ) {
                        // Add stats to standings
                        let teamA = standings.find(
                            (item) => item.manager.entry === match.teamA_entry,
                        );
                        let teamB = standings.find(
                            (item) => item.manager.entry === match.teamB_entry,
                        );

                        // Set Wins Losses Ties
                        SetWinsLossesTies(teamA, teamB, match);
                    }
                }
            }
        });
    });

    // Set the state
    if (managerHistories.length > 0 && matchups.length > 0) {
        set({ results: m, resultsLoaded: true, standings: standings });
    }
};

/**
 *
 * @param {number} rounds
 * @param {Manager[]} managers
 * @returns {LeagueB_WeekMatchups[]}
 */
export const RoundRobinCreator = (rounds, managers, set) => {
    let leftArray = [];
    let rightArray = [];
    let masterMatchups = [];
    if (managers) {
        managers.sort((a, b) => a.entry - b.entry);
        for (let i = 0; i < managers.length; i++) {
            if (i % 2 === 0) {
                leftArray.push(managers[i]);
            } else {
                rightArray.push(managers[i]);
            }
        }

        // Add in 'BYE' if necessary
        if (leftArray.length !== rightArray.length) {
            rightArray.push('BYE');
        }

        // Init a master array to hold all the matchups

        let currentGameweek = 1;

        for (let x = 0; x < rounds; x++) {
            // Do one round robin
            for (let n = 0; n < leftArray.length * 2 - 1; n++) {
                let matchups = [];

                // remove 1 from array
                let anchor = leftArray.shift(); // Removes 1 from left array
                let shifted = leftArray.shift(); // Remove next element in line;

                // pop last element of right array
                let popped = rightArray.pop();

                // add element to beginning of right array
                rightArray.unshift(shifted);

                // Push popped element to left array
                leftArray.push(popped);

                // Add back in the 1 to the left array;
                leftArray.unshift(anchor);

                // Add matchups
                for (let j = 0; j < leftArray.length; j++) {
                    matchups.push({
                        managers: [leftArray[j], rightArray[j]],
                        teamA_entry: leftArray[j].entry,
                        teamB_entry: rightArray[j].entry,
                        teamA_score: '',
                        teamB_score: '',
                        winner_entry: null,
                        loser_entry: null,
                    });
                }

                // Add matchups to masterMatchups
                masterMatchups.push({
                    gameweek: currentGameweek,
                    matchups: matchups,
                });

                // Increment
                currentGameweek += 1;
            }
        }
    }
    set({ matchups: masterMatchups, matchupsLoaded: true });
};

/**
 *
 * @param {Manager[]} managers
 * @returns {LeagueB_Standings_Item[]}
 */
const PopulateStandings = (managers) => {
    let standings = [];
    managers.forEach((m) => {
        standings.push({
            manager: m,
            wins: 0,
            losses: 0,
            ties: 0,
            standingsPoints: 0,
            points: 0,
            currentRank: 0,
            previousRank: 0,
            pointsFor: 0,
            pointsAgainst: 0,
        });
    });
    return standings;
};

/**
 *
 * @param {LeagueB_Standings_Item} teamA
 * @param {LeagueB_Standings_Item} teamB
 * @param {Matchup} match
 */
const SetWinsLossesTies = (teamA, teamB, match) => {
    // Set Wins Losses Ties
    if (match.teamA_score > match.teamB_score) {
        teamA.wins += 1;
        teamB.losses += 1;
        teamA.standingsPoints += 2;
    }
    if (match.teamA_score < match.teamB_score) {
        teamA.losses += 1;
        teamB.wins += 1;
        teamB.standingsPoints += 2;
    }
    if (match.teamA_score === match.teamB_score) {
        teamA.ties += 1;
        teamB.ties += 1;
        teamA.standingsPoints += 1;
        teamB.standingsPoints += 1;
    }

    teamA.points += match.teamA_score;
    teamB.points += match.teamB_score;
    teamA.pointsFor += match.teamA_score;
    teamB.pointsFor += match.teamB_score;
    teamA.pointsAgainst += match.teamB_score;
    teamB.pointsAgainst += match.teamA_score;
};

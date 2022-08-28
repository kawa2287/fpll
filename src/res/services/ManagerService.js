/**
 *
 * @param {Object[]} managers
 * @param {number} gw
 * @param {Object} bootstrapStore
 * @param {*} set
 */
export const GetAllOwnedPlayersForMangers = async (managers, gw, set) => {
    let managerPlayers_alltime = [];
    if (managers.length > 0) {
        // Loop through all managers
        for await (let m of managers) {
            let selectedPlayers = [];
            // Loop through all gameweeks up to this point
            for (let i = 1; i <= gw; i++) {
                // Get list of players chosen for the given game week
                try {
                    const response = await fetch(
                        `/api/entry/${m.entry}/event/${i}/picks/`,
                    );
                    const result = await response.json();
                    const picks = result.picks;

                    // add picks to the list but no duplicates
                    for await (let pick of picks) {
                        if (selectedPlayers.length === 0) {
                            selectedPlayers.push(pick);
                        } else {
                            let dup = false;
                            for await (let uniqPlayer of selectedPlayers) {
                                if (uniqPlayer.element === pick.element) {
                                    dup = true;
                                    break;
                                }
                            }
                            if (!dup) {
                                selectedPlayers.push(pick);
                            }
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            managerPlayers_alltime.push({
                manager: m,
                players: selectedPlayers,
            });
        }
    }
    set({ managerPlayers_alltime: managerPlayers_alltime });
};

/**
 *
 * @param {[]} managerPlayers_alltime
 * @param {API_StatInstance[]} allGameweekStats
 * @param {[]} players
 * @param {*} set
 */
export const GenerateManagerStats = (
    managerPlayers_alltime,
    allGameweekStats,
    players,
    set,
) => {
    if (
        managerPlayers_alltime.length > 0 &&
        allGameweekStats.length > 0 &&
        players.length > 0
    ) {
        // Init the stats variable
        let managerStats = [];

        // Loop through all managers
        managerPlayers_alltime.forEach((manager) => {
            // Create a filter list
            let elementFilter = [];
            manager.players.forEach((p) => {
                elementFilter.push(p.element);
            });

            // filter stats to only include manager players;
            let filtered = allGameweekStats.filter((stat) =>
                elementFilter.includes(stat.id),
            );

            // Reduce down the stats
            let statObj = {};
            statNames.forEach((s) => {
                statObj[s] = ReduceStat(filtered, s);
            });

            // Push into managerStats
            managerStats.push({ manager: manager.manager, stats: statObj });
        });
        // Set State
        set({ managerPlayerStats: managerStats });
        set({ managerStatsLoaded: true });
    }
};

const statNames = [
    'minutes',
    'goals_scored',
    'assists',
    'clean_sheets',
    'goals_conceded',
    'own_goals',
    'penalties_saved',
    'penalties_missed',
    'yellow_cards',
    'red_cards',
    'saves',
    'bonus',
    'bps',
    'influence',
    'creativity',
    'threat',
    'ict_index',
    'total_points',
];

/**
 *
 * @param {object[]} filteredElements
 * @param {string} statName
 * @returns
 */
const ReduceStat = (filteredElements, statName) => {
    let stat = filteredElements.reduce(
        (sum, item) => sum + parseFloat(item.stats[statName]),
        0,
    );
    return stat;
};

/**
 *
 * @param {string} managerID
 * @returns {API_Transfers[]}
 */
export const GetAllTransfers = async (managerID) => {
    const response = await fetch(`/api/entry/${managerID}/transfers/`);
    const result = await response.json();

    return result;
};

/**
 *
 * @param {Manager[]} managers
 * @param {*} set
 * @returns {API_ManagerHistory}
 */
export const GetManagerHistory = async (managers, set) => {
    // Loop through each manager and retrieve their GW histories
    let managerHistories = [];
    if (managers.length > 0) {
        for await (let m of managers) {
            try {
                const response = await fetch(`/api/entry/${m.entry}/history/`);
                const result = await response.json();

                // add in manager enrty to object for future reference
                result['entry'] = m.entry;

                managerHistories.push(result);
            } catch (error) {
                console.error(error);
            }
        }
    }

    set({ managerHistories: managerHistories });
};

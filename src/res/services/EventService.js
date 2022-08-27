/**
 *
 * @param {API_bootstrapStatic} result
 * @param {('is_current'|'is_next'|'is_previous')} type
 */
export const DetermineGameweek = (result, type) => {
    let events = result.events;
    for (let i = 0; i < events.length; i++) {
        if (events[i][type]) {
            return events[i].id;
        }
    }
};

/**
 *
 * @param {number} gameweek
 * @param {Events} events
 */
export const DetermineIfGameweekHasBegun = (gameweek, events) => {
    if (events.length > 0) {
        return !events[gameweek].is_previous;
    }
};

/**
 *
 * @param {number} gameweek
 * @param {Events} events
 */
export const DetermineIfGameweekIsComplete = (gameweek, events) => {
    if (events.length > 0) {
        return events[gameweek - 1].finished;
    }
};

export const GetManagerPicksForGameWeek = async (
    managers,
    gameweek,
    bootstrapStore,
    set,
) => {
    const response = await fetch(`/api/event/${gameweek}/live/`);
    const result = await response.json();
    set({ elements: result });

    let managerPicks = [];
    if (DetermineIfGameweekHasBegun(gameweek, bootstrapStore.events)) {
        for await (var m of managers) {
            try {
                const managerResponse = await fetch(
                    `/api/entry/${m.entry}/event/${gameweek}/picks/`,
                );

                const managerResult = await managerResponse.json();
                let tempManager = { entry: m.entry, picks: [] };

                // Loop through manager players and assign points
                for await (var p of managerResult.picks) {
                    const playerId = p.element;
                    let playerTeam = null;

                    // Loop through all elements until found
                    if (bootstrapStore.players) {
                        for await (var el of bootstrapStore.players) {
                            if (el.id === playerId) {
                                // Do stuff
                                playerTeam = el.team;
                                break;
                            }
                        }
                    }
                    // Loop through all elements until found
                    for await (var e of result.elements) {
                        if (e.id === playerId) {
                            // Do stuff
                            tempManager.picks.push({
                                stats: e.explain,
                                id: e.id,
                                team: playerTeam,
                                multiplier: p.multiplier,
                            });
                            break;
                        }
                    }
                }
                managerPicks.push(tempManager);
            } catch (error) {
                console.error(error);
            }
        }
    }
    if (managerPicks.length > 0) {
        set({ managerPicks: managerPicks, mangerPickesLoaded: true });
    }
};

export const FetchAllGameweekStats = async (gw, set) => {
    // Loop through game weeks and pull in all stats for each gameweek
    let stats = [];

    for (let i = 1; i <= gw; i++) {
        try {
            const response = await fetch(`/api/event/${i}/live/`);
            const result = await response.json();
            stats = stats.concat(result.elements);
        } catch (error) {
            console.error(error);
        }
    }

    // Set the stats
    set({ allGameweekStats: stats });
};

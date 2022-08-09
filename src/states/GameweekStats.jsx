import create from 'zustand';

// Create Store
export const useGameweekStatsStore = create((set) => ({
    elements: [],
    managerPicks: [],
    fetch: async (managers, gameweek, bootstrapStore) => {
        const response = await fetch(`/api/event/${gameweek}/live/`);
        const result = await response.json();
        console.log(bootstrapStore);
        set({ elements: result });

        let managerPicks = [];
        for await (var m of managers) {
            const managerResponse = await fetch(
                `/api/entry/${m.entry}/event/${gameweek}/picks/`,
            );
            const managerResult = await managerResponse.json();
            let tempManager = { entry: m.entry, picks: [] };

            // Loop through manager players and assign points
            for await (var p of managerResult.picks) {
                const playerId = p.element;
                let playerTeam = null;
                // Loop theough all elements until found
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
        }
        set({ managerPicks: managerPicks });
    },
}));

import create from 'zustand';
import {
    GenerateManagerStats,
    GetAllOwnedPlayersForMangers,
} from '../res/services/ManagerService';

// Create Store
export const useManagerStore = create((set) => ({
    managers: [],
    managerPlayers_alltime: [],
    managerPlayerStats: [],
    standingsLoaded: false,
    managerStatsLoaded: false,
    fetch: async () => {
        const response = await fetch('/api/leagues-classic/1016416/standings/');
        const result = await response.json();
        set({ managers: await result.standings.results });
        set({ standingsLoaded: true });
    },
    fetchAllTimeOwnedPlayers: (managers, gw) =>
        GetAllOwnedPlayersForMangers(managers, gw, set),
    generateManagerStats: (managerPlayers_alltime, allGameweekStats, players) =>
        GenerateManagerStats(
            managerPlayers_alltime,
            allGameweekStats,
            players,
            set,
        ),
}));

import create from 'zustand';
import {
    GenerateManagerStats,
    GetAllOwnedPlayersForMangers,
    GetManagerHistory,
} from '../res/services/ManagerService';
import '../schemas/api/type_managerHistory';

// Create Store
export const useManagerStore = create((set) => ({
    managers: [],
    managerPlayers_alltime: [],
    managerPlayerStats: [],
    managerHistories: [],
    standingsLoaded: false,
    managerStatsLoaded: false,
    fetch: async () => {
        const response = await fetch('/api/leagues-classic/1016416/standings/');
        const result = await response.json();
        let mgrs = await result.standings.results;

        set({ managers: mgrs });
        set({ standingsLoaded: true });
    },
    fetchAllTimeOwnedPlayers: (managers, gw) => GetAllOwnedPlayersForMangers(managers, gw, set),
    generateManagerStats: (managerPlayers_alltime, allGameweekStats, players) =>
        GenerateManagerStats(managerPlayers_alltime, allGameweekStats, players, set),
    fetchManagerHistories: (managers) => GetManagerHistory(managers, set),
}));

/** @returns {API_ManagerHistory[]} */
export const useManagerHistories = () => useManagerStore((s) => s.managerHistories);

/** @returns {Manger[]} */
export const useManagers = () => useManagerStore((s) => s.managers);

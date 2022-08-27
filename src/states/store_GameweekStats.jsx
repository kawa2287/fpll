import create from 'zustand';
import {
    FetchAllGameweekStats,
    GetManagerPicksForGameWeek,
} from '../res/services/EventService';

// Create Store
export const useGameweekStatsStore = create((set) => ({
    elements: [],
    managerPicks: [],
    allGameweekStats: [],
    mangerPickesLoaded: false,
    fetch: (managers, gameweek, bootstrapStore) =>
        GetManagerPicksForGameWeek(managers, gameweek, bootstrapStore, set),
    fetchAllGameWeekStats: (gw) => FetchAllGameweekStats(gw, set),
}));

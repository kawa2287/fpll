import create from 'zustand';
import { DetermineCurrentGameweek } from '../res/services/EventService';
import '../schemas/api/type_bootstrapStatic';
// Create Store
export const useBootstrapStaticStore = create((set) => ({
    plTeams: [],
    players: [],
    events: [],
    phases: [],
    currentGW: 1,
    fetch: async () => {
        const response = await fetch('/api/bootstrap-static/');
        const result = await response.json();
        set({ plTeams: result.teams });
        set({ players: result.elements });
        set({ events: result.events });
        set({ phases: result.phases });
        set({ currentGW: DetermineCurrentGameweek(result) });
    },
}));

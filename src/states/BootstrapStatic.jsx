import create from 'zustand';

// Create Store
export const useBootstrapStaticStore = create((set) => ({
    plTeams: [],
    players: [],
    fetch: async () => {
        const response = await fetch('/api/bootstrap-static/');
        const result = await response.json();
        set({ plTeams: result.teams });
        set({ players: result.elements });
    },
}));

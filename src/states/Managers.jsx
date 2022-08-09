import create from 'zustand';

// Create Store
export const useManagerStore = create((set) => ({
    managers: [],
    fetch: async () => {
        const response = await fetch('/api/leagues-classic/1016416/standings/');
        const result = await response.json();
        set({ managers: result.standings.results });
    },
}));

import create from 'zustand';
import { RoundRobinCreator } from '../res/roundRobinCreator';

// Create Store
export const useMatchesStore = create((set) => ({
    matchups: [],
    setMatchups: (rounds, managers) => {
        console.log(managers);
        set({ matchups: RoundRobinCreator(rounds, managers) });
    },
}));

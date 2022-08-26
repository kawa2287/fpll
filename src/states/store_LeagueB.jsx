// This is the state holder for test league B
// League B is the head to head league

import create from 'zustand';
import {
    PopulateResults,
    RoundRobinCreator,
} from '../res/services/LeagueB_Service';

// Create Store
export const useLeagueB_store = create((set) => ({
    matchups: [],
    results: [],
    standings: [],
    matchupsLoaded: false,
    resultsLoaded: false,
    setMatchups: (rounds, managers) => RoundRobinCreator(rounds, managers, set),
    populateResults: (managerHistories, matchups, managers, events) =>
        PopulateResults(managerHistories, matchups, managers, events, set),
}));

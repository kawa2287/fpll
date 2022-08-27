import create from 'zustand';
import { GetFixtureResponse } from '../res/services/FixtureService';
// Create Store
export const useFixtureStore = create((set) => ({
    fixtures: [],
    fixturesLoaded: false,
    fetch: () => GetFixtureResponse(set),
}));

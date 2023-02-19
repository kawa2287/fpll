// This is the state holder for test league C
// League C is the weekly promotion/ relegation league
import create from 'zustand';
import { SetPotInfo } from '../res/services/LeagueC_Service';

// Create Store
export const useLeagueC_store = create((set) => ({
    buyInPerTeam: 20,
    totalPot: 0,
    remainingPot: 0,
    seedWeeks: 6,
    teamStatusArray: [],
    teamHistoryArray: [],
    setPotInfo: (managers, buyInPerTeam) =>
        SetPotInfo(managers, buyInPerTeam, set),
}));

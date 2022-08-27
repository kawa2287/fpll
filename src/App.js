import './App.css';
import React from 'react';
import { View } from 'native-base';

import DrawerNav from './components/DrawerNav/DrawerNav';
import HeaderNavBar from './components/HeaderNavBar/HeaderNavBar';
import { GetScreenType } from './states/store_ScreenQuery';
import { Outlet } from 'react-router-dom';
import { useManagerStore } from './states/store_Managers';
import { useBootstrapStaticStore } from './states/store_BootstrapStatic';
import { useGameweekStatsStore } from './states/store_GameweekStats';
import { useLeagueB_store } from './states/store_LeagueB';
import { useFixtureStore } from './states/store_Fixtures';

function App() {
    // Determine Screen Type
    GetScreenType();

    // Get Stores
    const managerStore = useManagerStore();
    const bootstrapStore = useBootstrapStaticStore();
    const gameweekStatsStore = useGameweekStatsStore();
    const leagueB_Store = useLeagueB_store();
    const fixtureStore = useFixtureStore();
    const gw = bootstrapStore.currentGW;

    // Handle API calls here (this will be called upon loading any route)
    React.useEffect(() => {
        managerStore.fetch();
        bootstrapStore.fetch();
        fixtureStore.fetch();
    }, []);

    // Secondary Hooks to Build Data
    React.useEffect(() => {
        gameweekStatsStore.fetch(managerStore.managers, gw, bootstrapStore);
        gameweekStatsStore.fetchAllGameWeekStats(gw);
        managerStore.fetchAllTimeOwnedPlayers(managerStore.managers, gw);
        managerStore.fetchManagerHistories(managerStore.managers);
        leagueB_Store.setMatchups(3, managerStore.managers);
    }, [managerStore.managers, bootstrapStore, gw]);

    // Build the manager stats
    React.useEffect(() => {
        managerStore.generateManagerStats(
            managerStore.managerPlayers_alltime,
            gameweekStatsStore.allGameweekStats,
            bootstrapStore.players,
        );
    }, [
        managerStore.managerPlayers_alltime,
        gameweekStatsStore.allGameweekStats,
        bootstrapStore.players,
    ]);

    // Create League B Stats
    React.useEffect(() => {
        leagueB_Store.populateResults(
            managerStore.managerHistories,
            leagueB_Store.matchups,
            managerStore.managers,
            bootstrapStore.events,
        );
    }, [
        managerStore.managerHistories,
        managerStore.managers,
        leagueB_Store.matchups,
        bootstrapStore.events,
    ]);

    return (
        <View w={'100%'} h="100%" display="flex" alignItems={'center'}>
            <DrawerNav />
            <HeaderNavBar />
            <Outlet />
        </View>
    );
}

export default App;

import './App.css';
import React from 'react';
import { View } from 'native-base';

import DrawerNav from './components/DrawerNav/DrawerNav';
import HeaderNavBar from './components/HeaderNavBar/HeaderNavBar';
import { GetScreenType } from './states/store_ScreenQuery';
import { Outlet } from 'react-router-dom';
import { RoundRobinCreator } from './res/roundRobinCreator';
import { useManagerStore } from './states/store_Managers';
import { useBootstrapStaticStore } from './states/store_BootstrapStatic';
import { useGameweekStatsStore } from './states/store_GameweekStats';

function App() {
    // Determine Screen Type
    GetScreenType();

    // Get Stores
    const managerStore = useManagerStore();
    const bootstrapStore = useBootstrapStaticStore();
    const gameweekStatsStore = useGameweekStatsStore();
    const gw = bootstrapStore.currentGW;

    // Handle API calls here (this will be called upon loading any route)
    React.useEffect(() => {
        managerStore.fetch();
        bootstrapStore.fetch();
    }, []);

    // Secondary Hooks to Build Data
    React.useEffect(() => {
        gameweekStatsStore.fetch(managerStore.managers, gw, bootstrapStore);
        gameweekStatsStore.fetchAllGameWeekStats(gw);
        managerStore.fetchAllTimeOwnedPlayers(managerStore.managers, gw);
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

    RoundRobinCreator(3);
    return (
        <View w={'100%'} h="100%" display="flex" alignItems={'center'}>
            <DrawerNav />
            <HeaderNavBar />
            <Outlet />
        </View>
    );
}

export default App;

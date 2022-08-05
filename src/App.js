import './App.css';
import React from 'react';
import { View } from 'native-base';

import DrawerNav from './components/DrawerNav/DrawerNav';
import HeaderNavBar from './components/HeaderNavBar/HeaderNavBar';
import { GetScreenType } from './states/ScreenQuery';
import { Outlet } from 'react-router-dom';

function App() {
    // Determine Screen Type
    GetScreenType();

    return (
        <View w={'100%'} h="100%" display="flex" alignItems={'center'}>
            <DrawerNav />
            <HeaderNavBar />
            <Outlet />
        </View>
    );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { appMainTheme } from './styling/themes';
import { NativeBaseProvider } from 'native-base';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Standings from './screens/standings/Standings';
import Fixtures from './screens/fixtures/Fixtures';
import Insights from './screens/insights/Insights';
import Matchups from './screens/matchups/Matchups';
import Leaderboards from './screens/leaderboards/Leaderboards';
import StandingsB from './screens/standingsB/StandingsB';
import Teams from './screens/Teams/Teams';
import TeamInfo from './components/TeamInfo/TeamInfo';
import StandingsC from './screens/standingsC/StandingsC';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <NativeBaseProvider theme={appMainTheme}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index="standings" element={<Standings />}></Route>
                    <Route path="standingsB" element={<StandingsB />}></Route>
                    <Route path="standingsC" element={<StandingsC />}></Route>
                    <Route path="fixtures" element={<Fixtures />}></Route>
                    <Route path="insights" element={<Insights />}></Route>
                    <Route path="matchups" element={<Matchups />}></Route>
                    <Route path="teams" element={<Teams />}>
                        <Route path=":teamEntry" element={<TeamInfo />} />
                    </Route>
                    <Route path="leaderboards" element={<Leaderboards />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </NativeBaseProvider>,
);

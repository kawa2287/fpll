import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { appMainTheme } from './styling/themes';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <NavigationContainer>
            <NativeBaseProvider theme={appMainTheme}>
                <App />
            </NativeBaseProvider>
        </NavigationContainer>
    </React.StrictMode>,
);

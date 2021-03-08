import React, { useEffect, useState } from 'react';

import { Box, Container } from '@material-ui/core';
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter.component';
import styled from 'styled-components';
import AppHeader from './components/AppHeader/AppHeader.component';
import HistoryList from './components/HistoryList/HistoryList.component';
import ConverterServices from './services/converter.services';
import Spinner from './components/Spinner/Spinner';
import { addToHistory, clearHistory, getHistory } from './helpers/utils';
import { T_HistoryItem } from './types';
// Testing commit account

const AppContainer = styled(Container)`
    &.app-container {
        padding: 0px;
        padding-bottom: 24px;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        .app-container__history-container {
            padding: 32px 32px 16px;
        }
        .app-container__loader {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`;

const App: React.FC = function () {
    // indicates if application is setting up.
    const [isSettingUp, setIsSettingUp] = useState(true);
    const [codes, setCodes] = useState([]);
    const [history, setHistory] = useState(getHistory());

    useEffect(() => {
        ConverterServices.getCodesList().then((res) => {
            setCodes(res.data.codes);
            setIsSettingUp(false);
        });
    }, []);

    const addResponseToHistory = (item: T_HistoryItem) => {
        setHistory(addToHistory(item));
    };

    const handleClearHistory = () => {
        clearHistory();
        setHistory([]);
    };

    return (
        <AppContainer className="app-container" maxWidth="sm">
            {isSettingUp ? (
                <Box className="app-container__loader">
                    <Spinner />
                </Box>
            ) : (
                <>
                    <AppHeader>
                        <CurrencyConverter
                            codes={codes}
                            addToHistory={addResponseToHistory}
                        />
                    </AppHeader>
                    <Box className="app-container__history-container">
                        <HistoryList
                            items={history}
                            onClearHistory={handleClearHistory}
                        />
                    </Box>
                </>
            )}
        </AppContainer>
    );
};

export default App;

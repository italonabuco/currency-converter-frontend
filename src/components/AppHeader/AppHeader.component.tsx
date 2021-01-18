import React from 'react';
import { Avatar, Box, Typography } from '@material-ui/core';
import styled from 'styled-components';

const AppHeaderWrapper = styled(Box)`
    &.app-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 32px;
        background-color: #2196f3;
        border-bottom-left-radius: 32px;
        border-bottom-right-radius: 32px;

        .app-header__avatar {
            border: 2px solid white;
            background-color: transparent;
            font-weight: 700;
            font-size: 28px;
            margin-bottom: 16px;
        }

        .app-header__title {
            font-weight: 400;
            font-size: 24px;
            color: white;
            margin-bottom: 24px;
        }
        .app-header__container {
            width: 100%;
        }
    }
`;

const AppHeader: React.FC = ({ children }) => {
    return (
        <AppHeaderWrapper className="app-header">
            <Avatar className="app-header__avatar">$</Avatar>
            <Typography className="app-header__title" variant="h1">
                Currency Converter
            </Typography>
            <Box className="app-header__container">{children}</Box>
        </AppHeaderWrapper>
    );
};

export default AppHeader;

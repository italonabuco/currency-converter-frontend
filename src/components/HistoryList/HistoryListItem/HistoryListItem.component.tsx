import React from 'react';
import { Box, Divider, Paper } from '@material-ui/core';
import SwapHorizontalCircleTwoToneIcon from '@material-ui/icons/SwapHorizontalCircleTwoTone';
import styled from 'styled-components';
import CurrencyInfo from '../../CurrencyInfo/CurrencyInfo.component';
import { T_HistoryItem } from '../../../types';

const HistoryListItemWrapper = styled(Paper)`
    &.history-list-item {
        padding: 16px;
        border-radius: 8px;
        margin-bottom: 16px;
        background-color: #f5f5f5;
        .history-list-item__currency-info-container {
            display: flex;
            justify-content: space-around;
            align-items: center;
            .history-list-item__currency-info-container__icon {
                color: #2198f3;
                font-size: 32px;
            }
        }
        .history-list-item__rate-info {
            margin-top: 16px;
            display: flex;
            font-size: 12px;
            justify-content: center;
            color: #636f7a;
        }
    }
`;

const HistoryListItem: React.FC<T_HistoryItem> = ({ date, to, from }) => {
    return (
        <HistoryListItemWrapper className="history-list-item" elevation={3}>
            <Box className="history-list-item__currency-info-container">
                <CurrencyInfo {...from} />
                <SwapHorizontalCircleTwoToneIcon className="history-list-item__currency-info-container__icon" />
                <CurrencyInfo {...to} />
            </Box>
            <Box className="history-list-item__rate-info">
                {date}
                <Divider
                    orientation="vertical"
                    flexItem
                    style={{ margin: '0px 8px' }}
                />
                {`${from.rate} ${from.abbr} = ${to.rate} ${to.abbr}`}
            </Box>
        </HistoryListItemWrapper>
    );
};

export default HistoryListItem;

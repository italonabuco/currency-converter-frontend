import React from 'react';
import styled from 'styled-components';
import { Box, Button, Typography } from '@material-ui/core';
import HistoryListItem from './HistoryListItem/HistoryListItem.component';
import { T_HistoryItem } from '../../types';

const HistoryListWrapper = styled(Box)`
    &.history-list {
        .history-list__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
            .history-list__header__title {
                font-size: 20px;
                color: #3e4851;
            }
            .history-list__header__clear-button {
                background-color: #f73e66;
                color: white;
                &:hover {
                    background-color: #ff2b59;
                }
                &:disabled {
                    background-color: #ccc;
                }
            }
        }
        .history-list__content {
            .history-list__content-empty {
                text-align: center;
                font-size: 16px;
                color: #bbb;
            }
        }
    }
`;

interface I_HistoryListProps {
    items: T_HistoryItem[];
    onClearHistory: () => void;
}

const HistoryList: React.FC<I_HistoryListProps> = ({
    items,
    onClearHistory,
}) => {
    return (
        <HistoryListWrapper className="history-list">
            <Box className="history-list__header">
                <Typography
                    variant="h3"
                    className="history-list__header__title"
                >
                    Previous conversions
                </Typography>
                <Button
                    className="history-list__header__clear-button"
                    onClick={onClearHistory}
                    variant="contained"
                    size="small"
                    disabled={items.length === 0}
                    data-testid="clear-button"
                >
                    Clear
                </Button>
            </Box>
            <Box className="history-list__content">
                {items.length === 0 ? (
                    <Typography
                        variant="h3"
                        className="history-list__content-empty"
                    >
                        Empty history
                    </Typography>
                ) : (
                    items.map((item, index) => (
                        <HistoryListItem {...item} key={index} />
                    ))
                )}
            </Box>
        </HistoryListWrapper>
    );
};

export default HistoryList;

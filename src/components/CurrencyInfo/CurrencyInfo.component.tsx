import React from 'react';
import { Box, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { T_CurrencyInfo } from '../../types';

const CurrencyInfoWrapper = styled(Box)`
    &.currency-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        .currency-info__details {
            display: flex;
            align-items: center;
            .currenct-info__details__img {
                width: 30px;
                height: 30px;
            }
            .currency-info__details__abbv {
                margin-left: 8px;
                font-weight: 500;
                color: #3e4851;
                font-size: 14px;
            }
        }
        .currency-info__value {
            font-weight: 500;
            font-size: 18px;
            color: #3e4851;
        }
    }
`;

const CurrencyInfo: React.FC<T_CurrencyInfo> = ({ abbr, value }) => {
    return (
        <CurrencyInfoWrapper className="currency-info">
            <div className="currency-info__details">
                <div
                    className={`currency-flag currency-flag-lg currency-flag-${abbr.toLocaleLowerCase()}`}
                ></div>
                <Typography className="currency-info__details__abbv">
                    {abbr}
                </Typography>
            </div>
            <Typography className="currency-info__value">{value}</Typography>
        </CurrencyInfoWrapper>
    );
};

export default CurrencyInfo;

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ORDER_DIRECTIONS } from './tradeConstants';
import I18n from '../../common/i18n/I18n';

const styles = theme => ({
  balanceAreaStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    color: theme.colors.textColor.tradeBalanceArea,
    minHeight: '36px',
    width: '100%',
    borderTop: 'dashed 1px rgba(48, 66, 98, 0.12)',
    borderBottom: 'dashed 1px rgba(48, 66, 98, 0.12)',
    fontFamily: 'Roboto',
    fontSize: '12px',
    alignItems: 'center',
    padding: '0px 12px'
  },
  balanceValue: {
    color: theme.colors.textColor.balanceValue
  }
});

const TradeBalanceArea = props => (
  <div
    className={props.classes.balanceAreaStyle}
    style={{
      backgroundColor:
        props.orderDirection === ORDER_DIRECTIONS.BUY
          ? props.backgroundColorForBuy
          : props.backgroundColorForSell
    }}
  >
    <span>{I18n.translate('general_available_balance')}</span>
    <span className={props.classes.balanceValue}>
      {props.balanceAmount}{' '}
      {props.orderDirection === ORDER_DIRECTIONS.BUY
        ? props.counterCurrencyCode
        : props.baseCurrencyCode}
    </span>
  </div>
);

export default withStyles(styles)(TradeBalanceArea);

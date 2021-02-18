import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import I18n from '../../../common/i18n/I18n';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: '12px',
    height: '16px',
    color: '#ffffff'
  },
  price: {
    height: '24px',
    fontSize: '16px',
    color: '#ffffff',
    fontWeight: '900'
  },
  volume: {
    color: '#ffffff'
  },
  volumeArea: {
    height: '16px',
    color: 'rgba(255, 255, 255, 0.54)',
    fontSize: '11px'
  },
  change: {
    color: '#f87979;'
  },
  changeArea: {
    color: 'rgba(255, 255, 255, 0.54)',
    fontSize: '11px',
    display: 'flex'
  },
  up: {
    color: theme.colors.textColor.green
  },
  down: {
    color: theme.colors.textColor.red
  }
});

const MarketContainer = ({
  classes,
  market,
  last_price,
  volume_24h,
  change_24h
}) => (
  <div className={classes.root}>
    <div className={classes.title}>
      {`${market.base_currency_code}/${market.counter_currency_code}`}
    </div>
    <div className={classes.price}>
      {last_price} {market.counter_currency_code}
    </div>
    <div className={classes.volumeArea}>
      {I18n.translate('market_bar_volume_24h')}:{' '}
      <span className={classes.volume}>{volume_24h}</span>{' '}
      {market.base_currency_code}
    </div>
    <div className={classes.changeArea}>
      {I18n.translate('market_bar_change_24h')}:&nbsp;
      <div
        className={classNames(
          classes.valueRow,
          { [classes.up]: change_24h > 0 },
          { [classes.down]: change_24h < 0 }
        )}
      >
        {`${change_24h > 0 ? '+' : ''}${change_24h}%`}
      </div>
    </div>
  </div>
);

export default withStyles(styles)(MarketContainer);

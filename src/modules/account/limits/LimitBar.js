import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { formatMoney } from '../../../common/utils/numberUtil';

const styles = theme => ({
  container: {
    display: 'flex',
    alignItems: 'flex-end',
    width: '100%'
  },
  barContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    width: '100%'
  },
  leftArea: {},
  leftBar: {
    height: '12px',
    background: '#3ab2ee',
    border: '2px solid #3ab2ee',
    borderRadius: '16px 0 0 16px'
  },
  rightBar: {
    height: '12px',
    background: theme.colors.background.checkboxBorder
  },
  totalLabel: {
    color: theme.colors.textColor.limitBarTotalLabel,
    fontSize: '14px',
    fontWeight: 'bold',
    paddingLeft: '16px',
    width: '140px'
  },
  usedLabel: {
    paddingBottom: '8px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#3ab2ee',
    textAlign: 'right'
  }
});

const LimitBar = ({ classes, remaining, total }) => {
  const used = total - remaining;

  return (
    <div className={classes.container}>
      <div className={classes.barContainer}>
        <div className={classes.leftArea} style={{ flex: used }}>
          <div className={classes.usedLabel}>{formatMoney(used, 2)}</div>
          <div className={classes.leftBar} />
        </div>
        <div className={classes.rightBar} style={{ flex: remaining }} />
      </div>
      <div className={classes.totalLabel}>{formatMoney(total, 2)} TL</div>
    </div>
  );
};

export default withStyles(styles)(LimitBar);

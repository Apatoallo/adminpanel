import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { WarningIcon } from '../icons/Icons';

const styles = theme => ({
  infoBarItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '7px',
    paddingBottom: '7px'
  },
  message: {
    paddingLeft: '11px',
    fontSize: '15px',
    color: theme.colors.textColor.formText
  }
});

const Message = ({ classes, type, text }) => (
  <div className={classes.infoBarItem}>
    {type === 'warning' ? <WarningIcon /> : null}
    <span className={classes.message}>{text}</span>
  </div>
);

export default withStyles(styles)(Message);

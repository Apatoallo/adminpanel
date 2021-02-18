import React from 'react';
import StyledPaper from '../common/StyledPaper';
import { withStyles } from '@material-ui/core/styles';
import { CloseIcon } from '../icons/Icons';
import Message from './Message';

const styles = theme => ({
  infoBarContainer: {
    marginTop: theme.unit.margin,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    boxSizing: 'border-box',
    height: 'auto',
    top: '136px',
    padding: '16px 24px 16px 16px'
  },
  infoBarContainerLeft: {
    display: 'flex',
    flexDirection: 'column'
  },
  infoBarContainerRight: {
    display: 'flex',
    alignItems: 'center'
  },
  infoBarCloseIcon: {
    cursor: 'pointer'
  },
  infoBarItem: {
    paddingTop: '7px',
    paddingBottom: '7px'
  },
  fillColor: {
    fill: theme.colors.textColor.menuItem
  }
});

const InfoBar = ({
  messages = [],
  closable = true,
  onClose = f => f,
  classes
}) => (
  <div>
    <StyledPaper className={classes.infoBarContainer}>
      <div className={classes.infoBarContainerLeft}>
        {messages.map((message, i) => <Message key={i} {...message} />)}
      </div>
      {closable && (
        <div className={classes.infoBarContainerRight}>
          <div className={classes.infoBarCloseIcon} onClick={onClose}>
            <CloseIcon className={classes.fillColor} />
          </div>
        </div>
      )}
    </StyledPaper>
  </div>
);

export default withStyles(styles)(InfoBar);

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import I18n from '../../common/i18n/I18n';

const styles = theme => ({
  iconStyle: {
    padding: '0px',
    margin: '0px'
  },
  connectionSuccessStyle: {
    color: theme.colors.textColor.green,
    fontSize: '22px'
  },
  connectionFailureStyle: {
    color: theme.colors.textColor.white54,
    fontSize: '22px'
  }
});

const ConnectionStatus = ({ className = {}, classes, connected = false }) => (
  <div className={className}>
    <Tooltip
      title={I18n.translate(
        connected
          ? 'connection_status_success_text'
          : 'connection_status_failure_text'
      )}
    >
      <IconButton className={classes.iconStyle}>
        <Icon
          className={
            connected
              ? classes.connectionSuccessStyle
              : classes.connectionFailureStyle
          }
        >
          {connected ? 'wifi' : 'wifi_off'}
        </Icon>
      </IconButton>
    </Tooltip>
  </div>
);

export default withStyles(styles)(ConnectionStatus);

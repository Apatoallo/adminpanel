import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { MobileDeviceIcon } from '../icons/Icons';
import I18n from '../../common/i18n/I18n';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    boxSizing: 'border-box',
    borderLeft: '#3ab2ee 3px solid;',
    backgroundColor: theme.colors.background.contrastRow,
    padding: '12px',
    color: theme.colors.textColor.menuItem,
    marginBottom: '15px',
    marginRight: '12px'
  },
  deviceInfo: {
    padding: '0 16px',
    display: 'flex',
    flexDirection: 'column'
  },
  text: {
    lineHeight: '1.5',
    fontSize: '16px'
  },
  hint: {
    fontSize: '16px',
    opacity: '.5'
  },
  fillColor: {
    fill: theme.colors.background.settingsIcon
  }
});

const Google2FA = ({ classes }) => (
  <div className={classes.container}>
    <div>
      <MobileDeviceIcon className={classes.fillColor} />
    </div>
    <div className={classes.deviceInfo}>
      <div className={classes.text}>
        {I18n.translate('settings_auth_google2fa_title')}
      </div>
      <div className={classes.hint}>
        {I18n.translate('settings_auth_google2fa_description')}
      </div>
    </div>
  </div>
);

export default withStyles(styles)(Google2FA);

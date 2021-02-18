import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { MobileDeviceIcon, RemoveDeviceIcon } from '../icons/Icons';
import I18n from '../../common/i18n/I18n';
import moment from 'moment';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    borderLeft: '#3ad09f 3px solid;',
    backgroundColor: theme.colors.background.contrastRow,
    padding: '12px',
    marginBottom: '15px',
    '@media screen and (max-width: 600px)': {
      flexDirection: 'column'
    }
  },
  leftPanel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '270px',
    '@media screen and (max-width: 600px)': {
      width: 'auto',
      wordBreak: 'break-all'
    }
  },
  deviceInfo: {
    padding: '0 16px',
    display: 'flex',
    flexDirection: 'column',
    '@media screen and (max-width: 600px)': {
      paddingRight: '0',
      marginBottom: '12px'
    }
  },
  deviceName: {
    lineHeight: '1.5',
    fontSize: '16px'
  },
  deviceId: {
    fontSize: '16px',
    opacity: '.5',
    '@media screen and (max-width: 600px)': {
      fontSize: '14px'
    }
  },
  middlePanel: {
    display: 'flex',
    flexDirection: 'column',
    borderLeft: theme.colors.borderColor.deviceSeperatorBorder,
    padding: '5px 0 5px 16px',
    '@media screen and (max-width: 600px)': {
      border: 'none',
      padding: '0'
    }
  },
  middlePanelTitle: {
    lineHeight: '1.5',
    fontSize: '16px'
  },
  middlePanelText: {
    fontSize: '16px',
    opacity: '.5'
  },
  rightPanel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  rightPanelLine: {
    lineHeight: '1.5',
    display: 'flex',
    flexDirection: 'row',
    padding: '4px',
    cursor: 'pointer'
  },
  rightPanelLabel: {
    color: theme.colors.textColor.red,
    paddingRight: '10px'
  },
  rightPanelButton: {
    display: 'flex',
    alignItems: 'center',
    color: theme.colors.textColor.red,
    paddingBottom: '2px'
  },
  title: {
    marginBottom: '20px',
    fontSize: '14px',
    color: theme.colors.textColor.grey54,
    fontWeight: '500'
  },
  content: {
    fontSize: '14px',
    color: theme.colors.textColor.grey54
  },
  fillColor: {
    fill: theme.colors.background.settingsIcon
  }
});

const MobileDevice = ({ apikey, name, date, classes, onClick = f => f }) => (
  <div className={classes.container}>
    <div className={classes.leftPanel}>
      <div>
        <MobileDeviceIcon className={classes.fillColor} />
      </div>
      <div className={classes.deviceInfo}>
        <div className={classes.deviceName}>{name}</div>
        <div className={classes.deviceId}>{apikey}</div>
      </div>
    </div>
    <div className={classes.middlePanel}>
      <div className={classes.middlePanelTitle}>
        {I18n.translate('settings_last_access_label')}
      </div>
      <div className={classes.middlePanelText}>
        {moment(date).format('DD.MM.YYYY HH:mm')}
      </div>
    </div>
    <div className={classes.rightPanel}>
      <div className={classes.rightPanelLine} onClick={onClick}>
        <div className={classes.rightPanelLabel}>
          {I18n.translate('settings_remove_label')}
        </div>
        <div className={classes.rightPanelButton}>
          <RemoveDeviceIcon />
        </div>
      </div>
    </div>
  </div>
);

export default withStyles(styles)(MobileDevice);

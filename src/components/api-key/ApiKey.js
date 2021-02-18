import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  ApiKeyIcon,
  RemoveDeviceIcon,
  DeactivateIcon,
  ActivateIcon
} from '../icons/Icons';
import classNames from 'classnames';
import I18n from '../../common/i18n/I18n';
import moment from 'moment/moment';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    backgroundColor: theme.colors.background.contrastRow,
    padding: '12px',
    marginBottom: '15px',
    width: '100%',
    '@media screen and (max-width: 600px)': {
      flexDirection: 'column'
    }
  },
  active: {
    borderLeft: '#3ad09f 3px solid;'
  },
  passive: {
    borderLeft: '#8994a6 3px solid;'
  },
  leftPanel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '@media screen and (max-width: 600px)': {
      width: 'auto',
      wordBreak: 'break-all'
    }
  },
  deviceInfo: {
    paddingLeft: '16px',
    display: 'flex',
    flexDirection: 'column',
    '@media screen and (max-width: 600px)': {
      paddingRight: '0',
      marginBottom: '12px'
    }
  },
  deviceInfoLine: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row'
  },
  deviceName: {
    lineHeight: '1.5',
    fontSize: '16px'
  },
  deviceId: {
    paddingLeft: '8px',
    fontSize: '16px',
    lineHeight: '1.5',
    opacity: '.5',
    '@media screen and (max-width: 600px)': {
      fontSize: '14px'
    }
  },
  deviceStatus: {
    fontSize: '14px',
    opacity: '.5'
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
    paddingRight: '10px'
  },
  rightPanelLabelRed: {
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
  },
  strokeColor: {
    stroke: theme.colors.background.settingsIcon
  }
});

const ApiKey = ({
  apikey,
  secretkey,
  status,
  add_date,
  classes,
  removeApiKey = f => f,
  deactivateApiKey = f => f,
  activateApiKey = f => f
}) => (
  <div
    className={classNames(
      classes.container,
      { [classes.active]: status === 'ACTV' },
      { [classes.passive]: status !== 'ACTV' }
    )}
  >
    <div className={classes.leftPanel}>
      <div>
        <ApiKeyIcon className={classes.fillColor} />
      </div>
      <div className={classes.deviceInfo}>
        <div className={classes.deviceInfoLine}>
          <div className={classes.deviceName}>Api Key:</div>
          <div className={classes.deviceId}>{apikey}</div>
        </div>
        <div className={classes.deviceInfoLine}>
          <div className={classes.deviceName}>Secret Key:</div>
          <div className={classes.deviceId}>{secretkey}</div>
        </div>
        <div className={classes.deviceInfoLine}>
          <div className={classes.deviceStatus}>
            {status === 'WAIT'
              ? I18n.translate('settings_status_pending_confirmation')
              : status === 'ACTV'
                ? I18n.translate('settings_status_active')
                : I18n.translate('settings_status_deactive')}
          </div>
        </div>
      </div>
    </div>
    <div className={classes.middlePanel}>
      <div className={classes.middlePanelTitle}>
        {I18n.translate('settings_created_date')}
      </div>
      <div className={classes.middlePanelText}>
        {moment(add_date).format('DD.MM.YYYY HH:mm')}
      </div>
    </div>
    <div className={classes.middlePanel}>
      <div className={classes.middlePanelTitle}>
        {I18n.translate('settings_account_name')}
      </div>
      <div className={classes.middlePanelText}>
        {I18n.translate('settings_main_account')}
      </div>
    </div>
    <div className={classes.rightPanel}>
      <div className={classes.rightPanelLine} onClick={removeApiKey}>
        <div className={classes.rightPanelLabelRed}>
          {I18n.translate('settings_remove_label')}
        </div>
        <div className={classes.rightPanelButton}>
          <RemoveDeviceIcon />
        </div>
      </div>
      <div
        className={classes.rightPanelLine}
        onClick={status === 'ACTV' ? deactivateApiKey : activateApiKey}
      >
        <div className={classes.rightPanelLabel}>
          {status === 'ACTV' && I18n.translate('settings_deactivate_label')}
          {status === 'DSBL' && I18n.translate('settings_activate_label')}
        </div>
        <div className={classes.rightPanelButton}>
          {status === 'ACTV' && (
            <DeactivateIcon
              className={classes.fillColor}
              strokeClassName={classes.strokeColor}
            />
          )}
          {status === 'DSBL' && <ActivateIcon className={classes.fillColor} />}
        </div>
      </div>
    </div>
  </div>
);

export default withStyles(styles)(ApiKey);

import React from 'react';
import I18n from '../../../common/i18n/I18n';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import StyledPaper from '../../../components/common/StyledPaper';
import classNames from 'classnames';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 0px 20px 0px',
    backgroundColor: theme.colors.background.paper,
    marginTop: theme.unit.margin,
    boxSizing: 'border-box'
  },
  divider: {
    height: '2px',
    backgroundColor: theme.colors.background.menuDivider
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 10px 0px 26px',
    color: theme.colors.textColor.menuItem,
    boxSizing: 'border-box',
    fontSize: '14px',
    textDecoration: 'none'
  },
  header: {
    height: '28px',
    marginBottom: '5px',
    color: theme.colors.textColor.tableHeader
  },
  item: {
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'column'
  },
  hint: {
    fontSize: '14px',
    lineHeight: '1.71',
    opacity: '.5'
  },
  button: {
    borderRadius: '19px',
    textTransform: 'none',
    marginRight: '17px',
    height: '26px',
    minHeight: '26px',
    minWidth: '72px',
    lineHeight: '14px'
  },
  switch: {
    marginRight: '10px'
  }
});

class NotificationSettings extends React.PureComponent {
  handleChange = name => (event, checked) => {
    const data = {
      cn_type: name.split('.')[0],
      trx_code: name.split('.')[1],
      channel: name.split('.')[2],
      value: checked
    };
    this.props
      .saveSettings(data)
      .then(resp => {
        if (resp.payload.data.status === 'error') {
          this.props.showDialog({
            title: I18n.translate('general_error'),
            text: resp.payload.data.reason,
            okButtonText: I18n.translate('general_ok')
          });
        } else {
          this.props.showSnackbar(
            I18n.translate('settings_change_notification_success_message')
          );
          this.props.getDetail();
        }
      })
      .catch(() => {
        this.props.showDialog({
          title: I18n.translate('general_error'),
          text: I18n.translate('general_error_description'),
          okButtonText: I18n.translate('general_ok')
        });
      });
  };

  render() {
    const { settings, classes } = this.props;

    return (
      <div>
        <StyledPaper className={classes.container}>
          <div className={classes.line}>
            <div className={classNames(classes.item, classes.header)}>
              {I18n.translate('settings_confirmation_settings_title')}
            </div>
          </div>
          <Divider className={classes.divider} />
          <div className={classes.line}>
            <div className={classes.item}>
              <div>
                {I18n.translate(
                  'settings_confirmation_settings_withdrawal_label'
                )}
              </div>
              <div className={classes.hint}>
                {I18n.translate(
                  'settings_confirmation_settings_withdrawal_description'
                )}
              </div>
            </div>
            <div className={classes.item}>
              <Switch
                color="primary"
                className={classes.switch}
                checked={settings.C.WD.E}
                onChange={this.handleChange('C.WD.E')}
              />
            </div>
          </div>
          <div className={classes.line}>
            <div className={classes.item}>
              <div>{I18n.translate('confirmation_description_new_login')}</div>
              <div className={classes.hint}>
                {I18n.translate('confirmation_description_new_login_hint')}
              </div>
            </div>
            <div className={classes.item}>
              <Switch
                color="primary"
                className={classes.switch}
                checked={settings.C.NI.E}
                onChange={this.handleChange('C.NI.E')}
              />
            </div>
          </div>
        </StyledPaper>
        <StyledPaper className={classes.container}>
          <div className={classes.line}>
            <div className={classNames(classes.item, classes.header)}>
              {I18n.translate('settings_notification_settings_title')}
            </div>
          </div>
          <Divider className={classes.divider} />
          <div className={classes.line}>
            <div className={classes.item}>
              <div>{I18n.translate('notification_description_withdrawal')}</div>
              <div className={classes.hint}>
                {I18n.translate('notification_description_withdrawal_hint')}
              </div>
            </div>
            <div className={classes.item}>
              <Switch
                color="primary"
                className={classes.switch}
                checked={settings.N.WD.E}
                onChange={this.handleChange('N.WD.E')}
              />
            </div>
          </div>
          <div className={classes.line}>
            <div className={classes.item}>
              <div>{I18n.translate('notification_description_deposit')}</div>
              <div className={classes.hint}>
                {I18n.translate('notification_description_deposit_hint')}
              </div>
            </div>
            <div className={classes.item}>
              <Switch
                color="primary"
                className={classes.switch}
                checked={settings.N.DP.E}
                onChange={this.handleChange('N.DP.E')}
              />
            </div>
          </div>
          <div className={classes.line}>
            <div className={classes.item}>
              <div>{I18n.translate('notification_description_new_login')}</div>
              <div className={classes.hint}>
                {I18n.translate('notification_description_new_login_hint')}
              </div>
            </div>
            <div className={classes.item}>
              <Switch
                color="primary"
                className={classes.switch}
                checked={settings.N.NI.E}
                onChange={this.handleChange('N.NI.E')}
              />
            </div>
          </div>
        </StyledPaper>
      </div>
    );
  }
}

export default withStyles(styles)(NotificationSettings);

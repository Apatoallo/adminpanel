import React from 'react';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import InfoPane from '../../../../components/common/InfoPane';
import I18n from '../../../../common/i18n/I18n';
import classNames from 'classnames';
import ApiKey from '../../../../components/api-key/ApiKey';
import { AddIcon } from '../../../../components/icons/Icons';

const styles = theme => ({
  container: {
    padding: '10px 22px 10px 26px'
  },
  line: {
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: theme.colors.textColor.menuItem,
    boxSizing: 'border-box',
    fontSize: '14px',
    textDecoration: 'none'
  },
  apiConfigFieldsLine: {
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'row',
    color: theme.colors.textColor.menuItem,
    boxSizing: 'border-box',
    fontSize: '14px',
    textDecoration: 'none'
  },
  smallLine: {
    width: '379px'
  },
  disabledLine: {
    opacity: '.5'
  },
  item: {
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'column'
  },
  itemRow: {
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'row'
  },
  hint: {
    height: '24px',
    fontSize: '14px',
    lineHeight: '1.71',
    opacity: '.5'
  },
  buttonContainer: {
    width: '16px',
    height: '16px'
  },
  addButton: {
    color: theme.colors.background.addIcon,
    borderRadius: '19px',
    backgroundColor: theme.colors.textColor.menuItemSelected
  },
  createText: {
    fontSize: '14px',
    paddingLeft: '8px',
    color: theme.colors.textColor.blue,
    fontWeight: '500'
  },
  infoPaneContainer: {
    lineHeight: '2',
    width: '100%',
    backgroundColor: theme.colors.background.informationArea
  },
  passphraseInfoPaneContainer: {
    display: 'flex',
    flexDirection: 'column-reverse',
    height: 'auto',
    marginLeft: '16px'
  },
  passphraseInfoPane: {
    backgroundColor: theme.colors.background.informationArea
  },
  infoPaneText: {
    margin: '0',
    fontSize: '13px'
  },
  formLabel: {
    whiteSpace: 'nowrap',
    opacity: '.5',
    color: theme.colors.textColor.formLabel
  },
  formText: {
    color: theme.colors.textColor.input,
    '&:before': {
      borderBottomColor: 'rgba(0, 0, 0, 0.12);'
    },
    '&:after': {
      borderBottomColor: '#3ab2ee'
    }
  },
  formLabelFocused: {},
  inputLabelColor: {
    color: theme.colors.textColor.formLabel,
    '&$formLabelFocused': {
      color: '#3',
      opacity: '1'
    }
  },
  inputArea: {
    marginTop: '8px',
    width: '371px'
  },
  buttonStyle: {
    marginTop: '12px',
    width: '100%',
    height: '36px',
    color: 'white',
    textTransform: 'none'
  },
  pointer: {
    cursor: 'pointer'
  },
  apiKey: {
    width: '100%'
  }
});

class APIAccess extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      ipAddress: '',
      passphrase: '',
      tradeRight: false,
      readRight: true,
      withdrawRight: false
    };
  }

  componentWillMount() {
    this.props.listApiAccess();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (nextProps.updateApiKeysFlag) {
        this.props.listApiAccess();
        this.props.clearUpdateApiKeysFlag();
      }
    }
  }
  createApiAccess = () => {
    if (this.state.passphrase.length === 0) {
      this.props.showDialog({
        title: I18n.translate('general_error'),
        text: I18n.translate('settings_passphrase_required'),
        okButtonText: I18n.translate('general_ok')
      });
      return;
    }
    const data = {
      ip: this.state.ipAddress,
      pass_phrase: this.state.passphrase,
      read_right: this.state.readRight,
      trade_right: this.state.tradeRight,
      withdraw_right: this.state.withdrawRight
    };

    this.props
      .createApiAccess(data)
      .then(resp => {
        if (resp.payload.data.status === 'error') {
          this.props.showDialog({
            title: I18n.translate('general_error'),
            text: resp.payload.data.reason,
            okButtonText: I18n.translate('general_ok')
          });
        } else {
          this.props.showSnackbar(
            I18n.translate('settings_api_access_created_success_message')
          );
          this.props.listApiAccess();
          this.setState({
            ipAddress: '',
            passphrase: '',
            tradeRight: false,
            readRight: true
          });
        }
      })
      .catch(() => {
        this.props.showDialog({
          title: I18n.translate('general_error'),
          text: I18n.translate('general_error_description'),
          okButtonText: I18n.translate('general_ok')
        });
      });
    this.setState({ showForm: false });
  };

  removeApiAccess = apikey => {
    const data = { apikey };

    this.props
      .deleteApiAccess(data)
      .then(resp => {
        if (resp.payload.data.status === 'error') {
          this.props.showDialog({
            title: I18n.translate('general_error'),
            text: resp.payload.data.reason,
            okButtonText: I18n.translate('general_ok')
          });
        } else {
          this.props.showSnackbar(
            I18n.translate('settings_mobile_access_deleted_success_message')
          );
          this.props.listApiAccess();
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

  activateApiAccess = apikey => {
    const data = { apikey };

    this.props
      .activateApiAccess(data)
      .then(resp => {
        if (resp.payload.data.status === 'error') {
          this.props.showDialog({
            title: I18n.translate('general_error'),
            text: resp.payload.data.reason,
            okButtonText: I18n.translate('general_ok')
          });
        } else {
          this.props.showSnackbar(
            I18n.translate('settings_mobile_access_activated_success_message')
          );
          this.props.listApiAccess();
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

  deactivateApiAccess = apikey => {
    const data = { apikey };

    this.props
      .deactivateApiAccess(data)
      .then(resp => {
        if (resp.payload.data.status === 'error') {
          this.props.showDialog({
            title: I18n.translate('general_error'),
            text: resp.payload.data.reason,
            okButtonText: I18n.translate('general_ok')
          });
        } else {
          this.props.showSnackbar(
            I18n.translate('settings_mobile_access_deactivated_success_message')
          );
          this.props.listApiAccess();
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
    const { classes, apiKeys } = this.props;
    const keysLength = apiKeys ? apiKeys.length : 0;
    const { showForm } = this.state;

    return (
      <div className={classes.container}>
        <div className={classes.line}>
          <div className={classes.item}>
            <div>{I18n.translate('settings_api_access_label')}</div>
            {keysLength === 0 ? (
              <div className={classes.hint}>
                {I18n.translate('settings_no_api_access_yet')}
              </div>
            ) : (
              <div className={classes.hint}>
                {I18n.translate('settings_api_access_hint', keysLength)}
              </div>
            )}
          </div>
          <div className={classes.item}>
            {keysLength > 0 && (
              <div
                className={classNames(classes.itemRow, classes.pointer)}
                onClick={() => {
                  this.setState({ showForm: true });
                }}
              >
                <AddIcon strokeClassName={classes.strokeColor} />
                <div className={classes.createText}>
                  {I18n.translate('settings_new_api_access_button')}
                </div>
              </div>
            )}
          </div>
        </div>
        {keysLength === 0 && (
          <div className={classes.line}>
            <div
              className={classNames(classes.itemRow, classes.pointer)}
              onClick={() => {
                this.setState({ showForm: true });
              }}
            >
              <AddIcon strokeClassName={classes.strokeColor} />
              <div className={classes.createText}>
                {I18n.translate('settings_api_access_button')}
              </div>
            </div>
          </div>
        )}
        {showForm && (
          <div>
            <div className={classes.line}>
              <div className={classes.infoPaneContainer}>
                <InfoPane>
                  <ul className={classes.infoPaneText}>
                    <li>{I18n.translate('api_access_info_line1')}</li>
                    <li>{I18n.translate('api_access_info_line2')}</li>
                    <li>{I18n.translate('api_access_info_line3')}</li>
                    <li>{I18n.translate('api_access_info_line4')}</li>
                  </ul>
                </InfoPane>
              </div>
            </div>
            <div className={classes.apiConfigFieldsLine}>
              <div className={classes.item}>
                <div>
                  {I18n.translate('settings_allowed_ip_for_api_access')}
                </div>
                <TextField
                  autoFocus
                  id="ipAddress"
                  value={this.state.ipAddress}
                  onChange={event => {
                    this.setState({ ipAddress: event.target.value });
                  }}
                  label={I18n.translate('settings_ip_address_label')}
                  placeholder="192.168.0.1"
                  className={classes.inputArea}
                  margin="normal"
                  InputProps={{
                    classes: {
                      underline: classes.formText
                    }
                  }}
                  InputLabelProps={{
                    classes: {
                      focused: classes.formLabelFocused,
                      root: classes.formLabel
                    }
                  }}
                />
                <TextField
                  id="passphrase"
                  value={this.state.passphrase}
                  onChange={event => {
                    this.setState({ passphrase: event.target.value });
                  }}
                  label={I18n.translate('settings_passphrase_label')}
                  className={classes.inputArea}
                  margin="normal"
                  InputProps={{
                    classes: {
                      underline: classes.formText
                    }
                  }}
                  InputLabelProps={{
                    classes: {
                      focused: classes.formLabelFocused,
                      root: classes.formLabel
                    }
                  }}
                />
              </div>
              <div className={classes.passphraseInfoPaneContainer}>
                <InfoPane className={classes.passphraseInfoPane}>
                  <div>
                    <ul className={classes.infoPaneText}>
                      <li>
                        {I18n.translate('settings_passphrase_disclaimer')}
                      </li>
                    </ul>
                  </div>
                </InfoPane>
              </div>
            </div>
            <div className={classes.line}>
              <div className={classes.item}>
                <div>
                  {I18n.translate('settings_allowed_features_for_api_access')}
                </div>
              </div>
            </div>
            <div className={classNames(classes.line, classes.smallLine)}>
              <div className={classes.item}>
                <div>{I18n.translate('settings_monitoring_title')}</div>
                <div className={classes.hint}>
                  {I18n.translate('settings_monitoring_hint')}
                </div>
              </div>
              <div className={classes.item}>
                <Switch
                  color="primary"
                  className={classes.switch}
                  checked={this.state.readRight}
                  onChange={(event, checked) => {
                    this.setState({ readRight: checked });
                  }}
                />
              </div>
            </div>
            <div className={classNames(classes.line, classes.smallLine)}>
              <div className={classes.item}>
                <div>{I18n.translate('settings_order_management_title')}</div>
                <div className={classes.hint}>
                  {I18n.translate('settings_order_management_hint')}
                </div>
              </div>
              <div className={classes.item}>
                <Switch
                  color="primary"
                  className={classes.switch}
                  checked={this.state.tradeRight}
                  onChange={(event, checked) => {
                    this.setState({ tradeRight: checked });
                  }}
                />
              </div>
            </div>
            <div className={classNames(classes.line, classes.smallLine)}>
              <div className={classes.item}>
                <div>
                  {I18n.translate('settings_balance_managemenet_title')}
                </div>
                <div className={classes.hint}>
                  {I18n.translate('settings_balance_managemenet_hint')}
                </div>
              </div>
              <div className={classes.item}>
                <Switch
                  color="primary"
                  className={classes.switch}
                  checked={this.state.withdrawRight}
                  onChange={(event, checked) => {
                    this.setState({ withdrawRight: checked });
                  }}
                />
              </div>
            </div>
            <div className={classNames(classes.line, classes.smallLine)}>
              <Button
                variant="contained"
                color="primary"
                className={this.props.classes.buttonStyle}
                onClick={this.createApiAccess}
              >
                {I18n.translate('settings_api_access_button')}
              </Button>
            </div>
          </div>
        )}
        {keysLength > 0 && (
          <div className={classes.line}>
            <div className={classes.apiKey}>
              {apiKeys.map((apiKey, i) => (
                <ApiKey
                  key={i}
                  {...apiKey}
                  removeApiKey={() => this.removeApiAccess(apiKey.apikey)}
                  deactivateApiKey={() =>
                    this.deactivateApiAccess(apiKey.apikey)
                  }
                  activateApiKey={() => this.activateApiAccess(apiKey.apikey)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(APIAccess);

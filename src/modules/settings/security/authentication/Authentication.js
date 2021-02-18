import React from 'react';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import I18n from '../../../../common/i18n/I18n';
import MobileDevice2FA from '../../../../components/mobile-device-2fa/MobileDevice2FA';
import Google2FA from '../../../../components/google-2fa/Google2FA';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import * as QRCode from 'qrcode.react';
import NumberFormat from 'react-number-format';

const styles = theme => ({
  container: {
    padding: '10px 10px 10px 26px'
  },
  link: {
    color: theme.colors.textColor.blue,
    height: '24px',
    fontSize: '14px',
    lineHeight: '1.71',
    opacity: '1'
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    color: theme.colors.textColor.menuItem,
    boxSizing: 'border-box',
    fontSize: '14px',
    textDecoration: 'none'
  },
  disabledLine: {
    opacity: '.5'
  },
  item: {
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'column'
  },
  headerHint: {
    marginTop: '5px',
    fontSize: '15px',
    color: theme.colors.textColor.input,
    opacity: '.6'
  },
  hint: {
    fontSize: '14px',
    lineHeight: '1.71',
    opacity: '.5'
  },
  switch: {
    marginRight: '10px'
  },
  qrCodeVerificationContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  qrCodeManualContainer: {
    display: 'flex',
    marginLeft: '35px',
    marginTop: '29px',
    color: theme.colors.textColor.menuItem
  },
  qrCodeManualTitle: {
    fontSize: '16px'
  },
  qrCodeManualKey: {
    fontSize: '16px',
    opacity: '.7',
    lineHeight: '1.9',
    marginTop: '-5px',
    paddingLeft: '5px'
  },
  qrCodeContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '12px',
    backgroundColor: theme.colors.background.paper
  },
  qrCode: {
    margin: '15px 30px 15px 20px',
    border: 'solid 5px white',
    display: 'flex',
    alignItems: 'center'
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 16px 5px 16px',
    backgroundColor: theme.colors.background.contrastRow,
    margin: '6px 0'
  },
  infoPaneText: {
    fontSize: '14px',
    color: theme.colors.textColor.menuItem
  },
  phoneNumberInputArea: {
    width: '200px'
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
  inputButton: {
    marginRight: '-8px',
    marginBottom: '9px',
    borderRadius: '19px',
    textTransform: 'none',
    height: '26px',
    minHeight: '26px',
    minWidth: '52px',
    lineHeight: '14px'
  },
  formLabelFocused: {
    color: '#3ab2ee',
    opacity: '1'
  },
  formLabel: {
    whiteSpace: 'nowrap',
    opacity: '.5',
    color: theme.colors.textColor.formLabel
  }
});

class Authentication extends React.PureComponent {
  constructor(props) {
    super(props);
    const { userInfo } = props;
    this.state = {
      smsEnabled: userInfo ? userInfo.twofa_method === 'S' : false,
      googleEnabled: userInfo ? userInfo.twofa_method === 'O' : false,
      mobileEnabled: userInfo ? userInfo.twofa_method === 'P' : false,
      verificationCode: '',
      submitButtonDisabled: false
    };
  }

  handleSmsConfirmationChange = (event, checked) => {
    if (checked && this.state.googleEnabled) {
      this.setState({ googleEnabled: false, verificationCode: '' });
    }
    if (checked) {
      this.props
        .enableOtp({ method: 'S' })
        .then(resp => {
          if (resp.payload.data.status === 'error') {
            this.props.showDialog({
              title: I18n.translate('general_error'),
              text: resp.payload.data.reason,
              okButtonText: I18n.translate('general_ok')
            });
          } else {
            this.props.showSnackbar(
              I18n.translate('settings_auth_sms_enable_success_message')
            );
            this.props.getDetail();
            this.setState({ smsEnabled: checked });
          }
        })
        .catch(() => {
          this.props.showDialog({
            title: I18n.translate('general_error'),
            text: I18n.translate('general_error_description'),
            okButtonText: I18n.translate('general_ok')
          });
        });
    } else {
      this.props
        .disableOtp({})
        .then(resp => {
          if (resp.payload.data.status === 'error') {
            this.props.showDialog({
              title: I18n.translate('general_error'),
              text: resp.payload.data.reason,
              okButtonText: I18n.translate('general_ok')
            });
          } else {
            this.props.showSnackbar(
              I18n.translate('settings_auth_sms_disable_success_message')
            );
            this.props.getDetail();
            this.setState({ smsEnabled: checked });
          }
        })
        .catch(() => {
          this.props.showDialog({
            title: I18n.translate('general_error'),
            text: I18n.translate('general_error_description'),
            okButtonText: I18n.translate('general_ok')
          });
        });
    }
  };

  handleGoogleConfirmationChange = (event, checked) => {
    if (checked && this.state.smsEnabled) {
      this.setState({ smsEnabled: false });
    }
    if (checked) {
      this.props
        .enableOtp({ method: 'O' })
        .then(resp => {
          if (resp.payload.data.status === 'error') {
            this.props.showDialog({
              title: I18n.translate('general_error'),
              text: resp.payload.data.reason,
              okButtonText: I18n.translate('general_ok')
            });
          } else {
            this.props.getDetail();
            this.setState({ googleEnabled: checked, verificationCode: '' });
          }
        })
        .catch(() => {
          this.props.showDialog({
            title: I18n.translate('general_error'),
            text: I18n.translate('general_error_description'),
            okButtonText: I18n.translate('general_ok')
          });
        });
    } else {
      this.props
        .disableOtp({})
        .then(resp => {
          if (resp.payload.data.status === 'error') {
            this.props.showDialog({
              title: I18n.translate('general_error'),
              text: resp.payload.data.reason,
              okButtonText: I18n.translate('general_ok')
            });
          } else {
            this.props.showSnackbar(
              I18n.translate('settings_auth_google_disable_success_message')
            );
            this.props.getDetail();
            this.setState({ googleEnabled: checked, verificationCode: '' });
          }
        })
        .catch(() => {
          this.props.showDialog({
            title: I18n.translate('general_error'),
            text: I18n.translate('general_error_description'),
            okButtonText: I18n.translate('general_ok')
          });
        });
    }
  };

  verify = () => {
    if (this.state.verificationCode.trim().length !== 7) {
      this.props.showDialog({
        title: I18n.translate('general_error'),
        text: I18n.translate(
          'settings_auth_google_verification_warning_message'
        ),
        okButtonText: I18n.translate('general_ok')
      });
      return;
    }
    this.setState({ submitButtonDisabled: true });
    this.props
      .verifyOtp({ otp_code: this.state.verificationCode.replace(' ', '') })
      .then(resp => {
        if (resp.payload.data.status === 'error') {
          this.props.showDialog({
            title: I18n.translate('general_error'),
            text: resp.payload.data.reason,
            okButtonText: I18n.translate('general_ok')
          });
          this.setState({ submitButtonDisabled: false });
        } else {
          this.props.showSnackbar(
            I18n.translate('settings_auth_google_enable_success_message')
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
        this.setState({ submitButtonDisabled: false });
      });
  };

  handleMobileConfirmationChange = (event, checked) => {
    this.setState({ mobileEnabled: checked });
  };

  handleVerificationCodeChange = event => {
    this.setState({ verificationCode: event.target.value }, () => {
      if (event.target.value.trim().length === 7) {
        this.verify();
      }
    });
  };

  render() {
    const { classes, userInfo, googleSecretKey, googleUri } = this.props;
    const { smsEnabled, googleEnabled } = this.state;

    return (
      <div className={classes.container}>
        <div className={classes.line}>
          <div className={classes.item}>
            <div className={classes.header}>
              {I18n.translate('settings_2fa_label')}
            </div>
            <div className={classes.headerHint}>
              {I18n.translate('settings_2fa_disclaimer')}
            </div>
          </div>
        </div>
        <div className={classes.line}>
          <div className={classes.item}>
            <div>{I18n.translate('settings_2fa_google_label')}</div>
            <div className={classes.hint}>
              {I18n.translate('settings_2fa_google_hint')}
            </div>
          </div>
          <div className={classes.item}>
            <Switch
              color="primary"
              className={classes.switch}
              checked={this.state.googleEnabled}
              onChange={this.handleGoogleConfirmationChange}
            />
          </div>
        </div>
        {googleEnabled &&
          (userInfo.twofa_method === 'O' ? (
            <Google2FA />
          ) : (
            <div className={classes.qrCodeContainer}>
              <div className={classes.qrCode}>
                <QRCode size={110} value={googleUri} />
              </div>
              <div className={classes.infoContainer}>
                <div className={classes.infoPaneText}>
                  {I18n.translate('settings_google_authenticator_info_text')}
                </div>
                <div className={classes.qrCodeVerificationContainer}>
                  <NumberFormat
                    customInput={TextField}
                    autoFocus
                    id="verification_code"
                    label={I18n.translate('google_authenticator_pin')}
                    value={this.state.verificationCode}
                    onChange={this.handleVerificationCodeChange}
                    className={classes.phoneNumberInputArea}
                    format="### ###"
                    margin="normal"
                    InputProps={{
                      classes: {
                        underline: classes.formText
                      },
                      endAdornment: (
                        <InputAdornment position="start">
                          <Button
                            disabled={this.state.submitButtonDisabled}
                            size="small"
                            color="primary"
                            variant="contained"
                            className={classes.inputButton}
                            onClick={this.verify}
                          >
                            {I18n.translate('settings_verify')}
                          </Button>
                        </InputAdornment>
                      )
                    }}
                    InputLabelProps={{
                      classes: {
                        focused: classes.formLabelFocused,
                        root: classes.formLabel
                      }
                    }}
                  />
                  <div className={classes.qrCodeManualContainer}>
                    <div className={classes.qrCodeManualTitle}>
                      {I18n.translate('google_authenticator_key_label')}
                    </div>
                    <div className={classes.qrCodeManualKey}>
                      {googleSecretKey}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div className={classes.line}>
          <div className={classes.item}>
            <div>SMS</div>
            {userInfo.verified_level === 0 ? (
              <Link className={classes.link} to="/settings/account">
                {I18n.translate('settings_auth_verify_your_phone_number_label')}
              </Link>
            ) : (
              <div className={classes.hint}>
                {I18n.translate('settings_2fa_hint')}
              </div>
            )}
          </div>
          <div className={classes.item}>
            <Switch
              color="primary"
              className={classes.switch}
              disabled={userInfo.verified_level === 0}
              checked={this.state.smsEnabled}
              onChange={this.handleSmsConfirmationChange}
            />
          </div>
        </div>
        {smsEnabled && (
          <MobileDevice2FA
            countryCode={userInfo.p_country_code}
            phoneNumber={userInfo.phone_number}
          />
        )}
        <div className={classNames(classes.line, classes.disabledLine)}>
          <div className={classes.item}>
            <div>{I18n.translate('settings_2fa_mobile_label')}</div>
            <div className={classes.hint}>
              {I18n.translate('settings_2fa_mobile_hint')}
            </div>
          </div>
          <div className={classes.item}>
            <Switch
              color="primary"
              disabled
              className={classes.switch}
              checked={this.state.mobileEnabled}
              onChange={this.handleMobileConfirmationChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Authentication);

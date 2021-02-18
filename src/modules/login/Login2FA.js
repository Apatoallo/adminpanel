import React from 'react';
import logo_white from '../../assets/logos/bitexen_logo_blue_black.png';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { getTimer } from '../../common/utils/counter';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import history from '../../common/history';
import I18n from '../../common/i18n/I18n';
import LocalStorage from '../../common/utils/LocalStorage';
import StyledPaper from '../../components/common/StyledPaper';
import { Helmet } from 'react-helmet';
import ReCAPTCHA from 'react-google-recaptcha';
import NumberFormat from 'react-number-format';
import { configKeys } from '../../common/config/config';

const styles = theme => ({
  page: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fcfcfc',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 12px',
    boxSizing: 'border-box'
  },
  loginContainer: {
    padding: '24px',
    display: 'flex',
    flexShrink: '0',
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: '30px',
    boxSizing: 'border-box',
    width: '370px',
    '@media screen and (max-width: 600px)': {
      width: '100%'
    }
  },
  logo: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logoStyle: {
    marginLeft: '2px',
    maxWidth: '160px',
    maxHeight: '31px'
  },
  title: {
    cursor: 'pointer',
    fontSize: '14px',
    color: theme.colors.textColor.blue,
    fontWeight: '500'
  },
  hint: {
    height: '32px',
    fontSize: '14px',
    lineHeight: 'normal',
    color: theme.colors.textColor.grey87,
    marginTop: '12px'
  },
  remainingArea: {
    textAlign: 'right',
    color: '#4b5a76',
    fontSize: '14px',
    lineHeight: 'normal'
  },
  textFieldStyle: {
    marginTop: '12px',
    color: 'rgba(48, 68, 98, 0.87)',
    '&:before': {
      borderBottomColor: 'rgba(0, 0, 0, 0.12);'
    },
    '&:after': {
      borderBottomColor: '#3ab2ee'
    }
  },
  buttonStyle: {
    marginTop: '16px',
    width: '100%',
    color: 'white',
    textTransform: 'none',
    borderRadius: '0'
  },
  recaptcha: {
    marginTop: '22px',
    transform: 'scale(2)',
    transformOrigin: '0 0'
  },
  disabled: {
    cursor: 'initial',
    opacity: '.3'
  },
  footer: {
    marginTop: '32px',
    marginBottom: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse'
  },
  infoBar: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '16px'
  },
  reverseDirection: {
    flexDirection: 'row-reverse'
  },
  errorLabel: {
    color: theme.colors.textColor.red,
    fontSize: '13px',
    lineHeight: 'normal'
  },
  inputLabelColor: {
    color: 'rgba(48, 68, 98, 0.38)',
    '&$cssFocused': {
      color: '#3ab2ee'
    }
  },
  focusedLabelColor: {}
});

class Login2FA extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      recaptchaInstance: null,
      recaptchaResponse: '',
      timer: 119,
      verificationCode: '',
      showError: false,
      message: '',
      remainingTime: 120,
      remainingTimeLabel: '02:00',
      disableSendSmsLabel: true,
      smsResend: false,
      submitButtonDisabled: false
    };
  }

  componentDidMount() {
    this.ticking = setInterval(() => {
      if (this.state.timer < 0 && this.props.secondFactorType === 'S') {
        history.push('/login');
      } else {
        this.setState({
          remainingTimeLabel: getTimer(this.state.timer),
          timer: this.state.timer - 1
        });
        if (this.state.timer < 60 && !this.state.smsResend) {
          this.setState({ disableSendSmsLabel: false });
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.ticking);
  }

  handleVerificationCodeChange = event => {
    this.setState(
      { verificationCode: event.target.value, showError: false },
      () => {
        const requiredLength = this.props.secondFactorType === 'S' ? 6 : 7;
        if (event.target.value.trim().length === requiredLength) {
          this.executeCaptcha();
        }
      }
    );
  };

  resendSms = () => {
    this.setState({ smsResend: true, disableSendSmsLabel: true, timer: 120 });
    this.props
      .resendSms({})
      .then(resp => {
        if (resp.payload.data.status === 'error') {
          this.setState({
            showError: true,
            message: I18n.translate('general_error_description')
          });
        } else {
          this.setState({
            showError: true,
            message: I18n.translate('settings_sms_sent_success_message')
          });
        }
      })
      .catch(() => {
        this.setState({
          showError: true,
          message: I18n.translate('general_error_description')
        });
      });
  };

  executeCaptcha = () => {
    const requiredLength = this.props.secondFactorType === 'S' ? 6 : 7;
    if (this.state.verificationCode.length !== requiredLength) {
      this.setState({
        showError: true,
        message: I18n.translate(
          'settings_auth_google_verification_warning_message'
        )
      });
      return;
    }

    this.setState({ submitButtonDisabled: true });
    this.state.recaptchaInstance.execute();
  };

  verifyCallback = response => {
    this.setState({ recaptchaResponse: response });
    this.verify();
  };

  verify = () => {
    this.props
      .loginSecondFactor({
        code: this.state.verificationCode.replace(' ', ''),
        gRecaptchaResponse: this.state.recaptchaResponse
      })
      .then(resp => {
        if (resp.payload.data.status === 'error') {
          this.setState({
            showError: true,
            message: I18n.translate('login_2fa_wrong_code'),
            submitButtonDisabled: false
          });
          this.state.recaptchaInstance.reset();
        } else {
          this.props.getDetail().then(() => {
            if (this.props.userInfo) {
              I18n.language = this.props.userInfo.lang.toUpperCase();
              LocalStorage.setItem('USER_INFO', this.props.userInfo);
              this.props.loginPrivateSocket();
              if (this.props.userInfo.verified_level < 3) {
                history.push('/settings/account');
              } else {
                history.push('/');
              }
            }
          });
        }
      })
      .catch(() => {
        this.state.recaptchaInstance.reset();
        this.setState({
          showError: true,
          message: I18n.translate('general_error_description'),
          submitButtonDisabled: false
        });
      });
  };

  render() {
    const { classes, secondFactorType, fullName, tickers } = this.props;
    const {
      showError,
      remainingTimeLabel,
      disableSendSmsLabel,
      message
    } = this.state;
    const fullNameInFormat =
      fullName &&
      fullName
        .split(' ')
        .reduce(
          (tmp, m) => tmp + ' ' + m.charAt(0).toUpperCase() + m.slice(1),
          ''
        );
    return (
      <div className={classes.page}>
        <Helmet>
          <title>
            {tickers && tickers.length > 0 && tickers[0]
              ? `(${tickers[0].last_price} ${
                  tickers[0].market.counter_currency_code
                }) ${I18n.translate('site_title')} - ${I18n.translate(
                  'activity_type_L'
                )}`
              : `${I18n.translate('site_title')} - ${I18n.translate(
                  'activity_type_L'
                )}`}
          </title>
        </Helmet>
        <ReCAPTCHA
          ref={el => {
            this.setState({ recaptchaInstance: el });
          }}
          size="invisible"
          sitekey={configKeys.recaptchaKey}
          onChange={this.verifyCallback.bind(this)}
        />
        <div className={classes.logo}>
          <Link to="/">
            <img
              src={logo_white}
              className={classes.logoStyle}
              alt="Bitexen logo"
            />
          </Link>
        </div>
        <StyledPaper className={classes.loginContainer}>
          <div className={classes.title}>
            {I18n.translate('general_welcome_text')} {fullNameInFormat}
          </div>
          <div className={classes.hint}>
            {secondFactorType === 'S'
              ? I18n.translate('login_2fa_sms_description_message')
              : I18n.translate('login_2fa_auth_description_message')}
          </div>
          <NumberFormat
            customInput={TextField}
            autoFocus
            id="verification_code"
            label={I18n.translate('login_2fa_code_label')}
            format={secondFactorType === 'S' ? '######' : '### ###'}
            className={classes.textFieldStyle}
            value={this.state.verificationCode}
            onChange={this.handleVerificationCodeChange}
            onKeyPress={ev => {
              if (ev.key === 'Enter') {
                ev.preventDefault();
                this.executeCaptcha();
              }
            }}
            InputProps={{
              classes: {
                underline: this.props.classes.textFieldStyle
              }
            }}
            InputLabelProps={{
              classes: {
                focused: this.props.classes.focusedLabelColor,
                root: this.props.classes.inputLabelColor
              }
            }}
          />
          <div
            className={classNames(classes.infoBar, {
              [classes.reverseDirection]: secondFactorType === 'S'
            })}
          >
            {secondFactorType === 'S' && (
              <div className={classes.remainingArea}>
                {I18n.translate('login_2fa_remaining_time_label')}{' '}
                <b>{remainingTimeLabel}</b>
              </div>
            )}
            {showError && <div className={classes.errorLabel}>{message}</div>}
          </div>
          <Button
            disabled={this.state.submitButtonDisabled}
            variant="contained"
            color="primary"
            onClick={this.executeCaptcha}
            className={this.props.classes.buttonStyle}
          >
            {I18n.translate('login_2fa_continue_button')}
          </Button>
          <div className={classes.footer}>
            <div className={classes.title} />
            {secondFactorType === 'S' && (
              <div
                className={classNames(classes.title, {
                  [classes.disabled]: disableSendSmsLabel
                })}
                onClick={disableSendSmsLabel ? undefined : this.resendSms}
              >
                {I18n.translate('login_2fa_resend_sms')}
              </div>
            )}
          </div>
        </StyledPaper>
      </div>
    );
  }
}

export default withStyles(styles)(Login2FA);

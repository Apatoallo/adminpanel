import React from 'react';
import logo_white from '../../assets/logos/bitexen_logo_blue_black.png';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

import { withStyles } from '@material-ui/core/styles';
import history from '../../common/history';
import I18n from '../../common/i18n/I18n';
import LocalStorage from '../../common/utils/LocalStorage';
import StyledPaper from '../../components/common/StyledPaper';
import FormValidator from '../../common/utils/formValidator';
import { Helmet } from 'react-helmet';
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
    fontWeight: '500',
    textDecoration: 'none'
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
  footer: {
    marginTop: '32px',
    marginBottom: '8px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  infoBar: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '16px'
  },
  errorLabel: {
    color: theme.colors.textColor.red,
    fontSize: '14px',
    lineHeight: 'normal'
  },
  inputLabelColor: {
    color: 'rgba(48, 68, 98, 0.38)',
    '&$cssFocused': {
      color: '#3ab2ee'
    }
  },
  focusedLabelColor: {},
  error: {
    color: `${theme.colors.textColor.red} !important`,
    '&:before': {
      borderBottomColor: `${theme.colors.textColor.red} !important`
    },
    '&:after': {
      borderBottomColor: `${theme.colors.textColor.red} !important`
    }
  }
});

class Login extends React.PureComponent {
  constructor(props) {
    super(props);

    this.validator = new FormValidator(this.validatorFields);
    this.submitted = false;

    this.state = {
      recaptchaInstance: null,
      recaptchaResponse: '',
      userName: '',
      password: '',
      showError: false,
      errorMessage: '',
      executeRecaptcha: true,
      submitButtonDisabled: false,
      validation: this.validator.valid()
    };
  }

  validatorFields = [
    {
      field: 'userName',
      method: 'isEmpty',
      validWhen: false,
      message: I18n.translate('validation_error_required')
    },
    {
      field: 'userName',
      method: 'isEmail',
      validWhen: true,
      message: I18n.translate('general_email_error_message')
    },
    {
      field: 'password',
      method: 'isEmpty',
      validWhen: false,
      message: I18n.translate('validation_error_required')
    }
  ];

  handlePasswordChange = event => {
    this.setState({ password: event.target.value, showError: false });
  };

  handleUsernameChange = event => {
    this.setState({ userName: event.target.value.trim(), showError: false });
  };

  executeCaptcha = () => {
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (!validation.isValid) {
      return;
    }
    this.setState({ submitButtonDisabled: true });
    this.state.recaptchaInstance.execute();
  };

  verifyCallback = response => {
    this.setState({ recaptchaResponse: response });
    this.submit();
  };

  submit = () => {
    let data = {
      username: this.state.userName,
      password: this.state.password,
      gRecaptchaResponse: this.state.recaptchaResponse
    };
    this.props
      .loginFirstFactor(data)
      .then(resp => {
        if (resp.payload.data.status === 'error') {
          this.setState({
            showError: true,
            errorMessage:
              resp.payload.data.reason ||
              I18n.translate('login_general_failed_error'),
            submitButtonDisabled: false
          });
          this.state.recaptchaInstance.reset();
        } else {
          if (this.props.secondFactorType === 'N') {
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
          } else {
            history.push('/login2fa');
          }
        }
      })
      .catch(() => {
        this.setState({
          showError: true,
          errorMessage: I18n.translate('general_error_description')
        });
        this.state.recaptchaInstance.reset();
        this.setState({ submitButtonDisabled: false });
      });
  };
  render() {
    const { classes, tickers } = this.props;

    const { showError, errorMessage } = this.state;

    let validation = this.submitted
      ? this.validator.validate(this.state)
      : this.state.validation;

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
          <div className={classes.title}>{I18n.translate('login_title')}</div>
          <TextField
            autoFocus
            error={validation.userName && validation.userName.isInvalid}
            helperText={validation.userName && validation.userName.message}
            id="userName"
            label={I18n.translate('login_email_field')}
            className={classes.textFieldStyle}
            value={this.state.userName}
            onChange={this.handleUsernameChange}
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
          <TextField
            id="password"
            error={validation.password && validation.password.isInvalid}
            helperText={validation.password && validation.password.message}
            label={I18n.translate('login_password_field')}
            type="password"
            className={classes.textFieldStyle}
            value={this.state.password}
            onChange={this.handlePasswordChange}
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
          <div className={classes.infoBar}>
            {showError && (
              <div className={classes.errorLabel}>{errorMessage}</div>
            )}
          </div>
          <Button
            disabled={this.state.submitButtonDisabled}
            variant="contained"
            color="primary"
            className={this.props.classes.buttonStyle}
            onClick={this.executeCaptcha.bind(this)}
          >
            {I18n.translate('login_submit_button')}
          </Button>
          <div className={classes.footer}>
            <Link to="/sign-up" className={classes.title}>
              {I18n.translate('login_create_account_label')}
            </Link>
            <Link to="/forgot-password" className={classes.title}>
              {I18n.translate('login_forgot_password_label')}
            </Link>
          </div>
        </StyledPaper>
      </div>
    );
  }
}

export default withStyles(styles)(Login);

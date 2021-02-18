import React from 'react';
import logo_white from '../../assets/logos/bitexen_logo_blue_black.png';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import I18n from '../../common/i18n/I18n';
import StyledPaper from '../../components/common/StyledPaper';
import ReCAPTCHA from 'react-google-recaptcha';
import FormValidator from '../../common/utils/formValidator';
import { Helmet } from 'react-helmet';
import SessionStorage from '../../common/utils/SessionStorage';
import { configKeys } from '../../common/config/config';
import { SERVER_ERROR_STATUS_CODES } from '../../common/constants';

const styles = theme => ({
  page: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fcfcfc',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 12px',
    boxSizing: 'border-box',
    zIndex: 2,
    position: 'relative'
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
  fixedHeight: {
    height: '220px'
  },
  footerTitle: {
    fontSize: '14px',
    color: theme.colors.textColor.blue,
    fontWeight: '500',
    marginTop: '20px',
    marginBottom: '13px',
    textAlign: 'center'
  },
  infoBar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  agreementClass: {
    color: '#3ab2ee',
    fontWeight: '500',
    textDecoration: 'none'
  },
  checkbox: {
    color: 'rgba(48, 66, 98, 0.12)'
  },
  checkboxChecked: {
    color: '#3ab2ee'
  },
  userAgreementBar: {
    display: 'flex',
    paddingTop: '13px',
    paddingBottom: '3px',
    marginLeft: '-15px',
    alignItems: 'center',
    color: 'rgba(48, 66, 98, 0.87)',
    fontSize: '14px',
    lineHeight: 'normal'
  },
  userAgreementLine: {},
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
  focusedLabelColor: {},
  center: {
    textAlign: 'center'
  },
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

class SignUp extends React.PureComponent {
  constructor(props) {
    super(props);

    this.validator = new FormValidator(this.validatorFields);
    this.submitted = false;

    const { step = 1, userName = '' } = props.location.state || {};
    const ref_id = SessionStorage.getItem('REF_ID');
    const referrerCodeDisabled = ref_id !== null;
    this.state = {
      recaptchaInstance: null,
      name: '',
      surname: '',
      userName: userName,
      password: '',
      password2: '',
      showError: false,
      message: '',
      referrerCode: ref_id || '',
      referrerCodeDisabled: referrerCodeDisabled,
      userAgreementCheck: false,
      step: step,
      acceptKVK: false,
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
    },
    {
      field: 'password',
      method: 'isLength',
      validWhen: true,
      args: {
        min: 8
      },
      message: I18n.translate('settings_password_min_length_error', 8)
    },
    {
      field: 'password2',
      method: 'isEmpty',
      validWhen: false,
      message: I18n.translate('validation_error_required')
    },
    {
      field: 'password2',
      method: 'isLength',
      validWhen: true,
      args: {
        min: 8
      },
      message: I18n.translate('settings_password_min_length_error', 8)
    },
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: I18n.translate('validation_error_required')
    },
    {
      field: 'surname',
      method: 'isEmpty',
      validWhen: false,
      message: I18n.translate('validation_error_required')
    }
  ];

  executeCaptcha = () => {
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (!validation.isValid) {
      return;
    }

    const { password, password2, userAgreementCheck, acceptKVK } = this.state;
    if (password !== password2) {
      this.setState({
        showError: true,
        message: I18n.translate('sign_up_passwords_not_match_error')
      });
      return;
    }

    if (!userAgreementCheck) {
      this.setState({
        showError: true,
        message: I18n.translate('sign_up_user_agreement_check_error')
      });
      return;
    }

    if (!acceptKVK) {
      this.setState({
        showError: true,
        message: I18n.translate('sign_up_user_kvk_check_error')
      });
      return;
    }

    this.setState({ submitButtonDisabled: true });
    this.state.recaptchaInstance.execute();
  };

  verifyCallback = response => {
    this.setState({ recaptchaResponse: response });
    this.submit();
  };

  saveEmail = () => {
    this.setState({ step: 2 });
  };

  toggleFilter = () => {
    this.setState({
      userAgreementCheck: !this.state.userAgreementCheck,
      showError: false
    });
  };

  toggleKVK = () => {
    this.setState({
      acceptKVK: !this.state.acceptKVK,
      showError: false
    });
  };

  submit = () => {
    let data = {
      email: this.state.userName,
      first_name: this.state.name,
      last_name: this.state.surname,
      password: this.state.password,
      gRecaptchaResponse: this.state.recaptchaResponse,
      referrer_code: this.state.referrerCode
    };
    this.setState({ submitButtonDisabled: true });
    this.props
      .signUp(data)
      .then(resp => {
        if (resp.payload.data.status === 'error') {
          if (
            resp.payload.data.status_code ===
            SERVER_ERROR_STATUS_CODES.BETA_USER_WARNING
          ) {
            this.setState({
              showError: true,
              message: I18n.translate('beta_user_error_message'),
              submitButtonDisabled: false
            });
          } else {
            this.setState({
              showError: true,
              message: resp.payload.data.reason,
              submitButtonDisabled: false
            });
          }
          this.state.recaptchaInstance.reset();
        } else {
          this.setState({ step: 3 });
        }
      })
      .catch(() => {
        this.setState({
          showError: true,
          message: I18n.translate('general_error_description')
        });
        this.state.recaptchaInstance.reset();
        this.setState({ submitButtonDisabled: false });
      });
  };

  render() {
    const { classes, tickers } = this.props;

    const { step, message, showError, referrerCodeDisabled } = this.state;

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
                  'sign_up_title'
                )}`
              : `${I18n.translate('site_title')} - ${I18n.translate(
                  'sign_up_title'
                )}`}
          </title>
        </Helmet>
        <div className={classes.logo}>
          <Link to="/">
            <img
              src={logo_white}
              className={classes.logoStyle}
              alt="Bitexen logo"
            />
          </Link>
        </div>
        <ReCAPTCHA
          ref={el => {
            this.setState({ recaptchaInstance: el });
          }}
          size="invisible"
          sitekey={configKeys.recaptchaKey}
          onChange={this.verifyCallback.bind(this)}
        />
        {step === 1 && (
          <StyledPaper className={classes.loginContainer}>
            <div className={classes.title}>
              {I18n.translate('sign_up_title')}
            </div>
            <div className={classes.hint}>
              {I18n.translate('sign_up_description')}
            </div>
            <TextField
              autoFocus
              error={validation.userName && validation.userName.isInvalid}
              helperText={validation.userName && validation.userName.message}
              id="userName"
              label={I18n.translate('login_email_field')}
              className={classes.textFieldStyle}
              value={this.state.userName}
              onChange={event => {
                this.setState({ userName: event.target.value.trim() });
              }}
              onKeyPress={ev => {
                if (ev.key === 'Enter') {
                  ev.preventDefault();
                  this.saveEmail();
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
            <Button
              disabled={this.state.submitButtonDisabled}
              variant="contained"
              color="primary"
              className={this.props.classes.buttonStyle}
              onClick={this.saveEmail.bind(this)}
            >
              {I18n.translate('login_2fa_continue_button')}
            </Button>
          </StyledPaper>
        )}
        {step === 2 && (
          <StyledPaper className={classes.loginContainer}>
            <div className={classes.title}>
              {I18n.translate('sign_up_title')}
            </div>
            <TextField
              autoFocus
              error={validation.name && validation.name.isInvalid}
              helperText={validation.name && validation.name.message}
              id="name"
              label={I18n.translate('settings_user_name')}
              className={classes.textFieldStyle}
              value={this.state.name}
              onChange={event => {
                event.target.value.length < 50 &&
                  this.setState({
                    name: event.target.value.toLocaleUpperCase('tr-TR')
                  });
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
              id="surname"
              error={validation.surname && validation.surname.isInvalid}
              helperText={validation.surname && validation.surname.message}
              label={I18n.translate('settings_user_surname')}
              className={classes.textFieldStyle}
              value={this.state.surname}
              onChange={event => {
                event.target.value.length < 50 &&
                  this.setState({
                    surname: event.target.value.toLocaleUpperCase('tr-TR')
                  });
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
              id="userName"
              error={validation.userName && validation.userName.isInvalid}
              helperText={validation.userName && validation.userName.message}
              label={I18n.translate('login_email_field')}
              className={classes.textFieldStyle}
              value={this.state.userName}
              onChange={event => {
                this.setState({ userName: event.target.value.trim() });
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
              label={I18n.translate('sign_up_password')}
              type="password"
              className={this.props.classes.textFieldStyle}
              value={this.state.password}
              onChange={event => {
                this.setState({
                  password: event.target.value.trim(),
                  showError: false
                });
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
              id="password2"
              error={validation.password2 && validation.password2.isInvalid}
              helperText={validation.password2 && validation.password2.message}
              label={I18n.translate('sign_up_password_confirm')}
              type="password"
              className={this.props.classes.textFieldStyle}
              value={this.state.password2}
              onChange={event => {
                this.setState({
                  password2: event.target.value.trim(),
                  showError: false
                });
              }}
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
              id="referrerCode"
              disabled={referrerCodeDisabled}
              className={classes.textFieldStyle}
              value={this.state.referrerCode}
              onChange={event => {
                this.setState({ referrerCode: event.target.value.trim() });
              }}
              label={I18n.translate('referrer_code')}
              InputProps={{
                classes: {
                  underline: classes.textFieldStyle
                }
              }}
              InputLabelProps={{
                classes: {
                  focused: classes.focusedLabelColor,
                  root: classes.inputLabelColor
                }
              }}
            />
            <div className={classes.userAgreementBar}>
              <Checkbox
                checked={this.state.userAgreementCheck}
                classes={{
                  default: classes.checkbox,
                  checked: classes.checkboxChecked
                }}
                onChange={this.toggleFilter}
                aria-label="verticalView"
              />
              <div
                className={classes.userAgreementLine}
                onClick={this.toggleFilter}
              >
                {I18n.currentLanguage === 'EN' &&
                  I18n.translate('sign_up_user_agreement_label')}
                <a
                  className={classes.agreementClass}
                  href="/help/user-agreement"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {I18n.translate('landing_page_footer_user_aggr')}
                </a>
                {I18n.currentLanguage === 'TR' &&
                  I18n.translate('sign_up_user_agreement_label')}
              </div>
            </div>

            <div className={classes.userAgreementBar}>
              <Checkbox
                id="acceptKVK"
                checked={this.state.acceptKVK}
                classes={{
                  default: classes.checkbox,
                  checked: classes.checkboxChecked
                }}
                onChange={this.toggleKVK}
                aria-label="verticalView"
              />
              <div
                className={classes.userAgreementLine}
                onClick={this.toggleKVK}
              >
                {I18n.currentLanguage === 'EN' &&
                  I18n.translate('sign_up_user_kvk_label')}
                <a
                  className={classes.agreementClass}
                  href="/help/kvk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {I18n.translate('landing_page_footer_kvk_aggr')}
                </a>
                {I18n.currentLanguage === 'TR' &&
                  I18n.translate('sign_up_user_kvk_label')}
              </div>
            </div>

            <div className={classes.infoBar}>
              {showError && <div className={classes.errorLabel}>{message}</div>}
            </div>
            <Button
              disabled={this.state.submitButtonDisabled}
              variant="contained"
              color="primary"
              className={this.props.classes.buttonStyle}
              onClick={this.executeCaptcha.bind(this)}
            >
              {I18n.translate('sign_up_title')}
            </Button>
          </StyledPaper>
        )}
        {step === 3 && (
          <StyledPaper
            className={classNames(classes.loginContainer, classes.fixedHeight)}
          >
            <div className={classes.footerTitle}>
              {I18n.translate('sign_up_completed_title')}
            </div>
            <div className={classNames(classes.hint, classes.center)}>
              {I18n.translate('sign_up_completed_description')}
            </div>
          </StyledPaper>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(SignUp);

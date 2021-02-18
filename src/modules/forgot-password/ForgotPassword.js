import React from 'react';
import logo_white from '../../assets/logos/bitexen_logo_blue_black.png';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import history from '../../common/history';
import I18n from '../../common/i18n/I18n';
import StyledPaper from '../../components/common/StyledPaper';
import ReCAPTCHA from 'react-google-recaptcha';
import FormValidator from '../../common/utils/formValidator';
import { Helmet } from 'react-helmet';
import { configKeys } from './../../common/config/config';

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
    color: 'rgba(48, 68, 98, 0.38)'
  },
  focusedLabelColor: {
    color: '#3ab2ee'
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

class ForgotPassword extends React.PureComponent {
  constructor(props) {
    super(props);

    this.validator = new FormValidator(this.validatorFields);
    this.submitted = false;

    this.state = {
      recaptchaInstance: null,
      username: '',
      recaptchaResponse: '',
      submitButtonDisabled: false,
      showError: false,
      errorMessage: '',
      validation: this.validator.valid()
    };
  }

  validatorFields = [
    {
      field: 'username',
      method: 'isEmpty',
      validWhen: false,
      message: I18n.translate('validation_error_required')
    },
    {
      field: 'username',
      method: 'isEmail',
      validWhen: true,
      message: I18n.translate('general_email_error_message')
    }
  ];

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
  handleUsernameChange = event => {
    this.setState({ username: event.target.value.trim(), showError: false });
  };

  submit = () => {
    this.props
      .forgotPassword({
        email: this.state.username,
        gRecaptchaResponse: this.state.recaptchaResponse
      })
      .then(resp => {
        if (resp.payload.data.status === 'error') {
          this.setState({
            showError: true,
            errorMessage: I18n.translate('error_code'),
            submitButtonDisabled: false
          });
          this.state.recaptchaInstance.reset();
        } else {
          history.push('/forgot-password-success');
        }
      })
      .catch(() => {
        this.setState({
          showError: true,
          errorMessage: I18n.translate('general_error_description'),
          submitButtonDisabled: false
        });
        this.state.recaptchaInstance.reset();
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
                  'login_forgot_password_label'
                )}`
              : `${I18n.translate('site_title')} - ${I18n.translate(
                  'login_forgot_password_label'
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
        <StyledPaper className={classes.loginContainer}>
          <div className={classes.title}>
            {I18n.translate('login_forgot_password_label')}
          </div>
          <div className={classes.hint}>
            {I18n.translate('forgot_password_description')}
          </div>
          <ReCAPTCHA
            ref={el => {
              this.setState({ recaptchaInstance: el });
            }}
            size="invisible"
            sitekey={configKeys.recaptchaKey}
            onChange={this.verifyCallback.bind(this)}
          />
          <TextField
            autoFocus
            error={validation.username && validation.username.isInvalid}
            helperText={validation.username && validation.username.message}
            id="username"
            label={I18n.translate('login_email_field')}
            className={classes.textFieldStyle}
            value={this.state.username}
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
            {I18n.translate('login_2fa_continue_button')}
          </Button>
        </StyledPaper>
      </div>
    );
  }
}

export default withStyles(styles)(ForgotPassword);

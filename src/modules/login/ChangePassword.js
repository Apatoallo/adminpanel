import React from 'react';
import logo_white from '../../assets/logos/bitexen_logo_blue_black.png';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import classNames from 'classnames';
import { SuccessIcon } from '../../components/icons/Icons';
import { withStyles } from '@material-ui/core/styles';
import I18n from '../../common/i18n/I18n';
import StyledPaper from '../../components/common/StyledPaper';
import FormValidator from '../../common/utils/formValidator';
import { configKeys } from '../../common/config/config';

const styles = theme => ({
  page: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fcfcfc',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fixedHeight: {
    height: '220px',
    alignItems: 'center'
  },
  loginContainer: {
    padding: '24px',
    width: '370px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: '30px',
    boxSizing: 'border-box'
  },
  logo: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    justifyContent: 'space-between',
    width: '1170px',
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
  },
  footerTitle: {
    fontSize: '14px',
    color: theme.colors.textColor.blue,
    fontWeight: '500',
    marginTop: '20px',
    marginBottom: '13px',
    textAlign: 'center'
  },
  hint: {
    height: '32px',
    fontSize: '14px',
    lineHeight: 'normal',
    color: theme.colors.textColor.grey87,
    marginTop: '12px'
  },
  center: {
    textAlign: 'center'
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
      password: '',
      password2: '',
      step: 1,
      showError: false,
      errorMessage: '',
      executeRecaptcha: true,
      submitButtonDisabled: false,
      validation: this.validator.valid()
    };
  }

  validatorFields = [
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
    }
  ];

  handlePasswordChange = event => {
    this.setState({ password: event.target.value, showError: false });
  };

  handlePassword2Change = event => {
    this.setState({ password2: event.target.value, showError: false });
  };

  executeCaptcha = () => {
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (!validation.isValid) {
      return;
    }

    const { password, password2 } = this.state;
    if (password !== password2) {
      this.setState({
        showError: true,
        errorMessage: I18n.translate('settings_passwords_are_not_the_same')
      });
      this.state.recaptchaInstance.reset();
      this.setState({ submitButtonDisabled: false });
      return;
    }

    this.setState({ submitButtonDisabled: true });
    this.state.recaptchaInstance.execute();
  };

  verifyCallback = response => {
    this.setState({ recaptchaResponse: response });
    this.changePassword();
  };

  changePassword = () => {
    const { password } = this.state;
    const data = {
      password: password,
      token: this.props.match.params.hash,
      gRecaptchaResponse: this.state.recaptchaResponse
    };
    this.props
      .changePassword(data)
      .then(resp => {
        if (resp.payload.data.status === 'error') {
          this.setState({
            showError: true,
            errorMessage: I18n.translate('settings_new_password_invalid_url'),
            submitButtonDisabled: false
          });
          this.state.recaptchaInstance.reset();
        } else {
          this.setState({ step: 2 });
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
    const { classes } = this.props;
    const { showError, errorMessage, step } = this.state;

    let validation = this.submitted
      ? this.validator.validate(this.state)
      : this.state.validation;

    return (
      <div className={classes.page}>
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
        {step === 1 && (
          <StyledPaper className={classes.loginContainer}>
            <div className={classes.title}>
              {I18n.translate('change_password_title')}
            </div>
            <TextField
              autoFocus
              id="password"
              error={validation.password && validation.password.isInvalid}
              helperText={validation.password && validation.password.message}
              label={I18n.translate('settings_new_password_label')}
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
            <TextField
              id="password2"
              error={validation.password2 && validation.password2.isInvalid}
              helperText={validation.password2 && validation.password2.message}
              label={I18n.translate('settings_new_password_confirm_label')}
              type="password"
              className={classes.textFieldStyle}
              value={this.state.password2}
              onChange={this.handlePassword2Change}
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
              {I18n.translate('settings_update_password_button')}
            </Button>
          </StyledPaper>
        )}
        {step === 2 && (
          <StyledPaper
            className={classNames(classes.loginContainer, classes.fixedHeight)}
          >
            <SuccessIcon fillColor="#3ab2ee" />
            <div className={classes.footerTitle}>
              {I18n.translate('settings_new_password_completed_title')}
            </div>
            <div className={classNames(classes.hint, classes.center)}>
              {I18n.translate('settings_new_password_completed_description')}
            </div>
          </StyledPaper>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Login);

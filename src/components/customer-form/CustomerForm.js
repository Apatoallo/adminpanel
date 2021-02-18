import React from 'react';
import StyledPaper from '../common/StyledPaper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import NumberFormat from 'react-number-format';
import {
  MailIcon,
  PersonIcon,
  PhoneIcon,
  VerificationIcon,
  LanguageIcon,
  VerifiedIcon
} from '../icons/Icons';
import I18n from '../../common/i18n/I18n';
import countries from '../../assets/data/countries';

const styles = theme => ({
  customerFormContainer: {
    marginTop: theme.unit.margin,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    boxSizing: 'border-box',
    height: 'auto',
    top: '136px',
    padding: '16px 24px 16px 16px'
  },
  formLine: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    lineHeight: '1.5'
  },
  inputArea: {
    color: theme.colors.textColor.input,
    marginTop: '5px',
    width: '272px'
  },
  smallInputArea: {
    marginTop: '10px',
    width: '85px'
  },
  phoneNumberInputArea: {
    marginLeft: '10px',
    marginTop: '5px',
    width: '175px'
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '24px',
    marginRight: '24px',
    boxSizing: 'border-box',
    textAlign: 'center'
  },
  iconRight: {
    marginLeft: '35px'
  },
  inputButton: {
    marginBottom: '8px',
    borderRadius: '19px',
    textTransform: 'none',
    marginRight: '-10px',
    height: '26px',
    minHeight: '26px',
    minWidth: '52px',
    lineHeight: '14px'
  },
  phoneNumberLabelWrap: {
    whiteSpace: 'nowrap',
    opacity: '.5',
    color: `${theme.colors.textColor.formLabel} !important`
  },
  menuItem: {
    background: theme.colors.background.paper,
    color: theme.colors.textColor.input,
    fontSize: '14px',
    lineHeight: '18px',
    height: '18px'
  },
  menu: {
    paddingBottom: '10px',
    marginTop: '5px',
    background: theme.colors.background.paper
  },
  verifiedLabel: {
    width: '42px',
    height: '14px',
    fontSize: '11px',
    fontWeight: '500',
    textAlign: 'center',
    color: theme.colors.textColor.blue,
    marginRight: '3px'
  },
  verifiedSection: {
    marginRight: '-8px'
  },
  formTextDisabled: {
    opacity: '.5',
    color: theme.colors.textColor.input,
    '&:before': {
      borderBottomColor: 'rgba(0, 0, 0, 0.12);'
    },
    '&:after': {
      borderBottomColor: '#3ab2ee'
    }
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
  formLabel: {
    opacity: '.5',
    color: `${theme.colors.textColor.formLabel} !important`,
    '&$formLabelFocused': {
      opacity: '1',
      color: '#3ab2ee'
    }
  },
  formLabelFocused: {},
  fillColor: {
    fill: theme.colors.background.settingsIcon
  }
});

class CustomerForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '5',
      verificationCode: '',
      countryCode: '90',
      language: 'tr'
    };
    const key = 'Name' + I18n.currentLanguage;
    this.countries = countries.sort((a, b) => a[key].localeCompare(b[key]));
  }

  componentWillMount() {
    if (this.props.userInfo) {
      if (
        this.props.userInfo.p_country_code &&
        this.props.userInfo.phone_number
      )
        this.setState({
          countryCode: this.props.userInfo.p_country_code,
          phoneNumber: this.props.userInfo.phone_number
        });
      if (this.props.userInfo.lang) {
        this.setState({
          language: this.props.userInfo.lang
        });
      }
    }
  }

  handlePhoneNumberChange = event => {
    this.setState({ phoneNumber: event.target.value });
  };

  handleVerificationCodeChange = event => {
    this.setState({ verificationCode: event.target.value });
  };

  handleCountryCodeChange = event => {
    this.setState({
      countryCode: event.target.value,
      phoneNumber: event.target.value === '90' ? '5' : ''
    });
  };

  handleLanguageChange = event => {
    const language = event.target.value;
    if (language !== this.state.language) {
      if (this.props.changeLanguage) {
        this.props.changeLanguage(language);
      }
    }
  };

  sendSms = () => {
    const phoneNumber = this.state.phoneNumber.replace(/\s/g, '');

    if (this.state.countryCode === '90') {
      if (phoneNumber.length !== 10) {
        this.props.showDialog({
          title: I18n.translate('general_error'),
          text: I18n.translate('settings_phone_number_format_warning_message'),
          okButtonText: I18n.translate('general_ok')
        });
        return;
      }
    } else {
      if (phoneNumber.length < 8) {
        this.props.showDialog({
          title: I18n.translate('general_error'),
          text: I18n.translate('settings_phone_number_format_warning_message'),
          okButtonText: I18n.translate('general_ok')
        });
        return;
      }
    }

    if (this.props.sendSms) {
      this.props.sendSms(this.state.countryCode, phoneNumber);
    }
  };

  verify = () => {
    const verificationCode = this.state.verificationCode
      .replace(' ', '')
      .trim();
    if (verificationCode.length !== 6) {
      this.props.showDialog({
        title: I18n.translate('general_error'),
        text: I18n.translate(
          'settings_auth_google_verification_warning_message'
        ),
        okButtonText: I18n.translate('general_ok')
      });
      return;
    }
    if (this.props.verify) {
      this.props.verify(verificationCode);
    }
  };

  render() {
    const { classes, userInfo, showVerificationArea } = this.props;
    const { countries } = this;

    return userInfo ? (
      <div>
        <StyledPaper className={classes.customerFormContainer}>
          <div className={classes.formLine}>
            <div className={classes.icon}>
              <MailIcon className={classes.fillColor} />
            </div>
            <TextField
              disabled={true}
              id="email"
              value={userInfo.username}
              label={I18n.translate('settings_user_email')}
              className={classes.inputArea}
              margin="normal"
              InputProps={{
                classes: {
                  underline: classes.formTextDisabled,
                  disabled: classes.formTextDisabled
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
          <div className={classes.formLine}>
            <div className={classes.icon}>
              <PersonIcon className={classes.fillColor} />
            </div>
            <TextField
              disabled={true}
              id="name"
              value={userInfo.first_name}
              label={I18n.translate('settings_user_name')}
              className={classes.inputArea}
              margin="normal"
              InputProps={{
                classes: {
                  underline: classes.formTextDisabled,
                  disabled: classes.formTextDisabled
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
          <div className={classes.formLine}>
            <div className={classes.icon}>
              <PersonIcon className={classes.fillColor} />
            </div>
            <TextField
              disabled={true}
              id="surname"
              value={userInfo.last_name}
              label={I18n.translate('settings_user_surname')}
              className={classes.inputArea}
              margin="normal"
              InputProps={{
                classes: {
                  underline: classes.formTextDisabled,
                  disabled: classes.formTextDisabled
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
          <div className={classes.formLine}>
            <div className={classes.icon}>
              <PhoneIcon className={classes.fillColor} />
            </div>
            <TextField
              id="prefix"
              select
              disabled={userInfo.verified_level !== 0}
              fullWidth
              label={I18n.translate('settings_user_phone_number')}
              value={this.state.countryCode}
              onChange={this.handleCountryCodeChange}
              className={classes.smallInputArea}
              InputProps={{
                classes: {
                  underline: classes.formText,
                  disabled: classes.formTextDisabled
                }
              }}
              SelectProps={{
                MenuProps: {
                  classes: { paper: classes.menu }
                },
                renderValue: () => '+' + this.state.countryCode
              }}
              margin="normal"
              InputLabelProps={{
                classes: {
                  focused: classes.formLabelFocused,
                  root: classes.phoneNumberLabelWrap
                }
              }}
            >
              {countries.map((country, index) => (
                <MenuItem
                  classes={{ root: classes.menuItem }}
                  key={index}
                  value={country.PhoneCode}
                >
                  {country['Name' + I18n.currentLanguage]} - {country.PhoneCode}
                </MenuItem>
              ))}
            </TextField>
            <NumberFormat
              customInput={TextField}
              autoFocus
              id="phone_number"
              format={
                this.state.countryCode === '90'
                  ? '### ### ## ##'
                  : '#############'
              }
              label="  "
              value={this.state.phoneNumber}
              onChange={this.handlePhoneNumberChange}
              className={classes.phoneNumberInputArea}
              margin="normal"
              disabled={userInfo.verified_level !== 0}
              InputProps={{
                classes: {
                  underline: classes.formText,
                  disabled: classes.formTextDisabled
                },
                endAdornment: (
                  <InputAdornment position="start">
                    {userInfo.verified_level === 0 ? (
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        className={classes.inputButton}
                        onClick={this.sendSms}
                      >
                        {I18n.translate(
                          'settings_user_verification_button_label'
                        )}
                      </Button>
                    ) : (
                      <div className={classes.verifiedSection}>
                        <span className={classes.verifiedLabel}>
                          {I18n.translate(
                            'settings_verification_status_verified'
                          )}
                        </span>
                        <VerifiedIcon />
                      </div>
                    )}
                  </InputAdornment>
                )
              }}
              InputLabelProps={{
                classes: {
                  focused: classes.formLabelFocused,
                  root: classes.phoneNumberLabelWrap
                }
              }}
            />
            {userInfo.verified_level === 0 && showVerificationArea && (
              <div className={classNames(classes.icon, classes.iconRight)}>
                <VerificationIcon className={classes.fillColor} />
              </div>
            )}
            {userInfo.verified_level === 0 && showVerificationArea && (
              <NumberFormat
                customInput={TextField}
                autoFocus
                id="verification-code"
                format="### ###"
                value={this.state.verificationCode}
                onChange={this.handleVerificationCodeChange}
                label={I18n.translate('settings_user_verification_code_label')}
                className={classes.inputArea}
                margin="normal"
                InputProps={{
                  classes: {
                    underline: classes.formText,
                    disabled: classes.formTextDisabled
                  },
                  endAdornment: (
                    <InputAdornment position="start">
                      <Button
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
                    root: classes.phoneNumberLabelWrap
                  }
                }}
              />
            )}
          </div>
          <div className={classes.formLine}>
            <div className={classes.icon}>
              <LanguageIcon className={classes.fillColor} />
            </div>
            <TextField
              id="language"
              select
              label={I18n.translate('settings_user_language')}
              className={classes.inputArea}
              value={this.state.language}
              onChange={this.handleLanguageChange}
              margin="normal"
              SelectProps={{
                MenuProps: {
                  classes: { paper: classes.menu }
                }
              }}
              InputProps={{
                classes: {
                  underline: classes.formText,
                  disabled: classes.formTextDisabled
                }
              }}
              InputLabelProps={{
                classes: {
                  focused: classes.formLabelFocused,
                  root: classes.formLabel
                }
              }}
            >
              {[
                { value: 'tr', label: I18n.translate('general_language_tr') },
                { value: 'en', label: I18n.translate('general_language_en') }
              ].map(option => (
                <MenuItem
                  classes={{ root: classes.menuItem }}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </StyledPaper>
      </div>
    ) : (
      <div />
    );
  }
}

export default withStyles(styles)(CustomerForm);

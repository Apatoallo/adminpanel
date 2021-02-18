import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import Dropzone from 'react-dropzone';

import I18n from '../../common/i18n/I18n';
import InfoPane from '../../components/common/InfoPane';
import countries from '../../assets/data/countries';
import FormValidator from '../../common/utils/formValidator';
import { checkBirthDate, checkTCKN } from '../../common/utils/stringUtil';

/* eslint-disable react/jsx-no-duplicate-props */

const styles = theme => ({
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box'
  },
  title: {
    color: theme.colors.textColor.blue,
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '24px'
  },
  infoPaneText: {
    margin: '0',
    color: theme.colors.textColor.grey87,
    fontSize: '13px'
  },
  infoPaneContainer: {
    marginBottom: '12px'
  },
  inputLabelProps: {
    color: theme.colors.background.grey87,
    '&:before': {
      borderBottomColor: theme.colors.background.lightGrey
    },
    '&:after': {
      borderBottomColor: theme.colors.textColor.blue
    }
  },
  inputLabelFocused: {
    color: theme.colors.textColor.blue,
    opacity: '1'
  },
  uploadButton: {
    marginTop: '16px',
    color: theme.colors.textColor.white,
    textTransform: 'none'
  },
  textField: {
    marginBottom: '0px',
    marginTop: '12px'
  },
  dropZone: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px 0 7px 0',
    height: '120px',
    borderWidth: '2px',
    borderColor: '#f0f0f0',
    borderStyle: 'dashed',
    borderRadius: '5px'
  },
  dropZoneInfo: {
    color: theme.colors.textColor.grey54
  }
});

class IDVerificationPopup extends React.PureComponent {
  constructor(props) {
    super(props);

    this.validator = new FormValidator(this.validatorFields);
    this.submitted = false;

    this.state = {
      country: 'TR',
      idNumber: '',
      birthDate: '',
      submitButtonDisabled: false,
      validation: this.validator.valid()
    };
    const key = 'Name' + I18n.currentLanguage;
    this.countries = countries.sort((a, b) => a[key].localeCompare(b[key]));
  }

  validatorFields = [
    {
      field: 'birthDate',
      method: 'isEmpty',
      validWhen: false,
      message: I18n.translate('validation_error_required')
    },
    {
      field: 'birthDate',
      method: () => this.state.birthDate.trim().length < 10,
      validWhen: false,
      message: I18n.translate('id_verification_invalid_birth_date')
    },
    {
      field: 'birthDate',
      method: () => checkBirthDate(this.state.birthDate),
      validWhen: true,
      message: I18n.translate('id_verification_18years_validation')
    },
    {
      field: 'idNumber',
      method: 'isEmpty',
      validWhen: false,
      message: I18n.translate('validation_error_required')
    },
    {
      field: 'idNumber',
      method: () =>
        this.state.country === 'TR' ? checkTCKN(this.state.idNumber) : true,
      validWhen: true,
      message: I18n.translate('id_verification_invalid_in_number')
    }
  ];

  onDrop = (accepted, rejected) => {
    accepted.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        file.content = reader.result;
      };
      reader.readAsDataURL(file);
    });
    if (this.props.onFilesAdd) {
      this.props.onFilesAdd(accepted, rejected);
    }
  };

  submit = () => {
    // this.setState({submitButtonDisabled: true});
    const validation = this.validator.validate(this.state);
    this.setState({ validation });

    this.submitted = true;
    if (!validation.isValid) {
      return;
    }

    if (this.props.submit) {
      this.props.submit({
        type: 'id',
        country: this.state.country,
        id: this.state.idNumber,
        birth_date: this.state.birthDate
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { submitButtonDisabled } = this.state;
    const { countries } = this;

    let validation = this.submitted
      ? this.validator.validate(this.state)
      : this.state.validation;

    return (
      <div className={classes.contentContainer}>
        <div className={classes.title}>
          {I18n.translate('settings_id_verification_title')}
        </div>
        <div className={classes.infoPaneContainer}>
          <InfoPane>
            <ul className={classes.infoPaneText}>
              <li>
                {I18n.translate('identity_verification_document_description')}
              </li>
              <li>{I18n.translate('verification_document_types')}</li>
              <li>
                <strong>
                  {I18n.translate('verification_document_warning')}
                </strong>
              </li>
            </ul>
          </InfoPane>
        </div>
        <TextField
          id="country"
          className={classes.textField}
          select
          fullWidth
          label={I18n.translate('settings_verification_country_label')}
          value={this.state.country}
          onChange={event => {
            this.setState({ country: event.target.value, idNumber: '' });
          }}
          SelectProps={{
            native: true
          }}
          InputProps={{
            classes: {
              underline: classes.inputLabelProps
            }
          }}
          margin="normal"
          InputLabelProps={{
            classes: {
              focused: classes.inputLabelFocused,
              root: classes.inputLabelProps
            }
          }}
        >
          {countries.map((country, index) => (
            <option key={index} value={country.Code}>
              {country['Name' + I18n.currentLanguage]}
            </option>
          ))}
        </TextField>
        {this.state.country === 'TR' ? (
          <NumberFormat
            customInput={TextField}
            format={'###########'}
            error={validation.idNumber && validation.idNumber.isInvalid}
            helperText={validation.idNumber && validation.idNumber.message}
            id="idNumber"
            className={classes.textField}
            value={this.state.idNumber}
            onChange={event => {
              this.setState({ idNumber: event.target.value });
            }}
            label={I18n.translate('settings_verification_tckn_no_label')}
            InputProps={{
              classes: {
                underline: classes.inputLabelProps
              }
            }}
            InputLabelProps={{
              classes: {
                focused: classes.inputLabelFocused,
                root: classes.inputLabelProps
              }
            }}
          />
        ) : (
          <TextField
            error={validation.idNumber && validation.idNumber.isInvalid}
            helperText={validation.idNumber && validation.idNumber.message}
            id="passportNumber"
            className={classes.textField}
            value={this.state.idNumber}
            onChange={event => {
              this.setState({ idNumber: event.target.value });
            }}
            label={I18n.translate('settings_verification_passport_no_label')}
            InputProps={{
              classes: {
                underline: classes.inputLabelProps
              }
            }}
            inputProps={{
              maxLength: 20
            }}
            InputLabelProps={{
              classes: {
                focused: classes.inputLabelFocused,
                root: classes.inputLabelProps
              }
            }}
          />
        )}
        <NumberFormat
          customInput={TextField}
          format="##/##/####"
          placeholder="23/02/1980"
          error={validation.birthDate && validation.birthDate.isInvalid}
          helperText={validation.birthDate && validation.birthDate.message}
          id="birthDate"
          className={classes.textField}
          value={this.state.birthDate}
          onChange={event => {
            this.setState({ birthDate: event.target.value });
          }}
          label={I18n.translate('settings_verification_birth_date_label')}
          InputProps={{
            classes: {
              underline: classes.inputLabelProps
            }
          }}
          InputLabelProps={{
            classes: {
              focused: classes.inputLabelFocused,
              root: classes.inputLabelProps
            }
          }}
        />
        <Dropzone
          className={classes.dropZone}
          accept="image/jpeg, image/png, application/pdf"
          maxSize={4194304}
          onDrop={this.onDrop.bind(this)}
        >
          <p className={classes.dropZoneInfo}>
            {I18n.translate('settings_verification_file_picker_label')}
          </p>
        </Dropzone>
        <Button
          disabled={submitButtonDisabled}
          variant="contained"
          color="primary"
          className={classes.uploadButton}
          onClick={this.submit}
        >
          {I18n.translate('settings_verification_submit_button')}
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(IDVerificationPopup);

/* eslint-enable react/jsx-no-duplicate-props */

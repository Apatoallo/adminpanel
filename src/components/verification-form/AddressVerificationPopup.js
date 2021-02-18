import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone';

import I18n from '../../common/i18n/I18n';
import InfoPane from '../../components/common/InfoPane';
import cities from '../../assets/data/cities';
import countries from '../../assets/data/countries';
import FormValidator from '../../common/utils/formValidator';

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

class AddressVerificationPopup extends React.PureComponent {
  constructor(props) {
    super(props);

    this.validator = new FormValidator(this.validatorFields);
    this.submitted = false;

    this.state = {
      country: 'TR',
      city: '',
      address: '',
      submitButtonDisabled: false,
      validation: this.validator.valid()
    };
    const key = 'Name' + I18n.currentLanguage;
    this.countries = countries.sort((a, b) => a[key].localeCompare(b[key]));
  }

  validatorFields = [
    {
      field: 'address',
      method: 'isEmpty',
      validWhen: false,
      message: I18n.translate('validation_error_required')
    },
    {
      field: 'city',
      method: () =>
        this.state.country === '' ||
        (this.state.country === 'TR' && this.state.city === ''),
      validWhen: false,
      message: I18n.translate('validation_error_required')
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
        type: 'address',
        country: this.state.country,
        city: this.state.city,
        address: this.state.address
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
          {I18n.translate('settings_verification_label')}
        </div>
        <div className={classes.infoPaneContainer}>
          <InfoPane>
            <ul className={classes.infoPaneText}>
              <li>
                {I18n.translate('address_verification_document_description')}
              </li>
              <li>{I18n.translate('verification_document_types')}</li>
              <li>
                <strong>
                  {I18n.translate('verification_document_warning')}
                </strong>
              </li>
              <li>
                <strong>
                  {I18n.translate(
                    'address_verification_document_description_line2'
                  )}
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
            this.setState({ country: event.target.value, city: '' });
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
        {this.state.country === 'TR' && (
          <TextField
            id="city"
            error={validation.city && validation.city.isInvalid}
            helperText={validation.city && validation.city.message}
            className={classes.textField}
            select
            fullWidth
            label={I18n.translate('settings_verification_city_label')}
            value={this.state.city}
            onChange={event => {
              this.setState({ city: event.target.value });
            }}
            SelectProps={{
              native: true,
              size: 10
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
            <option value="" />
            {cities
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
          </TextField>
        )}
        <TextField
          id="address"
          error={validation.address && validation.address.isInvalid}
          helperText={validation.address && validation.address.message}
          label={I18n.translate('settings_verification_address_label')}
          multiline
          rowsMax="2"
          value={this.state.address}
          onChange={event => {
            event.target.value.length < 140 &&
              this.setState({ address: event.target.value });
          }}
          className={classes.textField}
          margin="normal"
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

export default withStyles(styles)(AddressVerificationPopup);

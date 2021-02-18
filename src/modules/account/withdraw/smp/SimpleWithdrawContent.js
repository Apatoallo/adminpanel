import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import MuiDownshift from 'mui-downshift';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NumberFormat from 'react-number-format';

import history from '../../../../common/history';
import I18n from '../../../../common/i18n/I18n';
import InfoPane from '../../../../components/common/InfoPane';
import { CancelIcon } from '../../../../components/icons/Icons';
import classNames from 'classnames';
import FormValidator from '../../../../common/utils/formValidator';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogContent';

import { isDownshiftEvent } from '../../../../common/utils/downshiftUtills';

const styles = theme => ({
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box'
  },
  dialog: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    minWidth: '475px'
  },
  dialogRow: {
    display: 'flex'
  },
  dialogContent: {
    padding: '0 24px 0px 24px',
    margin: '0',
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '1.5em'
  },
  infoPaneText: {
    margin: '0',
    color: theme.colors.textColor.grey87,
    fontSize: '13px'
  },
  listItemContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: '10px',
    boxSizing: 'border-box'
  },
  addressAliasContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  cancelIconContainer: {
    height: '100%',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)'
    }
  },
  cancelIcon: {
    cursor: 'pointer'
  },
  infoPaneContainer: {
    marginBottom: '12px'
  },
  addressLabelUnderline: {
    color: theme.colors.background.grey87,
    '&:before': {
      borderBottomColor: theme.colors.background.lightGrey
    },
    '&:after': {
      borderBottomColor: theme.colors.textColor.orange
    }
  },
  addressLabel: {
    color: theme.colors.background.grey87,
    '&$cssFocused': {
      color: theme.colors.textColor.orange
    }
  },
  addressLabelShrink: {
    color: `${theme.colors.textColor.orange} !important`
  },
  cssFocused: {},
  balanceButton: {
    color: theme.colors.textColor.orange
  },
  withdrawButton: {
    marginTop: '16px',
    color: theme.colors.textColor.white,
    backgroundColor: theme.colors.textColor.orange,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.colors.textColor.orangeAccent
    }
  },
  textField: {
    marginTop: '5px'
  },
  amount: {
    margin: '5px 0 10px'
  },
  priceAdornmentStyle: {
    color: theme.colors.textColor.grey87
  },
  keyValueRow: {
    display: 'flex',
    justifyContent: 'space-between',
    color: theme.colors.textColor.grey87,
    fontSize: '14px',
    lineHeight: '22px'
  },
  value: {
    fontWeight: '700'
  },
  confirmationInfoPane: {
    marginBottom: '24px',
    padding: '0 24px'
  },
  confirmationTitle: {
    color: theme.colors.textColor.orange,
    fontSize: '16px',
    fontWeight: '500'
  },
  confirmationLeftRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    color: theme.colors.textColor.grey87,
    fontSize: '14px',
    lineHeight: '22px'
  },
  confirmationRightRow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    color: theme.colors.textColor.grey87,
    fontSize: '14px',
    lineHeight: '22px',
    marginLeft: '10px'
  },
  confirmationNote: {
    display: 'flex',
    color: theme.colors.textColor.grey87,
    fontSize: '14px',
    margin: '0',
    padding: '0'
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

class SimpleWithdrawContent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.validator = new FormValidator(this.validatorFields);
    this.submitted = false;
    this.addressSubmitted = false;

    this.state = {
      open: true,
      amount: 0,
      selectedAddress: '',
      minMaxArgs: {},
      alias: '',
      filteredItems: [],
      showConfirmationDialog: false,
      validation: this.validator.valid()
    };
  }

  validatorFields = [
    {
      field: 'selectedAddress',
      method: 'isEmpty',
      validWhen: false,
      message: () => I18n.translate('validation_error_required')
    },
    {
      field: 'selectedAddress',
      method: () => this.props.validationResult.showError === true,
      validWhen: false,
      message: () => this.props.validationResult.remarks
    },
    {
      field: 'alias',
      method: 'isLength',
      validWhen: true,
      args: {
        min: 0,
        max: 50
      },
      message: I18n.translate('validation_error_max_length', 50)
    }
  ];

  componentWillReceiveProps(nextProps) {
    if (nextProps.withdrawalInfo) {
      this.setState({ filteredItems: nextProps.withdrawalInfo.addresses });
      if (
        this.validatorFields.filter(item => item.field === 'amount').length ===
        0
      ) {
        this.validatorFields.push({
          field: 'amount',
          method: 'isFloat',
          args: {
            min: nextProps.withdrawalInfo.limits.withdraw.min_withdraw_amount,
            max: nextProps.withdrawalInfo.limits.withdraw.max_withdraw_amount,
            locale: 'en-US'
          },
          validWhen: true,
          message: I18n.translate(
            'validation_error_range',
            nextProps.withdrawalInfo.limits.withdraw.min_withdraw_amount,
            nextProps.withdrawalInfo.limits.withdraw.max_withdraw_amount,
            nextProps.token
          )
        });
        this.validator = new FormValidator(this.validatorFields);
      }
    }
  }

  handleAmountChange = event => {
    this.setState({ amount: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
    history.push('/account/assets');
  };

  handleAliasChange = event => {
    this.setState({
      alias: event.target.value
    });
  };

  cancelAlias = (currency_code, alias, address, event) => {
    event.preventDefault();
    this.props.onDeleteAddress({ currency_code, alias, address });
  };

  handleAddressInputChange = (input, event) => {
    if (!isDownshiftEvent(event.type, 'MOUSE_UP')) {
      if (!isDownshiftEvent(event.type, 'CLICK_ITEM')) {
        if (input) {
          this.setState({
            filteredItems: this.props.withdrawalInfo.addresses.filter(
              item =>
                (item.alias &&
                  input.length > 0 &&
                  item.alias.toLowerCase().startsWith(input.toLowerCase())) ||
                item.address.toLowerCase().startsWith(input.toLowerCase())
            )
          });
        }
        if (
          !isDownshiftEvent(event.type, 'BLUR_INPUT') &&
          !isDownshiftEvent(event.type, 'TOUCH_START')
        ) {
          this.setState({ selectedAddress: input ? input.trim() : '' });
          this.addressSubmitted = this.submitted
            ? false
            : this.addressSubmitted;
          const trimmedInput = input ? input.replace(/ /g, '') : '';
          if (trimmedInput.length >= 33 && trimmedInput.length <= 70) {
            this.props.onValidateAddress(this.props.token, trimmedInput);
          }
        }
      }
    }
  };

  handleAddressSelectionChange = (item, event) => {
    this.setState({
      selectedAddress: item && item.address ? item.address.trim() : '',
      alias: item && item.alias ? item.alias : ''
    });
    this.addressSubmitted = this.submitted ? false : this.addressSubmitted;
    const trimmedInput =
      item && item.address ? item.address.replace(/ /g, '') : '';
    if (trimmedInput.length >= 33 && trimmedInput.length <= 43) {
      this.props.onValidateAddress(this.props.token, trimmedInput);
    }
  };

  useAllBalance = () => {
    const balance = parseFloat(this.props.accountLine.available_balance, 10);
    const fee = parseFloat(this.props.withdrawalInfo.fees.withdraw_fee, 10);
    const tax = parseFloat(this.props.withdrawalInfo.fees.withdraw_tax, 10);
    this.setState({ amount: (balance - fee - tax).toFixed(8) });
  };

  handleConfirmationDialogClose = submit => {
    if (submit && this.props.onWithdrawRequest) {
      this.props.onWithdrawRequest(
        this.state.selectedAddress,
        '',
        this.state.alias,
        this.state.amount
      );
      this.setState({ showConfirmationDialog: false });
    } else {
      this.setState({ showConfirmationDialog: false });
    }
  };

  withdraw = () => {
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;
    this.addressSubmitted = true;

    if (validation.isValid) {
      this.setState({ showConfirmationDialog: true });
    }
  };

  getTotalAmount = () => {
    const amount = parseFloat(this.state.amount || 0, 10);
    const fee = parseFloat(this.props.withdrawalInfo.fees.withdraw_fee, 10);
    const tax = parseFloat(this.props.withdrawalInfo.fees.withdraw_tax, 10);
    return (amount + fee + tax).toFixed(
      this.props.withdrawalInfo.decimal_count
    );
  };

  render() {
    let validation = this.submitted // if the form has been submitted at least once
      ? this.validator.validate(this.state) // then check validity every time we render
      : this.state.validation; // otherwise just use what's in state

    const { classes, withdrawalInfo, validationResult } = this.props;

    return withdrawalInfo ? (
      <div className={classes.contentContainer}>
        <Dialog
          PaperProps={{
            classes: {
              root: classes.dialog
            }
          }}
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.showConfirmationDialog}
          onClose={this.handleConfirmationDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-text"
        >
          <DialogTitle id="form-dialog-title">
            <div className={classes.confirmationTitle}>
              {I18n.translate('withdraw_confirmation_dialog_title')}
            </div>
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <div style={{ display: 'flex' }}>
              <div className={classes.confirmationLeftRow}>
                <div className={classes.key}>
                  {I18n.translate(
                    'withdraw_confirmation_dialog_destination_label'
                  )}
                </div>
                <div className={classes.key}>
                  {I18n.translate('withdraw_confirmation_dialog_amount_label')}
                </div>
              </div>
              <div className={classes.confirmationRightRow}>
                <div className={classes.value}>
                  {this.state.selectedAddress}
                </div>
                <div className={classes.value}>{`${this.state.amount} ${
                  this.props.token
                }`}</div>
              </div>
            </div>
          </DialogContent>
          <DialogActions style={{ padding: '0 20px 16px 0px' }}>
            <Button
              variant="contained"
              className={this.props.classes.withdrawButton}
              onClick={() => this.handleConfirmationDialogClose(false)}
            >
              {I18n.translate('withdraw_confirmation_dialog_cancel_label')}
            </Button>
            <Button
              onClick={() => this.handleConfirmationDialogClose(true)}
              variant="contained"
              className={this.props.classes.withdrawButton}
              color="success"
            >
              {I18n.translate('withdraw_confirmation_dialog_approve_label')}
            </Button>
          </DialogActions>
        </Dialog>
        <div className={classes.infoPaneContainer}>
          <InfoPane>
            <ul className={classes.infoPaneText}>
              <li>
                <strong>{I18n.translate('withdraw_2fa_warning')}</strong>
              </li>
              <li>
                {I18n.translate(
                  'withdraw_min_label',
                  `${withdrawalInfo.limits.withdraw.min_withdraw_amount} ${
                    this.props.token
                  }`
                )}
              </li>
              <li>{I18n.translate('withdraw_alias_info')}</li>
              <li>{I18n.translate('withdraw_new_address_warning')}</li>
              <li>{I18n.translate('withdraw_first_deposit_warning')}</li>
              <li>{I18n.translate('withdraw_change_password_warning')}</li>
            </ul>
          </InfoPane>
        </div>
        <MuiDownshift
          getRootProps={() => ({})}
          getInputProps={() => ({
            label: I18n.translate(
              'transfers_eth_address_label',
              this.props.token
            ),
            placeholder: I18n.translate(
              'transfers_eth_address_placeholder',
              this.props.token
            ),
            helperText:
              this.addressSubmitted &&
              typeof validation.selectedAddress.message === 'function'
                ? validation.selectedAddress.message()
                : validationResult.remarks || '',
            error: this.addressSubmitted
              ? validation.selectedAddress.isInvalid
              : validationResult.showError,
            labelProps: {
              classes: {
                root: classNames(classes.addressLabelProps, {
                  [classes.error]: validationResult.showError
                }),
                shrink: classes.addressLabelShrink
              }
            },
            classes: {
              underline: classes.addressLabelUnderline,
              error: classes.error
            }
          })}
          items={this.state.filteredItems}
          inputValue={this.state.selectedAddress}
          onChange={this.handleAddressSelectionChange}
          onInputValueChange={this.handleAddressInputChange}
          getListItem={({ getItemProps, item }) => (
            <div className={classes.listItemContainer}>
              <ListItem button {...getItemProps()}>
                <ListItemText
                  primary={
                    <div className={classes.listItemContainer}>
                      <div className={classes.addressAliasContainer}>
                        <div>{item.address}</div>
                        <div>{item.alias}</div>
                      </div>
                      <div className={classes.iconContainer}>
                        <CancelIcon
                          className={classes.cancelIcon}
                          onClick={(key, event) =>
                            this.cancelAlias(
                              this.props.token,
                              item.alias,
                              item.address,
                              event
                            )
                          }
                        />
                      </div>
                    </div>
                  }
                />
              </ListItem>
            </div>
          )}
        />
        <TextField
          id="alias"
          className={classes.textField}
          value={this.state.alias}
          onChange={this.handleAliasChange}
          error={validation.alias.isInvalid}
          helperText={validation.alias.message}
          label={I18n.translate('general_alias')}
          InputProps={{
            classes: {
              underline: classes.addressLabelUnderline,
              error: classes.error
            }
          }}
          InputLabelProps={{
            classes: {
              root: classNames(classes.addressLabel, {
                [classes.error]: validation.alias.isInvalid
              }),
              focused: classes.cssFocused
            }
          }}
        />
        <NumberFormat
          customInput={TextField}
          decimalSeparator="."
          decimalScale={withdrawalInfo ? withdrawalInfo.decimal_count : 8}
          fixedDecimalScale
          id="amount"
          className={classes.textField}
          value={this.state.amount}
          helperText={validation.amount && validation.amount.message}
          error={validation.amount && validation.amount.isInvalid}
          onChange={this.handleAmountChange}
          label={`${I18n.translate('general_amount')} (${I18n.translate(
            'account_available_balance'
          )}: ${this.props.accountLine.available_balance} ${this.props.token})`}
          InputProps={{
            classes: {
              underline: classes.addressLabelUnderline,
              error: classes.error
            },
            startAdornment: (
              <InputAdornment position="start">
                <IconButton style={{ padding: 0 }} onClick={this.useAllBalance}>
                  <Icon
                    className={classes.balanceButton}
                    style={{ fontSize: '18px' }}
                  >
                    add_circle
                  </Icon>
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <div className={classes.priceAdornmentStyle}>
                  {this.props.token}
                </div>
              </InputAdornment>
            )
          }}
          InputLabelProps={{
            classes: {
              root: classes.addressLabel,
              focused: classes.cssFocused
            }
          }}
        />
        <div className={classes.keyValueRow}>
          <div className={classes.key}>{I18n.translate('withdraw_fee')}</div>
          <div className={classes.value}>
            {`${withdrawalInfo.fees.withdraw_fee} ${this.props.token}`}
          </div>
        </div>
        <div className={classes.keyValueRow}>
          <div className={classes.key}>{I18n.translate('withdraw_total')}</div>
          <div className={classes.value}>{`${this.getTotalAmount()} ${
            this.props.token
          }`}</div>
        </div>
        <Button
          variant="contained"
          className={this.props.classes.withdrawButton}
          onClick={this.withdraw}
          disabled={!this.props.buttonEnabled}
        >
          {I18n.translate(
            'general_withdraw_with_params',
            this.props.withdrawalInfo.currency_code
          )}
        </Button>
      </div>
    ) : (
      <div />
    );
  }
}

export default withStyles(styles)(SimpleWithdrawContent);

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
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogContent';
import Tooltip from '@material-ui/core/Tooltip';
import NumberFormat from 'react-number-format';

import history from '../../../../common/history';
import I18n from '../../../../common/i18n/I18n';
import InfoPane from '../../../../components/common/InfoPane';
import { CancelIcon } from '../../../../components/icons/Icons';
import classNames from 'classnames';
import FormValidator from '../../../../common/utils/formValidator';
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
    maxWidth: '700px'
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
  confirmationKeyValueArea: {
    display: 'table'
  },
  confirmationKeyValueRow: {
    display: 'table-row'
  },
  confirmationKey: {
    display: 'table-cell',
    textAlign: 'right',
    color: theme.colors.textColor.grey87,
    fontSize: '14px',
    lineHeight: '22px'
  },
  confirmationValue: {
    display: 'table-cell',
    color: theme.colors.textColor.grey87,
    fontSize: '14px',
    lineHeight: '22px',
    paddingLeft: '10px',
    fontWeight: '700',
    wordBreak: 'break-all'
  },
  confirmationNote: {
    display: 'flex',
    color: theme.colors.textColor.red,
    fontSize: '16px',
    fontWeight: '500',
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
  },
  checkboxLine: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '6px',
    alignItems: 'center',
    color: 'rgba(0, 0, 0, 0.54)'
  },
  checkbox: {
    color: 'rgba(48, 66, 98, 0.12)',
    padding: '0 6px 0 0',
    '&$checked': {
      color: theme.colors.textColor.orange
    }
  },
  checked: {},
  overrideText: {
    cursor: 'pointer',
    fontSize: '12px'
  },
  sizeIcon: {
    fontSize: '20px'
  },
  tooltip: {
    fontSize: '12px'
  }
});

class XrpWithdrawContent extends React.PureComponent {
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
      destinationTag: '',
      showConfirmationDialog: false,
      validation: this.validator.valid(),
      emptyTagOverride: false
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
    },
    {
      field: 'destinationTag',
      method: () => {
        return !this.state.destinationTag && !this.state.emptyTagOverride;
      },
      validWhen: false,
      message: I18n.translate('validation_error_required')
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
            'XRP'
          )
        });
        this.validator = new FormValidator(this.validatorFields);
      }
    }
  }

  handleAmountChange = event => {
    this.setState({ amount: event.target.value });
  };

  handleDestinationTagChange = event => {
    this.setState({ destinationTag: event.target.value });
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
      }
      if (
        !isDownshiftEvent(event.type, 'BLUR_INPUT') &&
        !isDownshiftEvent(event.type, 'TOUCH_START')
      ) {
        const split = input ? input.split(/[/?&]dt=/) : null;
        let address = '';
        if (split && split.length > 1) {
          address = split[0];
          this.setState({
            selectedAddress: address.trim(),
            destinationTag: !this.state.emptyTagOverride ? split[1].trim() : ''
          });
        } else {
          address = input ? input.trim() : '';
          this.setState({ selectedAddress: address });
        }
        this.addressSubmitted = this.submitted ? false : this.addressSubmitted;
        const trimmedInput = address ? input.replace(/ /g, '') : '';
        if (trimmedInput.length >= 25 && trimmedInput.length <= 35) {
          this.props.onValidateAddress('XRP', trimmedInput);
        }
      }
    }
  };

  handleAddressSelectionChange = (item, event) => {
    this.setState({
      selectedAddress: item && item.address ? item.address.trim() : '',
      alias: item && item.alias ? item.alias.trim() : '',
      destinationTag:
        !this.state.emptyTagOverride && item && item.address_detail
          ? item.address_detail.trim()
          : ''
    });
    this.addressSubmitted = this.submitted ? false : this.addressSubmitted;
    const trimmedInput =
      item && item.address ? item.address.replace(/ /g, '') : '';
    if (trimmedInput.length >= 26 && trimmedInput.length <= 35) {
      this.props.onValidateAddress('XRP', trimmedInput);
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
        this.state.destinationTag,
        this.state.alias,
        this.state.amount
      );
      this.setState({ showConfirmationDialog: false });
    } else {
      this.setState({ showConfirmationDialog: false });
    }
  };

  toggleEmptyTagOverride = evt => {
    this.setState({
      emptyTagOverride: evt.target.checked,
      destinationTag: evt.target.checked ? '' : this.state.destinationTag
    });
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
    return (amount + fee + tax).toFixed(8);
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
            {!this.state.destinationTag && (
              <InfoPane className={classes.confirmationInfoPane}>
                <div className={classes.confirmationNote}>
                  <p>
                    <strong>
                      {I18n.translate(
                        'withdraw_confirmation_dialog_warning_label'
                      )}
                      :&nbsp;
                    </strong>{' '}
                    {I18n.translate('withdraw_confirmation_dialog_xrp_warning')}
                  </p>
                </div>
              </InfoPane>
            )}
            <div className={classes.confirmationKeyValueArea}>
              <div className={classes.confirmationKeyValueRow}>
                <div className={classes.confirmationKey}>
                  {I18n.translate(
                    'withdraw_confirmation_dialog_destination_label'
                  )}
                </div>
                <div className={classes.confirmationValue}>
                  {this.state.selectedAddress}
                </div>
              </div>
              <div className={classes.confirmationKeyValueRow}>
                <div className={classes.confirmationKey}>
                  {I18n.translate('withdraw_confirmation_dialog_tag_label')}
                </div>
                <div className={classes.confirmationValue}>
                  {this.state.destinationTag}
                </div>
              </div>
              <div className={classes.confirmationKeyValueRow}>
                <div className={classes.confirmationKey}>
                  {I18n.translate('withdraw_confirmation_dialog_amount_label')}
                </div>
                <div className={classes.confirmationValue}>{`${
                  this.state.amount
                } XRP`}</div>
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
                <strong>{I18n.translate('withdraw_xrp_tag_warning')}</strong>
              </li>
              <li>
                <strong>{I18n.translate('withdraw_2fa_warning')}</strong>
              </li>
              <li>
                {I18n.translate(
                  'withdraw_min_label',
                  `${withdrawalInfo.limits.withdraw.min_withdraw_amount} XRP`
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
          getInputProps={() => ({
            label: I18n.translate('transfers_xrp_address_label'),
            placeholder: I18n.translate('transfers_xrp_address_placeholder'),
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
                root: classNames(classes.addressLabel, {
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
                              'XRP',
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
        <NumberFormat
          customInput={TextField}
          decimalSeparator="."
          decimalScale={0}
          fixedDecimalScale
          id="destination-tag"
          className={classes.textField}
          value={this.state.destinationTag}
          onChange={this.handleDestinationTagChange}
          error={validation.destinationTag.isInvalid}
          helperText={validation.destinationTag.message}
          disabled={this.state.emptyTagOverride}
          label={I18n.translate('transfers_xrp_tag_label')}
          InputProps={{
            classes: {
              underline: classes.addressLabelUnderline
            }
          }}
          InputLabelProps={{
            classes: {
              focused: classes.cssFocused,
              root: classes.addressLabel
            }
          }}
        />
        <Tooltip
          title={I18n.translate('withdraw_xrp_tag_warning')}
          placement="bottom-start"
          classes={{ tooltip: classes.tooltip }}
        >
          <div className={classes.checkboxLine}>
            <Checkbox
              checked={this.state.emptyTagOverride}
              classes={{
                root: classes.checkbox,
                checked: classes.checked
              }}
              icon={<CheckBoxOutlineBlankIcon className={classes.sizeIcon} />}
              checkedIcon={<CheckBoxIcon className={classes.sizeIcon} />}
              onChange={this.toggleEmptyTagOverride}
              aria-label="verticalView"
            />
            <div
              className={classes.overrideText}
              onClick={this.toggleEmptyTagOverride}
            >
              {I18n.translate('withdraw_override_no_tag')}
            </div>
          </div>
        </Tooltip>
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
              focused: classes.cssFocused,
              root: classNames(classes.addressLabel, {
                [classes.error]: validation.alias.isInvalid
              })
            }
          }}
        />
        <NumberFormat
          customInput={TextField}
          decimalSeparator="."
          decimalScale={8}
          fixedDecimalScale
          id="amount"
          className={classes.textField}
          value={this.state.amount}
          helperText={validation.amount && validation.amount.message}
          error={validation.amount && validation.amount.isInvalid}
          onChange={this.handleAmountChange}
          label={`${I18n.translate('general_amount')} (${I18n.translate(
            'account_available_balance'
          )}: ${this.props.accountLine.available_balance} XRP)`}
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
                <div className={classes.priceAdornmentStyle}>XRP</div>
              </InputAdornment>
            )
          }}
          InputLabelProps={{
            classes: {
              focused: classes.cssFocused,
              root: classes.addressLabel
            }
          }}
        />
        <div className={classes.keyValueRow}>
          <div className={classes.key}>{I18n.translate('withdraw_fee')}</div>
          <div className={classes.value}>
            {`${withdrawalInfo.fees.withdraw_fee} XRP`}
          </div>
        </div>
        <div className={classes.keyValueRow}>
          <div className={classes.key}>{I18n.translate('withdraw_total')}</div>
          <div className={classes.value}>{`${this.getTotalAmount()} XRP`}</div>
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

export default withStyles(styles)(XrpWithdrawContent);

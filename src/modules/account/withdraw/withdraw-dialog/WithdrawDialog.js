import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import moment from 'moment';

import history from '../../../../common/history';
import I18n from '../../../../common/i18n/I18n';
import DialogFooter from '../../../../components/dialog/DialogFooter';
import TryWithdrawContent from '../try/TryWithdrawContent';
import BtcWithdrawContent from '../btc/BtcWithdrawContent';
import XrpWithdrawContent from '../xrp/XrpWithdrawContent';
import XlmWithdrawContent from '../xlm/XlmWithdrawContent';
import WithdrawSuccess from '../WithdrawSuccess';
import { CloseIcon } from '../../../../components/icons/Icons';
import EthWithdrawContent from '../eth/EthWithdrawContent';
import ERC20TokenWithdrawContent from '../erc20/ERC20TokenWithdrawContent';
import SimpleWithdrawContent from '../smp/SimpleWithdrawContent';

const styles = theme => ({
  dialog: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    width: '600px'
  },
  withdrawContent: {
    display: 'block',
    padding: '20px'
  },
  withdrawTable: {
    display: 'table',
    width: '100%'
  },
  titleAreaContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '14px'
  },
  title: {
    color: theme.colors.textColor.orange,
    fontSize: '14px',
    fontWeight: '500'
  },
  tableRow: {
    display: 'table-row',
    lineHeight: '22px',
    fontSize: '13px'
  },
  tableCell: {
    display: 'table-cell',
    whiteSpace: 'nowrap'
  },
  tableCellRightAlign: {
    display: 'table-cell',
    textAlign: 'right',
    whiteSpace: 'nowrap'
  },
  hyperLink: {
    color: theme.colors.textColor.blue,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
});

class WithdrawDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      currencyCode: '',
      validationResult: {},
      buttonEnabled: true
    };
  }

  componentWillMount() {
    const {
      currency_code = this.props.location.pathname
        .replace(`${this.props.match.path}/`, '')
        .replace('/success', '')
        .toUpperCase()
    } = this.props.location.state || {};
    const accountLine = this.props.accountLines.filter(
      item => item.currency === currency_code
    )[0];
    this.setState({ currencyCode: currency_code, accountLine });
    this.props.getWithdrawalInfo(currency_code);
  }

  handleClose = () => {
    this.setState({ open: false });
    history.push('/account/assets');
  };

  handleDeleteAddress = (currency, alias, address) => {
    this.props.deleteWithdrawAddress(currency, alias, address).then(res => {
      if (res.payload.data.status === 'success') {
        this.props.getWithdrawalInfo(this.state.currencyCode);
      }
    });
  };

  handleWithdrawRequest = (address, addressDetail, alias, amount) => {
    this.setState({ buttonEnabled: false });

    this.handleValidateAddress(this.state.currencyCode, address).then(
      result => {
        if (!result.showError) {
          this.props
            .withdraw(this.state.currencyCode, {
              address,
              address_detail: addressDetail,
              alias,
              amount
            })
            .then(resp => {
              this.setState({ buttonEnabled: true });
              if (resp.payload.data.status === 'error') {
                this.props.showDialog({
                  title: I18n.translate('general_error'),
                  text: I18n.translate(resp.payload.data.reason),
                  okButtonText: I18n.translate('general_ok')
                });
              } else {
                history.push(`${this.props.location.pathname}/success`);
              }
            })
            .catch(err => {
              this.setState({ buttonEnabled: true });
              this.props.showDialog({
                title: I18n.translate('general_error'),
                text: I18n.translate('general_error_description'),
                okButtonText: I18n.translate('general_ok')
              });
            });
        } else {
          this.setState({ buttonEnabled: true });
        }
      }
    );
  };

  handleValidateAddress = (currency_code, address) => {
    let validationResult = { showError: false, remarks: '' };
    return new Promise(resolve =>
      this.props
        .validateAddress({ currency_code, address })
        .then(resp => {
          if (resp.payload.data.status === 'success') {
            validationResult.remarks = resp.payload.data.data.remarks;
          } else if (resp.payload.data.status === 'error') {
            validationResult.showError = true;
            validationResult.remarks = resp.payload.data.reason;
          } else {
            validationResult.showError = true;
          }
          this.setState({ validationResult });
          resolve(validationResult);
        })
        .catch(() => {
          validationResult.showError = true;
          this.setState({ validationResult });
          resolve(validationResult);
        })
    );
  };

  clickTrxHash = transfer => {
    if (transfer.trx_url) {
      const win = window.open(transfer.trx_url, '_blank');
      win.focus();
    }
  };

  render() {
    const { fullScreen, classes } = this.props;

    return (
      <Dialog
        classes={{ paper: classes.dialog }}
        fullScreen={fullScreen}
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className={classes.withdrawContent}>
          <div className={classes.titleAreaContainer}>
            <div className={classes.title}>
              {I18n.translate('withdraw_title', this.state.currencyCode)}
            </div>
            <div onClick={this.handleClose}>
              <CloseIcon />
            </div>
          </div>
          <Switch>
            <Route
              exact
              path="/account/assets/withdraw/try"
              render={() => (
                <TryWithdrawContent
                  withdrawalInfo={this.props.withdrawal.withdrawalInfo}
                  accountLine={this.state.accountLine}
                  onWithdrawRequest={this.handleWithdrawRequest}
                  onDeleteAddress={this.handleDeleteAddress}
                  onValidateAddress={this.handleValidateAddress}
                  validationResult={this.state.validationResult}
                  onClose={this.handleClose}
                  buttonEnabled={this.state.buttonEnabled}
                />
              )}
            />
            <Route
              exact
              path="/account/assets/withdraw/erc20"
              render={() => (
                <ERC20TokenWithdrawContent
                  withdrawalInfo={this.props.withdrawal.withdrawalInfo}
                  token={this.state.currencyCode}
                  accountLine={this.state.accountLine}
                  onWithdrawRequest={this.handleWithdrawRequest}
                  onValidateAddress={this.handleValidateAddress}
                  onDeleteAddress={this.handleDeleteAddress}
                  validationResult={this.state.validationResult}
                  onClose={this.handleClose}
                  buttonEnabled={this.state.buttonEnabled}
                />
              )}
            />
            <Route
              exact
              path="/account/assets/withdraw/s"
              render={() => (
                <SimpleWithdrawContent
                  withdrawalInfo={this.props.withdrawal.withdrawalInfo}
                  token={this.state.currencyCode}
                  accountLine={this.state.accountLine}
                  onWithdrawRequest={this.handleWithdrawRequest}
                  onValidateAddress={this.handleValidateAddress}
                  onDeleteAddress={this.handleDeleteAddress}
                  validationResult={this.state.validationResult}
                  onClose={this.handleClose}
                  buttonEnabled={this.state.buttonEnabled}
                />
              )}
            />
            <Route
              exact
              path="/account/assets/withdraw/btc"
              render={() => (
                <BtcWithdrawContent
                  withdrawalInfo={this.props.withdrawal.withdrawalInfo}
                  accountLine={this.state.accountLine}
                  onWithdrawRequest={this.handleWithdrawRequest}
                  onValidateAddress={this.handleValidateAddress}
                  onDeleteAddress={this.handleDeleteAddress}
                  validationResult={this.state.validationResult}
                  onClose={this.handleClose}
                  buttonEnabled={this.state.buttonEnabled}
                />
              )}
            />
            <Route
              exact
              path="/account/assets/withdraw/xrp"
              render={() => (
                <XrpWithdrawContent
                  withdrawalInfo={this.props.withdrawal.withdrawalInfo}
                  accountLine={this.state.accountLine}
                  onWithdrawRequest={this.handleWithdrawRequest}
                  onValidateAddress={this.handleValidateAddress}
                  onDeleteAddress={this.handleDeleteAddress}
                  validationResult={this.state.validationResult}
                  onClose={this.handleClose}
                  buttonEnabled={this.state.buttonEnabled}
                />
              )}
            />
            <Route
              exact
              path="/account/assets/withdraw/xlm"
              render={() => (
                <XlmWithdrawContent
                  withdrawalInfo={this.props.withdrawal.withdrawalInfo}
                  accountLine={this.state.accountLine}
                  onWithdrawRequest={this.handleWithdrawRequest}
                  onValidateAddress={this.handleValidateAddress}
                  onDeleteAddress={this.handleDeleteAddress}
                  validationResult={this.state.validationResult}
                  onClose={this.handleClose}
                  buttonEnabled={this.state.buttonEnabled}
                />
              )}
            />
            <Route
              exact
              path="/account/assets/withdraw/eth"
              render={() => (
                <EthWithdrawContent
                  withdrawalInfo={this.props.withdrawal.withdrawalInfo}
                  accountLine={this.state.accountLine}
                  onWithdrawRequest={this.handleWithdrawRequest}
                  onValidateAddress={this.handleValidateAddress}
                  onDeleteAddress={this.handleDeleteAddress}
                  validationResult={this.state.validationResult}
                  onClose={this.handleClose}
                  buttonEnabled={this.state.buttonEnabled}
                />
              )}
            />
            <Route
              path={`/account/assets/withdraw/:currency/success`}
              render={() => (
                <WithdrawSuccess
                  result={this.props.withdrawal.withdrawalRequestResult}
                />
              )}
            />
          </Switch>
        </div>
        {this.props.withdrawal.withdrawalInfo ? (
          <DialogFooter
            title={I18n.translate(
              'last_withdrawals_title',
              this.state.currencyCode
            )}
          >
            <div className={classes.withdrawTable}>
              {this.props.withdrawal.withdrawalInfo.last_withdrawals.map(
                (item, index) => (
                  <div key={index} className={classes.tableRow}>
                    <div className={classes.tableCell}>
                      <div>
                        {moment(item.add_date).format('DD-MM-YYYY HH:mm:ss')}
                      </div>
                    </div>
                    <div className={classes.tableCell}>
                      {item.alias ? (
                        <Tooltip title={item.to_address}>
                          {item.trx_url ? (
                            <a
                              className={classes.hyperLink}
                              href={item.trx_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.alias}
                            </a>
                          ) : (
                            <div>{item.alias}</div>
                          )}
                        </Tooltip>
                      ) : item.trx_url ? (
                        <a
                          className={classes.hyperLink}
                          href={item.trx_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.to_address.length > 34
                            ? item.to_address.substring(0, 22) + '...'
                            : item.to_address}
                        </a>
                      ) : (
                        <div>
                          {item.to_address.length > 34
                            ? item.to_address.substring(0, 22) + '...'
                            : item.to_address}
                        </div>
                      )}
                    </div>
                    <div className={classes.tableCell}>{item.amount}</div>
                    <div className={classes.tableCellRightAlign}>
                      {I18n.translate(`status_${item.status}`)}
                    </div>
                  </div>
                )
              )}
            </div>
          </DialogFooter>
        ) : null}
      </Dialog>
    );
  }
}

WithdrawDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(withStyles(styles)(WithdrawDialog));

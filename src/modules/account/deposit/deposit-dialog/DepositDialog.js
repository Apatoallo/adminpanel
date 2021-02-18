import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import moment from 'moment';

import history from '../../../../common/history';
import I18n from '../../../../common/i18n/I18n';
import DialogFooter from '../../../../components/dialog/DialogFooter';
import TryDepositContent from '../try/TryDepositContent';
import BtcDepositContent from '../btc/BtcDepositContent';
import XrpDepositContent from '../xrp/XrpDepositContent';
import XlmDepositContent from '../xlm/XlmDepositContent';
import { CloseIcon } from '../../../../components/icons/Icons';
import EthDepositContent from '../eth/EthDepositContent';
import ERC20TokenDepositContent from '../erc20/ERC20TokenDepositContent';

const styles = theme => ({
  dialog: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    width: '590px'
  },
  dialogContent: {
    padding: '0'
  },
  depositContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px'
  },
  titleAreaContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '14px'
  },
  title: {
    color: theme.colors.textColor.blue,
    fontSize: '14px',
    fontWeight: '500'
  },
  depositTable: {
    display: 'table',
    width: '100%'
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

class DepositDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      currencyCode: '',
      disableCreateAddressButton: false
    };
  }

  componentWillMount() {
    //Remove common urls for extraction of the currency code
    const currencyCode = this.props.location.pathname
      .replace(`${this.props.match.path}/`, '')
      .toUpperCase();
    this.setState({ currencyCode });
    this.props.getDepositInfo(currencyCode);
  }

  handleClose = () => {
    this.setState({ open: false });
    history.push('/account/assets');
  };

  handlePaparaAccept = formData => {
    console.log(formData);
    this.props
      .requestPapara(formData)
      .then(resp => {
        if (resp.payload.data.data.return_status_success) {
          window.open(resp.payload.data.data.paymentUrl, '_self');
        } else {
          this.setState({
            showError: true,
            message: resp.payload.data.data.message
            //message: I18n.translate('general_error_description')
          });
        }
      })
      .catch(() => {
        this.setState({
          showError: true,
          message: I18n.translate('general_error_description')
        });
        this.setState({ submitButtonDisabled: false });
      });
  };

  clickTrxHash = transfer => {
    if (transfer.trx_hash) {
      var win = window.open(transfer.trx_hash, '_blank');
      win.focus();
    }
  };

  createAddress = currency => {
    this.setState({ disableCreateAddressButton: true });
    this.props
      .createAddress(currency)
      .then(resp => {
        if (resp.payload.data.status === 'success') {
          this.props.getDepositInfo(this.state.currencyCode);
        } else {
          this.props.showDialog({
            title: I18n.translate('general_error'),
            text: resp.payload.data.reason,
            okButtonText: I18n.translate('general_ok')
          });
        }
        this.setState({ disableCreateAddressButton: false });
      })
      .catch(() => {
        this.setState({ disableCreateAddressButton: false });
        this.props.showDialog({
          title: I18n.translate('general_error'),
          text: I18n.translate('general_error_description'),
          okButtonText: I18n.translate('general_ok')
        });
      });
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
        <DialogContent className={classes.dialogContent}>
          <div className={classes.depositContent}>
            <div className={classes.titleAreaContainer}>
              <div className={classes.title}>
                {I18n.translate('deposit_title', this.state.currencyCode)}
              </div>
              <div onClick={this.handleClose}>
                <CloseIcon />
              </div>
            </div>
            <Switch>
              <Route
                exact
                path="/account/assets/deposit/try"
                render={() => (
                  <TryDepositContent
                    onPaparaAccept={this.handlePaparaAccept}
                    depositInfo={this.props.deposit.depositInfoTRY}
                    onClose={this.handleClose}
                  />
                )}
              />
              <Route
                exact
                path="/account/assets/deposit/btc"
                render={() => (
                  <BtcDepositContent
                    depositInfo={this.props.deposit.depositInfoBTC}
                    onClose={this.handleClose}
                    onCreateAddress={this.createAddress}
                    disableCreateAddressButton={
                      this.state.disableCreateAddressButton
                    }
                    onShowSnackbar={this.props.showSnackbar}
                    onShowDialog={this.props.showDialog}
                  />
                )}
              />
              <Route
                exact
                path="/account/assets/deposit/xrp"
                render={() => (
                  <XrpDepositContent
                    depositInfo={this.props.deposit.depositInfoXRP}
                    onClose={this.handleClose}
                    onShowSnackbar={this.props.showSnackbar}
                  />
                )}
              />
              <Route
                exact
                path="/account/assets/deposit/xlm"
                render={() => (
                  <XlmDepositContent
                    depositInfo={this.props.deposit.depositInfoXLM}
                    onClose={this.handleClose}
                    onShowSnackbar={this.props.showSnackbar}
                  />
                )}
              />
              <Route
                exact
                path="/account/assets/deposit/eth"
                render={() => (
                  <EthDepositContent
                    depositInfo={this.props.deposit.depositInfoETH}
                    onClose={this.handleClose}
                    onCreateAddress={this.createAddress}
                    onShowSnackbar={this.props.showSnackbar}
                    onShowDialog={this.props.showDialog}
                  />
                )}
              />
              <Route
                exact
                path="/account/assets/deposit/exen"
                render={() => (
                  <ERC20TokenDepositContent
                    depositInfo={this.props.deposit.depositInfoEXEN}
                    token={'EXEN'}
                    onClose={this.handleClose}
                    onCreateAddress={this.createAddress}
                    onShowSnackbar={this.props.showSnackbar}
                    onShowDialog={this.props.showDialog}
                  />
                )}
              />
              <Route
                exact
                path="/account/assets/deposit/hot"
                render={() => (
                  <ERC20TokenDepositContent
                    depositInfo={this.props.deposit.depositInfoHOT}
                    token={'HOT'}
                    onClose={this.handleClose}
                    onCreateAddress={this.createAddress}
                    onShowSnackbar={this.props.showSnackbar}
                    onShowDialog={this.props.showDialog}
                  />
                )}
              />
              <Route
                exact
                path="/account/assets/deposit/bat"
                render={() => (
                  <ERC20TokenDepositContent
                    depositInfo={this.props.deposit.depositInfoBAT}
                    token={'BAT'}
                    onClose={this.handleClose}
                    onCreateAddress={this.createAddress}
                    onShowSnackbar={this.props.showSnackbar}
                    onShowDialog={this.props.showDialog}
                  />
                )}
              />
              <Route
                exact
                path="/account/assets/deposit/zrx"
                render={() => (
                  <ERC20TokenDepositContent
                    depositInfo={this.props.deposit.depositInfoZRX}
                    token={'ZRX'}
                    onClose={this.handleClose}
                    onCreateAddress={this.createAddress}
                    onShowSnackbar={this.props.showSnackbar}
                    onShowDialog={this.props.showDialog}
                  />
                )}
              />
              <Route
                exact
                path="/account/assets/deposit/usdt"
                render={() => (
                  <ERC20TokenDepositContent
                    depositInfo={this.props.deposit.depositInfoUSDT}
                    token={'USDT'}
                    onClose={this.handleClose}
                    onCreateAddress={this.createAddress}
                    onShowSnackbar={this.props.showSnackbar}
                    onShowDialog={this.props.showDialog}
                  />
                )}
              />
              <Route
                exact
                path="/account/assets/deposit/tryb"
                render={() => (
                  <ERC20TokenDepositContent
                    depositInfo={this.props.deposit.depositInfoTRYB}
                    token={'TRYB'}
                    onClose={this.handleClose}
                    onCreateAddress={this.createAddress}
                    onShowSnackbar={this.props.showSnackbar}
                    onShowDialog={this.props.showDialog}
                  />
                )}
              />
            </Switch>
          </div>
          {this.props.deposit[`depositInfo${this.state.currencyCode}`] ? (
            <DialogFooter
              title={I18n.translate(
                'last_deposits_title',
                this.state.currencyCode
              )}
            >
              <div className={classes.depositTable}>
                {this.props.deposit[
                  `depositInfo${this.state.currencyCode}`
                ].last_deposits.map((item, index) => (
                  <div key={index} className={classes.tableRow}>
                    <div className={classes.tableCell}>
                      <div>
                        {moment(item.add_date).format('DD-MM-YYYY HH:mm:ss')}
                      </div>
                    </div>
                    <div className={classes.tableCell}>
                      {item.trx_url ? (
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
                      {item.status !== 'WFU' && item.status !== 'FIN'
                        ? I18n.translate('transfers_summary_OTHER')
                        : I18n.translate(`transfers_summary_${item.status}`)}
                    </div>
                  </div>
                ))}
              </div>
            </DialogFooter>
          ) : null}
        </DialogContent>
      </Dialog>
    );
  }
}

DepositDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(withStyles(styles)(DepositDialog));

import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { Alert } from 'antd';
import * as queryString from 'query-string';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Route, Switch } from 'react-router-dom';
import history from '../../../common/history';
import I18n from '../../../common/i18n/I18n';
import { formatMoney } from '../../../common/utils/numberUtil';
import CoinIcon from '../../../components/coin-icon/CoinIcon';
import ContrastTable from '../../../components/common/ContrastTable';
import StyledPaper from '../../../components/common/StyledPaper';
import DepositDialogContainer from '../deposit/deposit-dialog/DepositDialogContainer';
import TransferHistoryContainer from '../transfers/transfer-history/TransferHistoryContainer';
import WithdrawDialogContainer from '../withdraw/withdraw-dialog/WithdrawDialogContainer';

const palette = [
  '#3ab2ee',
  '#ab99ec',
  '#f07cb0',
  '#f7846d',
  '#cba647',
  '#7bc673',
  '#3ad09f',
  '#a7b853',
  '#e79252',
  '#fb7c8e',
  '#d589d4',
  '#77a7f5'
];

const generateColors = length => {
  let colors = [];
  let i;
  for (i = 0; i < length; i++) {
    colors.push(palette[i % palette.length]);
  }
  return colors;
};

const styles = theme => ({
  assetsContainer: {
    marginTop: theme.unit.margin
  },
  awaitingTransfers: {
    marginBottom: theme.unit.margin
  },
  depositButton: {
    color: '#3ab2ee',
    padding: '0 12px',
    borderLeft: theme.colors.borderColor.rowSeperatorBorder,
    borderRight: theme.colors.borderColor.rowSeperatorBorder,
    fontWeight: '500',
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  depositButtonDisabled: {
    color: theme.colors.textColor.formLabel,
    padding: '0 12px',
    borderLeft: theme.colors.borderColor.rowSeperatorBorder,
    borderRight: theme.colors.borderColor.rowSeperatorBorder,
    fontWeight: '500',
    cursor: 'not-allowed'
  },
  withdrawButton: {
    marginRight: '3px',
    color: '#ffb130',
    padding: '0 12px',
    borderRight: theme.colors.borderColor.rowSeperatorBorder,
    fontWeight: '500',
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  withdrawButtonDisabled: {
    color: theme.colors.textColor.formLabel,
    borderRight: theme.colors.borderColor.rowSeperatorBorder,
    padding: '0 12px',
    fontWeight: '500',
    cursor: 'not-allowed'
  },
  tradeButton: {
    marginRight: '3px',
    color: theme.colors.textColor.green,
    padding: '0 12px',
    fontWeight: '500',
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  scrollOnMobile: {
    '@media screen and (max-width: 600px)': {
      overflowX: 'auto'
    }
  },
  totalValueTitle: {
    color: theme.colors.textColor.paperHeader,
    fontSize: '14px'
  },
  totalValueContainer: {
    color: theme.colors.textColor.tableCell,
    fontSize: '16px',
    fontWeight: '500'
  },
  divider: {
    height: '2px',
    backgroundColor: theme.colors.background.divider
  },
  currencyRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  coinIconContainer: {
    width: '22px',
    marginRight: '6px'
  },
  coinIcon: {
    height: '20px'
  },
  summaryPaper: {
    marginBottom: '24px'
  },
  summaryContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    boxSizing: 'border-box'
  },
  pieChartContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  totalValueTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '16px',
    lineHeight: '24px'
  },
  paperTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '40px',
    boxSizing: 'border-box',
    padding: '0 16px'
  },
  paperTitle: {
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    color: theme.colors.textColor.paperHeader
  },
  filterContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  switchLabel: {
    color: theme.colors.textColor.paperHeader,
    fontSize: '13px',
    cursor: 'pointer',
    marginRight: '-8px',
    '@media screen and (max-width: 600px)': {
      textAlign: 'right'
    }
  },
  checkbox: {
    color: theme.colors.background.checkboxBorder,
    '&$checked': {
      color: theme.colors.textColor.blue
    },
    padding: '2px 12px'
  },
  checked: {}
});

class Assets extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      isPaparaResponseVisible: true
    };
  }

  componentDidMount() {
    this.props.getInstantTickers('TRY');
    this.props.getCurrencyList();
    //this.chartData.backgroundColors = randomColor({count: this.props.accountLines.length, seed: 'WFV5asYtU&', hue: '#3ab2ee'});
  }

  componentWillUnmount() {}

  headerItems = [
    { value: 'general_currency', numeric: false },
    { value: 'account_balance', numeric: true },
    { value: 'account_waiting_orders', numeric: true },
    { value: 'account_available_balance', numeric: true },
    { value: 'total_value_try', numeric: true },
    { value: '', numeric: false },
    { value: '', numeric: false }
  ].map(item => ({ value: I18n.translate(item.value), numeric: item.numeric }));

  showDepositModal = currency => {
    this.setState({ modalOpen: true });
    history.push(`/account/assets/deposit/${currency.toLowerCase()}`);
  };

  showWithdrawModal = (currency_code, window_name) => {
    this.setState({ modalOpen: true });
    history.push(`/account/assets/withdraw/${window_name.toLowerCase()}`, {
      currency_code
    });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  goToInstantTrade = secondCoin => {
    let firstCoin = this.balanceData.find(line => line.currency === 'TRY');
    if (secondCoin.currency_code === 'TRY') {
      firstCoin = this.balanceData.find(line => line.currency === 'BTC');
    }
    if (firstCoin && firstCoin.foundCurrencyInfo && secondCoin) {
      this.props.changePreferences(
        'instantTradeFirstCoin',
        firstCoin.foundCurrencyInfo
      );
      this.props.changePreferences('instantTradeSecondCoin', secondCoin);
      history.push('/instant/trade');
    }
  };

  mapBalanceDataAndGetTotalValueTRY = () => {
    const { tryTickers, accountLines, currencyList } = this.props;
    const mergedCurrencyList = currencyList
      ? [...currencyList.all, ...currencyList.popular]
      : null;
    let totalValue = 0,
      lineValue = 0;
    this.balanceData = [];
    if (
      tryTickers &&
      accountLines &&
      accountLines.length > 0 &&
      mergedCurrencyList
    ) {
      const colors = generateColors(accountLines.length);

      accountLines.forEach((line, index) => {
        lineValue = 0;
        if (line.currency) {
          const foundCurrencyInfo = mergedCurrencyList.find(
            cur => cur.currency_code === line.currency
          );
          if (line.currency === 'TRY') {
            lineValue = parseFloat(line.balance);
          } else {
            const foundTicker = tryTickers[line.currency];
            if (foundTicker) {
              lineValue = parseFloat(line.balance) * foundTicker.bid;
            }
          }
          this.balanceData.push({
            lineValue: lineValue.toFixed(2),
            color: colors[index],
            ...line,
            foundCurrencyInfo
          });
          totalValue += lineValue;
        }
      });
    }

    return totalValue;
  };

  getTotalValueBTC = totalValueTRY => {
    const { tryTickers } = this.props;
    if (tryTickers) {
      const btcTicker = tryTickers['BTC'];
      return btcTicker && btcTicker.ask !== '0'
        ? totalValueTRY / btcTicker.ask
        : 0;
    }
  };

  getTableData = data => {
    return data
      ? data.map(line => ({
          key: line.currency,
          values: [
            {
              value: (
                <div className={this.props.classes.currencyRow}>
                  <CoinIcon
                    currency={line.currency}
                    color="color"
                    classes={{
                      container: this.props.classes.coinIconContainer,
                      image: this.props.classes.coinIcon
                    }}
                  />
                  <div>{line.currency}</div>
                </div>
              )
            },
            { value: line.balance, numeric: true },
            { value: line.waiting_order_amount, numeric: true },
            { value: line.available_balance, numeric: true },
            { value: line.lineValue, numeric: true },
            {
              value:
                line.deposit_status !== 'A' ? (
                  <Tooltip title={line.deposit_info[I18n.currentLanguage]}>
                    <div className={this.props.classes.depositButtonDisabled}>
                      {I18n.translate('account_deposit')}
                    </div>
                  </Tooltip>
                ) : (
                  <div
                    className={this.props.classes.depositButton}
                    onClick={() => this.showDepositModal(line.currency)}
                  >
                    {I18n.translate('account_deposit')}
                  </div>
                ),
              padding: 'none',
              style: { textAlign: 'center' }
            },
            {
              value:
                line.withdraw_status !== 'A' ? (
                  <Tooltip title={line.withdraw_info[I18n.currentLanguage]}>
                    <div className={this.props.classes.withdrawButtonDisabled}>
                      {I18n.translate('account_withdraw')}
                    </div>
                  </Tooltip>
                ) : (
                  <div
                    className={this.props.classes.withdrawButton}
                    onClick={() =>
                      this.showWithdrawModal(
                        line.currency,
                        line.withdraw_window
                      )
                    }
                  >
                    {I18n.translate('account_withdraw')}
                  </div>
                ),
              padding: 'none',
              style: { textAlign: 'center' }
            },
            {
              value: (
                <div
                  className={this.props.classes.tradeButton}
                  onClick={() => this.goToInstantTrade(line.foundCurrencyInfo)}
                >
                  {I18n.translate('general_trade')}
                </div>
              ),
              padding: 'none',
              style: { textAlign: 'center' }
            }
          ].map(item => {
            return item.value ? item : { value: item, numeric: false };
          })
        }))
      : null;
  };

  generateChartData = filteredData => {
    const sortedData = [...filteredData];
    sortedData.sort((a, b) => b.lineValue - a.lineValue);

    return {
      balances: sortedData.map(item => item.balance),
      labels: sortedData.map(item => item.currency),
      data: sortedData.map(item => item.lineValue),
      colors: sortedData.map(item => item.color)
    };
  };

  toggleHideZeroBalances = () => {
    this.props.changePreferences(
      'hideZeroBalances',
      !this.props.preferences.hideZeroBalances
    );
  };

  handlePaparaAlertClose = () => {
    this.setState({
      isPaparaResponseVisible: false
    });
  };

  render() {
    const { classes, preferences, match, location } = this.props;
    const { hideZeroBalances } = preferences;
    const totalValueTRY = this.mapBalanceDataAndGetTotalValueTRY();
    const totalValueBTC = this.getTotalValueBTC(totalValueTRY);
    const filteredData = this.balanceData.filter(
      item => item.lineValue > 0.001
    );
    const chartData = this.generateChartData(filteredData);

    const queryParams = queryString.parse(location.search);

    return (
      <div className={classes.assetsContainer}>
        <TransferHistoryContainer
          title={I18n.translate('transfers_awaiting_transfers')}
          className={classes.awaitingTransfers}
          transferType="ALL"
          currencyCode="ALL"
          transferStatus="O"
          hideWhenEmpty
        />

        {this.state.isPaparaResponseVisible && queryParams.status && (
          <StyledPaper className="mb-3 px-5 text-center">
            <img height="50px" src="/images/logos/banks/papara.svg" alt="" />
            {queryParams.status == '0' && queryParams.type == 'deposit' && (
              <Alert
                className="mb-2"
                message={`${
                  queryParams.amount
                } ₺ beklemede, ödeme henüz yapılmadı.`}
                type="info"
                closable
                showIcon
                afterClose={() => this.handlePaparaAlertClose()}
              />
            )}

            {queryParams.status == '1' && queryParams.type == 'deposit' && (
              <Alert
                className="mb-2"
                message={`${
                  queryParams.amount
                } ₺ ödeme yapıldı, işlem tamamlandı.`}
                type="success"
                closable
                showIcon
                afterClose={() => this.handlePaparaAlertClose()}
              />
            )}

            {queryParams.status == '2' && queryParams.type == 'deposit' && (
              <Alert
                className="mb-2"
                message={`${
                  queryParams.amount
                } ₺ üye işyeri tarafından iade edildi.`}
                type="warning"
                closable
                showIcon
                afterClose={() => this.handlePaparaAlertClose()}
              />
            )}
          </StyledPaper>
        )}

        <StyledPaper
          className={classes.summaryPaper}
          title={I18n.translate('assets_summary_title')}
          collapsable
        >
          <div className={classes.summaryContent}>
            <div className={classes.pieChartContainer}>
              {totalValueTRY && (
                <Doughnut
                  data={{
                    datasets: [
                      {
                        data: chartData.data,
                        backgroundColor: chartData.colors,
                        borderColor: this.props.theme.colors.background.paper,
                        borderWidth: 1
                      }
                    ],
                    labels: chartData.labels
                  }}
                  options={{
                    responsive: false,
                    legend: {
                      labels: {
                        fontColor: this.props.theme.colors.textColor.tableCell,
                        usePointStyle: true
                      },
                      position: 'bottom'
                    },
                    circumference: Math.PI,
                    rotation: Math.PI,
                    tooltips: {
                      callbacks: {
                        label: function(tooltipItem, data) {
                          let label =
                            data.datasets[tooltipItem.datasetIndex].data[
                              tooltipItem.index
                            ] || '';

                          if (label) {
                            label = `${I18n.translate(
                              'general_total_approximately'
                            )}: ${Number(label).toFixed(2)} TL`;
                          }
                          return label;
                        },
                        title: function(tooltipItem, data) {
                          let currency =
                            data.labels[tooltipItem[0].index] || '';
                          let balance =
                            chartData.balances[tooltipItem[0].index];
                          let label =
                            data.datasets[tooltipItem[0].datasetIndex].data[
                              tooltipItem[0].index
                            ] || '';
                          return tooltipItem && tooltipItem.length > 0
                            ? `${balance} ${currency} (%${(
                                (label * 100) /
                                totalValueTRY
                              ).toFixed(0)})`
                            : '';
                        }
                      }
                    }
                  }}
                  width={420}
                  height={240}
                />
              )}
            </div>
            <div className={classes.totalValueTextContainer}>
              <div className={classes.totalValueTitle}>
                {I18n.translate('total_value_title')}
              </div>
              <div className={classes.totalValueContainer}>
                {`${formatMoney(totalValueTRY, 2)} TRY / ${formatMoney(
                  totalValueBTC,
                  8
                )} BTC`}
              </div>
            </div>
          </div>
        </StyledPaper>
        <StyledPaper>
          <div className={classes.paperTitleContainer}>
            <div className={classes.paperTitle}>
              {I18n.translate('account_main_account')}
            </div>
            <div className={classes.filterContainer}>
              <div
                className={classes.switchLabel}
                onClick={this.toggleHideZeroBalances}
              >
                {I18n.translate('assets_hide_zero_balances')}
              </div>
              <Checkbox
                checked={hideZeroBalances}
                classes={{
                  root: classes.checkbox,
                  checked: classes.checked
                }}
                onChange={this.toggleHideZeroBalances}
                aria-label="verticalView"
              />
            </div>
          </div>
          <Divider className={classes.divider} />
          <div className={classes.scrollOnMobile}>
            <ContrastTable
              headerItems={this.headerItems}
              padding="dense"
              data={this.getTableData(
                hideZeroBalances ? filteredData : this.balanceData
              )}
            />
          </div>
        </StyledPaper>
        <Switch>
          <Route
            path="/account/assets/deposit"
            render={() => <DepositDialogContainer onClose={this.handleClose} />}
          />
          <Route
            path="/account/assets/withdraw"
            render={() => (
              <WithdrawDialogContainer onClose={this.handleClose} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Assets);

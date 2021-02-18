import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import Tooltip from '@material-ui/core/Tooltip';
import classNames from 'classnames';
import CoinSelectorContainer from '../../../components/coin-selector/CoinSelectorContainer';
import I18n from '../../../common/i18n/I18n';
import { isUserLoggedIn } from '../../login/loginHelper';
import {
  SERVER_ERROR_STATUS_CODES,
  INSTANT_TRADE_CONSTANTS
} from '../../../common/constants';
import OrderHistoryCombinedContainer from '../../trade/market-content/order-history-combined/OrderHistoryCombinedContainer';
import {
  roundDown,
  roundToFixedDigits
} from '../../../common/utils/numberUtil';

import pageVisibilityApi from '../../../common/utils/pageVisibilityApi';
import history from '../../../common/history';
const { hidden, visibilityChange } = pageVisibilityApi();

const styles = theme => ({
  container: {
    width: '100%',
    marginTop: '24px',
    minWidth: '1179px',
    '@media screen and (max-width: 600px)': {
      width: '100%',
      minWidth: 'auto'
    },
    '@media screen and (min-width: 601px) and (max-width: 1279px)': {
      width: '100%',
      minWidth: 'auto'
    },
    '@media screen and (min-width: 1280px)': {}
  },
  coinSelector: {},
  addressLabel: {
    marginLeft: '12px',
    color: theme.colors.background.grey87,
    '&$cssFocused': {
      color: theme.colors.textColor.blue
    }
  },
  textField: {
    color: theme.colors.textColor.input
  },
  addressLabelShrink: {
    color: `${theme.colors.textColor.orange} !important`
  },
  addressLabelUnderline: {
    color: theme.colors.background.input,
    '&:before': {
      borderBottomColor: 'rgba(0, 0, 0, 0.12)'
    },
    '&:after': {
      borderBottomColor: theme.colors.textColor.blue
    }
  },
  cssFocused: {},
  listItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    margin: '12px 0'
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  spendLabel: {
    color: theme.colors.textColor.input
  },
  rightValues: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  button: {
    color: theme.colors.textColor.white,
    textTransform: 'none',
    width: '280px',
    height: '42px',
    fontSize: '1rem !important'
  },
  themedIconButton: {
    color: theme.colors.textColor.input,
    fontSize: '32px',
    '@media screen and (max-width: 600px)': {
      transform: 'rotate(90deg)'
    }
  },
  swapButton: {
    margin: '0'
  },
  priceContainer: {
    fontSize: '16px',
    color: theme.colors.textColor.input
  },
  priceArea9thDigit: {
    color: 'rgba(48, 66, 98, 0.54)',
    fontSize: '12px',
    fontWeight: '500'
  },
  openOrdersContainer: {
    marginTop: 0
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  gridItem: {
    textAlign: 'center'
  },
  orderHistoryTitlePart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '38px',
    padding: '0 16px'
  },
  orderHistoryTitle: {
    fontSize: '13px',
    fontWeight: '500',
    color: theme.colors.textColor.paperHeader
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkboxLabel: {
    color: theme.colors.textColor.paperHeader,
    fontSize: '13px',
    cursor: 'pointer',
    marginRight: '-8px'
  },
  checkbox: {
    color: theme.colors.background.checkboxBorder,
    '&$checked': {
      color: theme.colors.textColor.blue
    },
    padding: '2px 12px'
  },
  checked: {},
  divider: {
    height: '2px',
    backgroundColor: theme.colors.background.divider
  },
  gridMdAuto: {
    '@media screen and (min-width: 960px)': {
      flexBasis: '45.83333%'
    }
  },
  dialogContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  dialogTextRow: {
    margin: '12px 0'
  },
  dialogPriceRow: {
    textAlign: 'center',
    fontWeight: '700'
  },
  oldPrice: {
    textDecoration: 'line-through',
    color: theme.colors.textColor.red
  },
  newPrice: {
    color: theme.colors.textColor.green
  },
  tooltip: {
    fontSize: '13px'
  },
  buttonRow: {
    marginTop: '0'
  },
  orderHistoryPanel: {
    marginTop: '48px'
  }
});

class InstantTradePane extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      firstAmount: 0,
      price: {
        bid: '0',
        ask: '0'
      },
      firstCoinError: false,
      secondCoinError: false,
      amountValidation: { message: '', isValid: true },
      buttonEnabled: true
    };

    this.submitted = false;
    this.timer = null;
  }

  amountValidation = (
    instantTradeFirstCoin = this.props.preferences.instantTradeFirstCoin
  ) => {
    const balance =
      this.getAvailableBalance(instantTradeFirstCoin.currency_code) || '0';

    const balanceFloat = parseFloat(balance.replace(/[,]+/g, ''));
    let isValid = true;
    let message = '';

    const amountFloat = this.state.firstAmount
      ? parseFloat(this.state.firstAmount)
      : 0;

    if (amountFloat < instantTradeFirstCoin.min_amount) {
      message = I18n.translate(
        'validation_error_minimum_amount',
        `${instantTradeFirstCoin.min_amount} ${
          instantTradeFirstCoin.currency_code
        }`
      );
      isValid = false;
    } else if (isUserLoggedIn() && amountFloat > balanceFloat) {
      message = I18n.translate('validation_error_balance');
      isValid = false;
    } else if (amountFloat > instantTradeFirstCoin.max_amount) {
      message = I18n.translate(
        'validation_error_maximum_amount',
        `${instantTradeFirstCoin.max_amount} ${
          instantTradeFirstCoin.currency_code
        }`
      );
      isValid = false;
    }
    return { message, isValid };
  };

  getCurrencyFromList = currencyCode => {
    const { currencyList } = this.props;

    const foundCurrency = currencyList.all
      .concat(currencyList.popular)
      .filter(currency => currency.currency_code === currencyCode);

    if (foundCurrency && foundCurrency.length > 0) {
      return foundCurrency[0];
    } else {
      return null;
    }
  };

  componentDidMount() {
    const { preferences, currencyList } = this.props;
    const { instantTradeFirstCoin, instantTradeSecondCoin } = preferences;

    if (
      this.props.location.pathname.split('/').length > 3 &&
      this.props.location.pathname.split('/')[3] !== ''
    ) {
      const currency_pair = this.props.location.pathname.split('/')[3];
      if (currency_pair.split('_').length === 2) {
        const first_currency_code = currency_pair.split('_')[0];
        const second_currency_code = currency_pair.split('_')[1];
        if (
          (instantTradeFirstCoin &&
            instantTradeFirstCoin.currency_code !== first_currency_code) ||
          (instantTradeSecondCoin &&
            instantTradeSecondCoin.currency_code !== second_currency_code)
        ) {
          const firstCoin = this.getCurrencyFromList(first_currency_code);
          const secondCoin = this.getCurrencyFromList(second_currency_code);
          if (firstCoin && secondCoin) {
            this.props.changePreferences('instantTradeFirstCoin', firstCoin);
            this.props.changePreferences('instantTradeSecondCoin', secondCoin);
          } else {
            this.change_url(
              this.props.preferences.instantTradeFirstCoin,
              this.props.preferences.instantTradeSecondCoin
            );
          }
        }
      } else {
        this.change_url(
          this.props.preferences.instantTradeFirstCoin,
          this.props.preferences.instantTradeSecondCoin
        );
      }
    } else {
      this.change_url(
        this.props.preferences.instantTradeFirstCoin,
        this.props.preferences.instantTradeSecondCoin
      );
    }

    if (
      currencyList &&
      currencyList.all.length === 0 &&
      currencyList.popular.length > 0
    ) {
      this.props.getCurrencyList();
    }

    this.getPrice(
      instantTradeFirstCoin.currency_code,
      instantTradeSecondCoin.currency_code
    );

    this.setState({ firstAmount: instantTradeFirstCoin.def_amount });
    this.setPriceTimer();

    document.addEventListener(
      visibilityChange,
      this.handleVisibilityChange,
      false
    );
  }

  change_url(instantTradeFirstCoin, instantTradeSecondCoin) {
    history.push(
      `/instant/trade/${instantTradeFirstCoin.currency_code}_${
        instantTradeSecondCoin.currency_code
      }`
    );
  }

  componentWillUnmount() {
    if (this.timer) {
      this.clearPriceTimer();
    }
    document.removeEventListener(visibilityChange, this.handleVisibilityChange);
  }

  setPriceTimer = () => {
    const self = this;
    //console.log('starting timer');
    this.timer = setInterval(() => {
      const { preferences } = self.props;
      const { instantTradeFirstCoin, instantTradeSecondCoin } = preferences;
      //console.log('polling for', instantTradeFirstCoin.currency_code, instantTradeSecondCoin.currency_code);
      this.getPrice(
        instantTradeFirstCoin.currency_code,
        instantTradeSecondCoin.currency_code
      );
    }, INSTANT_TRADE_CONSTANTS.PRICE_POLLING_INTERVAL);
  };

  clearPriceTimer = () => {
    //console.log('clearing timer');
    clearInterval(this.timer);
    this.timer = null;
  };

  refreshPriceTimer = () => {
    this.clearPriceTimer();
    this.setPriceTimer();
  };

  handleVisibilityChange = () => {
    if (document[hidden]) {
      this.clearPriceTimer();
    } else {
      this.setPriceTimer();
    }
  };

  getPrice = (firstCurrencyCode, secondCurrencyCode) => {
    return new Promise((resolve, reject) => {
      this.props
        .getPrice(firstCurrencyCode, secondCurrencyCode)
        .then(resp => {
          if (resp.payload.data.status === 'success') {
            const price = resp.payload.data.data || { bid: '0', ask: '0' };
            this.setState({
              price: {
                bid: roundToFixedDigits(
                  price.bid,
                  INSTANT_TRADE_CONSTANTS.ROUND_PRICE_DIGITS
                ),
                ask: roundToFixedDigits(
                  price.ask,
                  INSTANT_TRADE_CONSTANTS.ROUND_PRICE_DIGITS
                )
              }
            });
            resolve(price);
          } else {
            this.props.showDialog({
              title: I18n.translate('general_error'),
              text: resp.payload.data.reason,
              okButtonText: I18n.translate('general_ok')
            });
            reject(resp.payload.data);
          }
        })
        .catch(exp => {
          this.props.showDialog({
            title: I18n.translate('general_error'),
            text: I18n.translate('general_error_description'),
            okButtonText: I18n.translate('general_ok')
          });
          reject(exp);
        });
    });
  };

  changePreference = (preference, value) => {
    this.props.changePreferences(preference, value);
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.preferences.instantTradeFirstCoin !==
        nextProps.preferences.instantTradeFirstCoin ||
      this.props.preferences.instantTradeSecondCoin !==
        nextProps.preferences.instantTradeSecondCoin
    ) {
      this.change_url(
        nextProps.preferences.instantTradeFirstCoin,
        nextProps.preferences.instantTradeSecondCoin
      );
    }
  }

  handleFirstCoinChange = coin => {
    this.submitted = false;
    if (coin) {
      const { preferences, defaultCurrencies } = this.props;
      const { instantTradeSecondCoin } = preferences;
      this.changePreference('instantTradeFirstCoin', coin);
      this.setState({ firstAmount: coin.def_amount }, () => {
        this.setState({ amountValidation: { message: '', isValid: true } });
      });
      if (coin.currency_code === instantTradeSecondCoin.currency_code) {
        const fallbackCurrency =
          defaultCurrencies[coin.currency_code === 'TRY' ? 'BTC' : 'TRY'];
        this.changePreference('instantTradeSecondCoin', fallbackCurrency);
        this.getPrice(coin.currency_code, fallbackCurrency.currency_code);
      } else {
        this.getPrice(coin.currency_code, instantTradeSecondCoin.currency_code);
      }
      this.refreshPriceTimer();
    }
  };

  handleSecondCoinChange = coin => {
    this.submitted = false;
    if (coin) {
      const { preferences, defaultCurrencies } = this.props;
      const { instantTradeFirstCoin } = preferences;
      this.changePreference('instantTradeSecondCoin', coin);
      if (coin.currency_code === instantTradeFirstCoin.currency_code) {
        const fallbackCurrency =
          defaultCurrencies[coin.currency_code === 'TRY' ? 'BTC' : 'TRY'];
        this.changePreference('instantTradeFirstCoin', fallbackCurrency);
        this.setState({ firstAmount: fallbackCurrency.def_amount });
        this.getPrice(fallbackCurrency.currency_code, coin.currency_code);
      } else {
        this.getPrice(instantTradeFirstCoin.currency_code, coin.currency_code);
      }
      this.refreshPriceTimer();
    }
  };

  handleFirstAmountChange = value => {
    this.setState({ firstAmount: value });
  };

  calculateSecondAmount = firstAmount => {
    let secondAmount = '';
    const { preferences } = this.props;
    const { instantTradeFirstCoin, instantTradeSecondCoin } = preferences;
    if (instantTradeFirstCoin.precedence > instantTradeSecondCoin.precedence) {
      //Sell -> get bid
      secondAmount = firstAmount * this.state.price.bid;
    } else {
      //Buy -> get ask
      if (this.state.price.ask > 0) {
        secondAmount = firstAmount / this.state.price.ask;
      } else {
        secondAmount = 0;
      }
    }
    return roundDown(
      secondAmount,
      instantTradeSecondCoin.decimal_count
    ).toString();
  };

  getPriceChangedWarningText = (oldPrice, newPrice) => {
    const { preferences, classes } = this.props;
    const { instantTradeFirstCoin, instantTradeSecondCoin } = preferences;
    const isSell =
      instantTradeFirstCoin.precedence > instantTradeSecondCoin.precedence;

    return (
      <div className={classes.dialogContainer}>
        <div className={classes.dialogTextRow}>
          {I18n.translate('instant_trade_price_changed')}
        </div>
        <div className={classNames(classes.dialogPriceRow, classes.oldPrice)}>
          {I18n.translate(
            'instant_trade_old_price',
            this.getPriceRepresentation(
              isSell,
              instantTradeFirstCoin,
              instantTradeSecondCoin,
              oldPrice
            )
          )}
        </div>
        <div className={classNames(classes.dialogPriceRow, classes.newPrice)}>
          {I18n.translate(
            'instant_trade_new_price',
            this.getPriceRepresentation(
              isSell,
              instantTradeFirstCoin,
              instantTradeSecondCoin,
              newPrice
            )
          )}
        </div>
        <div className={classes.dialogTextRow}>
          {I18n.translate('instant_trade_proceed_with_new_price')}
        </div>
      </div>
    );
  };

  handleClick = () => {
    this.placeOrder(this.state.price);
  };

  placeOrder = price => {
    const { preferences } = this.props;
    const { instantTradeFirstCoin, instantTradeSecondCoin } = preferences;
    const { firstAmount } = this.state;

    const secondAmount = this.calculateSecondAmount(this.state.firstAmount);
    const isSell =
      instantTradeFirstCoin.precedence > instantTradeSecondCoin.precedence;

    this.submitted = true;
    const amountValidation = this.amountValidation();
    this.setState({ amountValidation });

    if (amountValidation.isValid) {
      this.setState({ buttonEnabled: false });
      this.props
        .createInstantOrder({
          buy_currency_code: instantTradeSecondCoin.currency_code,
          sell_currency_code: instantTradeFirstCoin.currency_code,
          visible_price: isSell ? price.bid : price.ask,
          buy_amount: secondAmount.toString(),
          sell_amount: firstAmount.toString()
        })
        .then(resp => {
          this.setState({ buttonEnabled: true });
          if (resp.payload.data.status === 'error') {
            if (
              resp.payload.data.status_code ===
              SERVER_ERROR_STATUS_CODES.INSTANT_TRADE_PRICE_CHANGED
            ) {
              this.getPrice(
                instantTradeFirstCoin.currency_code,
                instantTradeSecondCoin.currency_code
              ).then(newPrice => {
                this.props.showDialog(
                  {
                    title: I18n.translate(
                      'withdraw_confirmation_dialog_warning_label'
                    ),
                    text: this.getPriceChangedWarningText(price, newPrice),
                    okButtonText: I18n.translate('general_yes'),
                    cancelButtonText: I18n.translate('general_no')
                  },
                  {
                    ok: () => this.placeOrder(newPrice)
                  }
                );
              });
            } else {
              this.props.showDialog({
                title: I18n.translate('general_error'),
                text: resp.payload.data.reason,
                okButtonText: I18n.translate('general_ok')
              });
            }
          } else {
            this.submitted = false;
          }
        })
        .catch(() => {
          this.setState({ buttonEnabled: true });
          this.props.showDialog({
            title: I18n.translate('general_error'),
            text: I18n.translate('general_error_description'),
            okButtonText: I18n.translate('general_ok')
          });
        });
    }
  };

  swapCoins = () => {
    const { preferences } = this.props;
    const { instantTradeFirstCoin, instantTradeSecondCoin } = preferences;

    this.props.changePreferences(
      'instantTradeFirstCoin',
      instantTradeSecondCoin
    );
    this.props.changePreferences(
      'instantTradeSecondCoin',
      instantTradeFirstCoin
    );
    this.getPrice(
      instantTradeSecondCoin.currency_code,
      instantTradeFirstCoin.currency_code
    );
    this.setState({ firstAmount: instantTradeSecondCoin.def_amount });
  };

  getAvailableBalance = currency_code => {
    const { accountLines } = this.props;
    if (accountLines && accountLines.length > 0) {
      const filteredLine = accountLines.filter(
        item => item.currency === currency_code
      );
      if (filteredLine && filteredLine.length > 0) {
        return filteredLine[0].available_balance;
      }
    }
    return 0;
  };

  getPriceRepresentation = (isSell, firstCoin, secondCoin, price) => {
    if (isSell) {
      return (
        <div>
          1 {firstCoin.currency_code} ≈{' '}
          {price.bid.substring(
            0,
            price.bid.length > 10 ? 10 : price.bid.length
          )}
          <span className={this.props.classes.priceArea9thDigit}>
            {price.bid.length > 10 ? price.bid.substring(10) : ''}
          </span>{' '}
          {secondCoin.currency_code}
        </div>
      );
    } else {
      return (
        <div>
          1 {secondCoin.currency_code} ≈{' '}
          {price.ask.substring(
            0,
            price.ask.length > 10 ? 10 : price.ask.length
          )}
          <span className={this.props.classes.priceArea9thDigit}>
            {price.ask.length > 10 ? price.ask.substring(10) : ''}
          </span>{' '}
          {firstCoin.currency_code}
        </div>
      );
    }
  };

  toggleFilter = () => {
    this.props.changePreferences(
      'showAllMarkets',
      !this.props.preferences.showAllMarkets
    );
  };

  toggleHideCancelledFilter = () => {
    this.props.changePreferences(
      'hideCancelled',
      !this.props.preferences.hideCancelled
    );
  };

  handleHistoryTypeChange = (event, value) => {
    this.props.changePreferences('historyType', value);
  };

  render() {
    const { classes, preferences } = this.props;
    const {
      instantTradeFirstCoin,
      instantTradeSecondCoin,
      historyType,
      showAllMarkets,
      hideCancelled
    } = preferences;
    const { firstAmount, price, buttonEnabled } = this.state;
    const isSell =
      instantTradeFirstCoin.precedence > instantTradeSecondCoin.precedence;

    const secondAmount = this.calculateSecondAmount(this.state.firstAmount);
    const priceRepresentation = this.getPriceRepresentation(
      isSell,
      instantTradeFirstCoin,
      instantTradeSecondCoin,
      price
    );

    let amountValidation = this.submitted
      ? this.amountValidation()
      : this.state.amountValidation;

    return (
      <div className={classes.container}>
        <div className={classes.column}>
          <div className={classes.row}>
            <Grid
              container
              spacing={0}
              className={classes.gridContainer}
              alignContent="stretch"
            >
              <Grid
                xs={12}
                sm={12}
                md="auto"
                item
                classes={{ 'grid-md-auto': classes.gridMdAuto }}
              >
                <CoinSelectorContainer
                  label={I18n.translate('instant_trade_you_spend')}
                  selectedCoin={instantTradeFirstCoin}
                  onSelectedCoinChange={this.handleFirstCoinChange}
                  amount={firstAmount}
                  decimalScale={instantTradeFirstCoin.decimal_count}
                  onAmountChange={this.handleFirstAmountChange}
                  amountDisabled={false}
                  availableBalance={this.getAvailableBalance(
                    instantTradeFirstCoin.currency_code
                  )}
                  error={!amountValidation.isValid}
                  errorText={amountValidation.message}
                />
              </Grid>
              <Grid xs={12} sm={12} md={1} item className={classes.gridItem}>
                <IconButton
                  className={classes.swapButton}
                  onClick={this.swapCoins}
                >
                  <SwapHoriz className={classes.themedIconButton} />
                </IconButton>
              </Grid>
              <Grid
                xs={12}
                sm={12}
                md="auto"
                item
                classes={{ 'grid-md-auto': classes.gridMdAuto }}
              >
                <CoinSelectorContainer
                  label={I18n.translate('instant_trade_you_get')}
                  selectedCoin={instantTradeSecondCoin}
                  onSelectedCoinChange={this.handleSecondCoinChange}
                  amount={secondAmount}
                  decimalScale={instantTradeSecondCoin.decimal_count}
                  amountDisabled={true}
                  availableBalance={this.getAvailableBalance(
                    instantTradeSecondCoin.currency_code
                  )}
                />
              </Grid>
            </Grid>
          </div>
          <div className={classNames(classes.row, classes.priceContainer)}>
            <Tooltip
              classes={{ tooltip: classes.tooltip }}
              title={I18n.translate('instant_trade_approximate_price_warning')}
              placement="right"
            >
              <div>{priceRepresentation}</div>
            </Tooltip>
          </div>
          <div className={classNames(classes.row, classes.buttonRow)}>
            <Button
              variant="contained"
              color={isSell ? 'secondary' : 'primary'}
              className={classes.button}
              disabled={!buttonEnabled}
              onClick={this.handleClick}
            >
              {I18n.translate(
                isSell ? 'instant_trade_sell' : 'instant_trade_buy',
                isSell
                  ? instantTradeFirstCoin.currency_code
                  : instantTradeSecondCoin.currency_code
              )}
            </Button>
          </div>
          <div className={classes.orderHistoryPanel}>
            <OrderHistoryCombinedContainer
              historyType={historyType}
              openOrdersMarketCode=""
              closedOrdersMarketCode=""
              closedOrdersPageSize={10}
              showAllMarkets={showAllMarkets}
              hideCancelled={hideCancelled}
              onHideCancelledChange={this.toggleHideCancelledFilter}
              onMarketFilterChange={this.toggleFilter}
              onHistoryTypeChange={this.handleHistoryTypeChange}
              hideAveragePrice={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(InstantTradePane);

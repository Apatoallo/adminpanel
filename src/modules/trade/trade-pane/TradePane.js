import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Icon from '@material-ui/core/Icon';
import classNames from 'classnames';

import CoinIcon from '../../../components/coin-icon/CoinIcon';
import socketHelper from '../../../api/socketHelper';

import history from '../../../common/history';
import InfoPane from '../../../components/common/InfoPane';
import TradeBalanceArea from './../TradeBalanceArea';
import StyledPaper from '../../../components/common/StyledPaper';
import NumberFormat from 'react-number-format';
import { ORDER_DIRECTIONS, ORDER_TYPES } from '../tradeConstants';
import I18n from '../../../common/i18n/I18n';
import { formatMoney } from '../../../common/utils/numberUtil';
import { isUserLoggedIn } from '../../login/loginHelper';
import PreLoginButtons from './PreLoginButtons';

const styles = theme => ({
  tradePaneStyle: {
    display: 'flex',
    flexDirection: 'column',
    width: '286px',
    height: 'calc(100vh-112px)',
    '@media screen and (max-width: 600px)': {
      position: 'initial',
      marginTop: '0',
      width: 'auto',
      minWidth: 'auto'
    }
  },
  orderDirectionContainerStyle: {
    textAlign: 'center',
    margin: '12px',
    minHeight: '28px'
  },
  orderTypeTabs: {
    height: '40px',
    minHeight: '40px'
  },
  orderTypeTabStyle: {
    minWidth: '135px',
    height: '40px',
    minHeight: '40px',
    textTransform: 'none'
  },
  noHeight: {
    height: 0
  },
  orderDirectionTabStyle: {
    minWidth: '123px',
    height: '32px',
    minHeight: '32px',
    textTransform: 'none'
  },
  orderDirectionTabsContainerStyle: {
    borderRadius: '16px',
    minHeight: '32px',
    height: '32px'
  },
  inputContainerStyle: {
    width: '100%',
    padding: '12px',
    boxSizing: 'border-box'
  },
  textFieldStyle: {
    width: '100%',
    marginBottom: '10px'
  },
  indicatorB: {
    backgroundColor: '#3ab2ee'
  },
  indicatorS: {
    backgroundColor: '#f87979'
  },
  underlineB: {
    color: theme.colors.textColor.input,
    '&:before': {
      borderBottomColor: 'rgba(0, 0, 0, 0.12);'
    },
    '&:after': {
      borderBottomColor: '#3ab2ee'
    }
  },
  underlineS: {
    color: theme.colors.textColor.input,
    '&:before': {
      borderBottomColor: 'rgba(0, 0, 0, 0.12);'
    },
    '&:after': {
      borderBottomColor: '#f87979'
    }
  },
  colorB: {
    color: '#3ab2ee !important'
  },
  colorS: {
    color: '#f87979 !important'
  },
  inputLabelB: {
    color: `${theme.colors.textColor.inputLabel}`,
    '&$cssFocused': {
      color: '#3ab2ee'
    }
  },
  inputLabelS: {
    color: theme.colors.textColor.inputLabel,
    '&$cssFocused': {
      color: '#f87979'
    }
  },
  underlineErrorB: {
    '&:after': {
      borderBottomColor: '#3ab2ee !important'
    }
  },
  underlineErrorS: {
    '&:after': {
      borderBottomColor: '#f87979 !important'
    }
  },
  formLabelDisabled: {
    color: `${theme.colors.textColor.inputLabel} !important`
  },
  buttonStyle: {
    marginTop: '12px',
    width: '100%',
    height: '36px',
    color: 'white',
    textTransform: 'none'
  },
  cssFocused: {},
  priceAdornmentStyle: {
    color: theme.colors.textColor.inputLabel
  },
  dividerStyle: {
    marginTop: '-2px',
    height: '2px',
    backgroundColor: theme.colors.background.divider
  },
  confirmationInfoPane: {
    marginBottom: '24px',
    padding: '14px 10'
  },
  confirmationInfoPaneText: {
    margin: '0',
    color: theme.colors.textColor.grey87,
    fontSize: '13px'
  },
  confirmationNote: {
    color: theme.colors.textColor.grey87,
    fontSize: '14px'
  },
  addButton: {
    padding: 0
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  tradeViewToggle: {
    margin: '4px 0'
  },
  exitToAppIcon: {
    fontSize: '20',
    marginLeft: '8px'
  },
  marketMenuPopoverBase: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: '12px',
    paddingLeft: '16px',
    width: '286px',
    height: '52px',
    cursor: 'pointer',
    boxSizing: 'border-box',
    '&:hover': {
      backgroundColor: theme.colors.background.marketBarHover
    },
    '@media screen and (max-width: 600px)': {
      width: '100%',
      padding: '0 16px'
    }
  },
  balanceMenuPopoverBase: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: '16px',
    paddingLeft: '16px',
    marginRight: '16px',
    width: '314px',
    height: '52px',
    cursor: 'pointer',
    boxSizing: 'border-box',
    '&:hover': {
      backgroundColor: theme.colors.background.marketBarHover
    },
    '@media screen and (max-width: 600px)': {
      width: '100%',
      marginRight: '0'
    }
  },
  popoverStyle: {
    width: '282px',
    scrollbarWidth: 'thin',
    height: '252px',
    overflow: 'scroll',
    backgroundColor: theme.colors.background.marketBarHover,
    color: theme.colors.textColor.white,
    '@media screen and (max-width: 600px)': {
      width: '100vw',
      left: '0 !important'
    }
  },
  balanceMenuPopoverStyle: {
    width: '314px',
    backgroundColor: theme.colors.background.marketBarHover,
    color: theme.colors.textColor.white,
    '@media screen and (max-width: 600px)': {
      width: '100vw',
      left: '0 !important'
    }
  },
  up: {
    color: theme.colors.textColor.green
  },
  down: {
    color: theme.colors.textColor.red
  },
  baseCurrencyContainer: {
    boxShadow: 'none',
    boxSizing: 'border-box',
    borderColor: '#26344e',
    borderStyle: 'solid',
    borderWidth: '4px 2px',
    borderRadius: '0 !important',
  },
  baseCurrencyGroup: {
    borderTop: '2px solid rgba(255, 255, 255, 0.05)',
    padding: '4px 8px 4px',
    boxSizing: 'border-box'
  },
  baseCurrencyRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '2px'
  },
  baseCurrencyLabel: {
    marginLeft: '2px',
    fontWeight: '700',
    fontSize: '13px'
  },
  marketRow: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: '12px',
    lineHeight: '20px',
    cursor: 'pointer'
  },
  marketPrice: {
    fontWeight: '500',
    width: '95px',
    textAlign: 'right'
  },
  marketChange: {
    width: '64px',
    fontWeight: '500',
    textAlign: 'right'
  },
  marketName: {
    width: '95px',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  highlowContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderLeft: '2px solid rgba(255, 255, 255, 0.05)',
    paddingLeft: '16px',
    boxSizing: 'border-box',
    '@media screen and (max-width: 900px)': {
      display: 'none'
    }
  },
  
  coinIconContainer: {
    width: '22px',
    marginRight: '4px'
  },
  coinIcon: {
    height: '20px'
  }
});

class TradePane extends React.Component {
  constructor(props) {
    super(props);

    this.submitted = false;

    this.state = {
      volume: '0',
      totalAmount: '0',
      price: '0',
      buttonEnabled: true,
      amountValidation: { message: '', isValid: true },
      priceValidation: { message: '', isValid: true }
    };
  }

  componentDidMount() {
    
    if (this.props.initiator === 'orderBook' && this.props.clickedOrderInfo) {
      const { clickedOrderInfo } = this.props;
      this.setState({
        price: clickedOrderInfo.price,
        volume: clickedOrderInfo.volume,
        totalAmount: clickedOrderInfo.totalAmount
      });
      this.props.changePreferences('orderType', ORDER_TYPES.LIMIT_ORDER);
      this.props.changePreferences(
        'orderDirection',
        clickedOrderInfo.orderDirection
      );
    }
    socketHelper.subscribeToTickers();
  }

  componentWillReceiveProps(nextProps) {
    const { clickedOrderInfo, ticker } = nextProps;
    if (
      ticker &&
      (this.state.price === '0' ||
        (this.props.ticker &&
          ticker.market.market_code !== this.props.ticker.market.market_code))
    ) {
      this.setState({
        price: ticker.last_price,
        volume: '0',
        totalAmount: '0'
      });
    } else if (clickedOrderInfo !== this.props.clickedOrderInfo) {
      this.setState({
        price: clickedOrderInfo.price,
        volume: clickedOrderInfo.volume,
        totalAmount: clickedOrderInfo.totalAmount
      });
      this.props.changePreferences('orderType', ORDER_TYPES.LIMIT_ORDER);
      this.props.changePreferences(
        'orderDirection',
        clickedOrderInfo.orderDirection
      );
    }
    if (this.props !== nextProps) {
      if (nextProps.markets) {
        this.baseCurrencies = [
          ...new Set(nextProps.markets.map(item => item.base_currency))
        ];
      }

      if (nextProps.accountLines && this.getBaseAccount()) {
        this.setState({
          baseBalanceColor: this.compareAndReturnColor(
            this.getBaseAccount().balance,
            this.getBaseAccount(nextProps).balance
          ),
          counterBalanceColor: this.compareAndReturnColor(
            this.getCounterAccount().balance,
            this.getCounterAccount(nextProps).balance
          )
        });
      }

      if (nextProps.accountLinesUpdateTimeout > 0) {
        if (this.accountLinesTimeoutFunc) {
          window.clearTimeout(this.accountLinesTimeoutFunc);
        }
        this.accountLinesTimeoutFunc = window.setTimeout(
          () => this.getAccountLines(false, nextProps),
          nextProps.accountLinesUpdateTimeout
        );
      }
    }
  }
  componentWillMount() {
    this.props.getMarketsInfo();
    if (!this.props.selectedMarket) {
      this.props.changeMarket('BTCTRY');
    }

    // this.getAccountLines(true);
  }

  compareAndReturnColor = (prev, next) => {
    const previousBalance = parseFloat(prev).toFixed(10);
    const nextBalance = parseFloat(next).toFixed(10);
    if (previousBalance === nextBalance) {
      return 'white';
    } else if (previousBalance > nextBalance) {
      return 'red';
    } else {
      return 'green';
    }
  };

  marketMenuPopoverBase = null;
  balanceMenuPopoverBase = null;
  baseCurrencies = null;

  getBaseAccount = (props = this.props) => {
    return (
      props.accountLines &&
      props.accountLines.filter(
        account => account.currency === this.props.selectedMarket.base_currency
      )[0]
    );
  };

  getCounterAccount = (props = this.props) => {
    return (
      props.accountLines &&
      props.accountLines.filter(
        account =>
          account.currency === this.props.selectedMarket.counter_currency
      )[0]
    );
  };

  amountValidation = () => {
    const balance = this.getNetBalance() || '0';
    const balanceFloat = parseFloat(balance.replace(/[,]+/g, ''));
    let isValid = true;
    let message = '';
    const amountFloat = this.state.volume
      ? parseFloat(this.state.volume, 10)
      : 0;
    const totalFloat = this.state.totalAmount
      ? parseFloat(this.state.totalAmount, 10)
      : 0;
    if (amountFloat < this.props.selectedMarket.minimum_order_amount) {
      message = I18n.translate(
        'validation_error_minimum_amount',
        `${this.props.selectedMarket.minimum_order_amount} ${
          this.props.selectedMarket.base_currency
        }`
      );
      isValid = false;
    } else if (!this.isBuyOrder() && amountFloat > balanceFloat) {
      message = I18n.translate('validation_error_balance');
      isValid = false;
    } else if (amountFloat > this.props.selectedMarket.maximum_order_amount) {
      message = I18n.translate(
        'validation_error_maximum_amount',
        `${this.props.selectedMarket.maximum_order_amount} ${
          this.props.selectedMarket.base_currency
        }`
      );
      isValid = false;
    }
    if (
      this.isBuyOrder() &&
      !this.isMarketOrder() &&
      totalFloat > balanceFloat
    ) {
      message = I18n.translate('validation_error_balance');
      isValid = false;
    }
    return { message, isValid };
  };

  priceValidation = () => {
    let isValid = true;
    let message = '';
    if (!this.isMarketOrder()) {
      const priceFloat = parseFloat(this.state.price || '0', 10);
      if (priceFloat === 0) {
        message = I18n.translate('validation_error_price');
        isValid = false;
      }
    }
    return { message, isValid };
  };

  handleOrderTypeChange = (event, value) => {
    this.setState({
      volume: '0',
      totalAmount: '0',
      price: this.props.ticker.last_price
    });
    this.props.changePreferences('orderType', value);
  };

  handleOrderDirectionChange = (event, value) => {
    if (this.isMarketOrder()) {
      this.setState({
        totalAmount: 0,
        volume: 0
      });
    }
    this.props.changePreferences('orderDirection', value);
  };

  showMarketOrderConfirmation = () => {
    const { classes } = this.props;
    const dismissDialog = this.props.preferences.dismissMarketOrderDialog;

    if (!dismissDialog) {
      this.props.showDialog(
        {
          title: I18n.translate('market_order_confirmation_title'),
          text: (
            <div>
              <InfoPane className={classes.confirmationInfoPane}>
                <ul className={classes.confirmationInfoPaneText}>
                  <li>{I18n.translate('trade_market_order_warning_line_1')}</li>
                  <li>{I18n.translate('trade_market_order_warning_line_2')}</li>
                </ul>
              </InfoPane>
              <div className={classes.confirmationNote}>
                {I18n.translate('trade_market_order_warning_line_3')}
              </div>
            </div>
          ),
          okButtonText: I18n.translate('general_ok'),
          cancelButtonText: I18n.translate('general_cancel'),
          dismissable: true,
          dismissPreferenceKey: 'dismissMarketOrderDialog'
        },
        {
          ok: this.placeOrder
        }
      );
    } else {
      this.placeOrder();
    }
  };

  getOrderTypeTabStyle = (orderDirection, orderType, tabIndex) => {
    let color;
    let fontWeight;
    if (orderType !== tabIndex) {
      color = this.props.theme.colors.textColor.inactiveTab;
      fontWeight = '400';
    } else {
      color = orderDirection === 'B' ? '#3ab2ee' : '#f87979';
      fontWeight = '500';
    }
    return { color, fontWeight };
  };

  getOrderDirectionTabStyle = (orderDirection, orderType, tabIndex) => {
    let color;
    let backgroundColor;
    let fontWeight;
    if (orderDirection !== tabIndex) {
      backgroundColor = this.props.theme.colors.background
        .inactiveOrderDirection;
      color = this.props.theme.colors.textColor.inactiveOrderDirection;
      fontWeight = '500';
    } else {
      backgroundColor =
        orderDirection === ORDER_DIRECTIONS.BUY ? '#3ab2ee' : '#f87979';
      color = 'white';
      fontWeight = '400';
    }
    return { backgroundColor, color, fontWeight };
  };

  getNetBalance = (props = this.props) => {
    if (props.accountLines) {
      let account = null;
      if (props.preferences.orderDirection === ORDER_DIRECTIONS.BUY) {
        account = props.accountLines.filter(
          account => account.currency === props.selectedMarket.counter_currency
        )[0];
      } else {
        account = props.accountLines.filter(
          account => account.currency === props.selectedMarket.base_currency
        )[0];
      }

      return formatMoney(
        account.available_balance,
        this.getDecimals(account.currency)
      );
    }
    return null;
  };

  getDecimals = currency => {
    return currency === 'TRY' ? 2 : 8;
  };

  handleVolumeChange = event => {
    let totalAmount;
    const volume = event.target.value;
    totalAmount = this.isMarketOrder()
      ? this.calculateTotalAmount(volume)
      : (volume * this.state.price).toFixed(8);
    this.setState({ volume, totalAmount });
  };

  calculateTotalAmount = volume => {
    let required_volume = parseFloat(volume);
    let totalAmount = 0;
    let orderbook = [];
    let order_price = this.state.price;
    if (this.isBuyOrder()) {
      orderbook = this.props.wholeSellers;
    } else {
      orderbook = this.props.wholeBuyers;
    }
    try {
      if (orderbook) {
        for (let i in orderbook) {
          if (required_volume === 0) {
            break;
          }
          let order = orderbook[i];
          order_price = parseFloat(order.orders_price);
          const order_amount = parseFloat(order.orders_total_amount);

          let amount = 0;
          if (required_volume >= order_amount) {
            amount = order_amount;
          } else {
            amount = required_volume;
          }
          const orders_value = order_price * amount;
          required_volume -= amount;
          totalAmount += orders_value;
        }
      }
      if (required_volume > 0) {
        totalAmount += order_price * required_volume;
      }
    } catch (exp) {
      if (orderbook && orderbook.length > 0) {
        const first_order = orderbook[0];
        const last_order = orderbook[orderbook.length - 1];
        const average_price =
          (parseFloat(first_order.orders_price) +
            parseFloat(last_order.orders_price)) /
          2;
        totalAmount = average_price * required_volume;
      } else {
        totalAmount = required_volume * this.state.price;
      }
    }
    return totalAmount.toFixed(8);
  };

  handleTotalAmountChange = event => {
    let volume;
    const totalAmount = event.target.value;
    volume = (totalAmount / this.state.price).toFixed(8).toString();
    this.setState({ volume, totalAmount });
  };

  handlePriceChange = event => {
    this.setState({
      price: event.target.value,
      totalAmount: (event.target.value * this.state.volume)
        .toFixed(8)
        .toString()
    });
  };

  isBuyOrder = () => {
    return this.props.preferences.orderDirection === ORDER_DIRECTIONS.BUY;
  };

  isMarketOrder = () => {
    return this.props.preferences.orderType === ORDER_TYPES.MARKET_ORDER;
  };

  useAvailableBalance = (event, isBuyOrder) => {
    const price = parseFloat(this.state.price);
    const balance = parseFloat(this.getNetBalance().replace(/[,]+/g, ''));

    if (price > 0) {
      if (isBuyOrder) {
        this.setState({
          totalAmount: balance.toString(),
          volume: (balance / price).toFixed(8).toString()
        });
      } else {
        this.setState({
          volume: balance.toString(),
          totalAmount: (balance * price).toFixed(8).toString()
        });
      }
    }
  };

  handleMouseUp = event => {
    //Workaround for NumberFormat CorrectCaretPosition bug
    event.target.value = '';
  };

  placeOrder = () => {
    const data = {
      volume: this.state.volume,
      market_code: this.props.selectedMarket.market_code,
      buy_sell: this.props.preferences.orderDirection,
      account_number: this.props.accountInfo.account_number
    };

    this.submitted = true;
    const amountValidation = this.amountValidation();
    const priceValidation = this.priceValidation();
    this.setState({ amountValidation, priceValidation });

    if (amountValidation.isValid && priceValidation.isValid) {
      this.setState({ buttonEnabled: false });
      switch (this.props.preferences.orderType) {
        case ORDER_TYPES.MARKET_ORDER:
          data.order_type = 'market';
          data.price = '0';
          this.props
            .placeMarketOrder(data)
            .then(resp => {
              this.setState({ buttonEnabled: true });
              if (resp.payload.data.status === 'error') {
                this.props.showDialog({
                  title: I18n.translate('general_error'),
                  text: resp.payload.data.reason,
                  okButtonText: I18n.translate('general_ok')
                });
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
          break;
        case ORDER_TYPES.LIMIT_ORDER:
          data.order_type = 'limit';
          data.price = this.state.price;
          this.props
            .placeLimitOrder(data)
            .then(resp => {
              this.setState({ buttonEnabled: true });
              if (resp.payload.data.status === 'error') {
                this.props.showDialog({
                  title: I18n.translate('general_error'),
                  text: resp.payload.data.reason,
                  okButtonText: I18n.translate('general_ok')
                });
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
          break;
        default:
          break;
      }
    }
  };

  changeTradeview = () => {
    const { isPreLoginMode, preferences } = this.props;
    const isAdvancedTradeView = preferences && preferences.advancedTradeView;
    this.props.changePreferences('advancedTradeView', !isAdvancedTradeView);
    history.push(
      isAdvancedTradeView ? (isPreLoginMode ? '/market' : '/') : '/advanced'
    );
  };

  changeMarket = marketCode => {
    const { preferences, changeMarket, markets } = this.props;
    const rootUrl =
      preferences && preferences.advancedTradeView ? '/advanced' : '/';
    
    const found = markets
      ? markets.filter(market => market.market_code === marketCode).length > 0
      : false;

    if (found) {
      changeMarket(marketCode);
      // this.handleMarketMenuClose();

      // if (
      //   isUserLoggedIn() &&
      //   this.props.location.pathname !== '/' &&
      //   this.props.location.pathname !== '/advanced'
      // ) {
      //   history.push(rootUrl);
      // }
    } else {
      this.props.getMarketsInfo();
    }
  };
  render() {
    const { classes, className, PaperProps, preferences } = this.props;
    const { orderType, orderDirection } = preferences;
    
    const isAdvancedView = preferences.advancedTradeView;

    let amountValidation = this.submitted
      ? this.amountValidation()
      : this.state.amountValidation;

    let priceValidation = this.submitted
      ? this.priceValidation()
      : this.state.priceValidation;

    return (
      <div className={classes.container}>
        <StyledPaper
          className={className ? className : classes.tradePaneStyle}
          {...PaperProps}
        >
          <Tabs
            value={preferences.orderType}
            onChange={this.handleOrderTypeChange}
            classes={{
              root: classNames(
                classes.orderTypeTabs,
                classes[`color${orderDirection}`]
              ),
              indicator: classes[`indicator${orderDirection}`]
            }}
            centered
          >
            <Tab
              classes={{ root: classes.orderTypeTabStyle }}
              value={ORDER_TYPES.MARKET_ORDER}
              style={this.getOrderTypeTabStyle(
                orderDirection,
                orderType,
                ORDER_TYPES.MARKET_ORDER
              )}
              label={I18n.translate('general_market')}
            />
            <Tab
              classes={{ root: classes.orderTypeTabStyle }}
              value={ORDER_TYPES.LIMIT_ORDER}
              style={this.getOrderTypeTabStyle(
                orderDirection,
                orderType,
                ORDER_TYPES.LIMIT_ORDER
              )}
              label={I18n.translate('general_limit')}
            />
          </Tabs>

          <Divider className={classes.dividerStyle} />

          <div className={classes.orderDirectionContainerStyle}>
            <Tabs
              className={classes.orderDirectionTabsContainerStyle}
              value={orderDirection}
              onChange={this.handleOrderDirectionChange}
              classes={{
                root: classes[`color${orderDirection}`],
                indicator: classes.noHeight
              }}
              textColor="primary"
              centered
            >
              <Tab
                classes={{ root: classes.orderDirectionTabStyle }}
                value={ORDER_DIRECTIONS.BUY}
                style={this.getOrderDirectionTabStyle(
                  orderDirection,
                  orderType,
                  ORDER_DIRECTIONS.BUY
                )}
                label={I18n.translate('trade_buy')}
              />
              <Tab
                classes={{ root: classes.orderDirectionTabStyle }}
                value={ORDER_DIRECTIONS.SELL}
                style={this.getOrderDirectionTabStyle(
                  orderDirection,
                  orderType,
                  ORDER_DIRECTIONS.SELL
                )}
                label={I18n.translate('trade_sell')}
              />
            </Tabs>
          </div>

          <TradeBalanceArea
            balanceAmount={this.getNetBalance()}
            baseCurrencyCode={this.props.selectedMarket.base_currency}
            counterCurrencyCode={this.props.selectedMarket.counter_currency}
            backgroundColorForBuy="rgba(58, 178, 238, 0.05)"
            backgroundColorForSell="rgba(248, 121, 121, 0.05)"
            orderDirection={orderDirection}
          />

          <div className={classes.inputContainerStyle}>
            {!this.isMarketOrder() ? (
              <NumberFormat
                customInput={TextField}
                decimalSeparator="."
                decimalScale={
                  this.props.selectedMarket.counter_currency_decimal
                }
                fixedDecimalScale
                id="price"
                error={!priceValidation.isValid}
                helperText={priceValidation.message}
                label={I18n.translate('general_price')}
                className={classes.textFieldStyle}
                value={this.state.price}
                onChange={this.handlePriceChange}
                InputProps={{
                  classes: {
                    underline: classes[`underline${orderDirection}`],
                    error: classes[`underlineError${orderDirection}`]
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <div className={classes.priceAdornmentStyle}>
                        {this.props.selectedMarket.counter_currency}
                      </div>
                    </InputAdornment>
                  )
                }}
                InputLabelProps={{
                  classes: {
                    focused: classes.cssFocused,
                    error: classes[`color${orderDirection}`],
                    root: classes[`inputLabel${orderDirection}`]
                  }
                }}
                FormHelperTextProps={{
                  classes: {
                    error: classes[`color${orderDirection}`]
                  }
                }}
              />
            ) : null}
            <NumberFormat
              customInput={TextField}
              decimalSeparator="."
              decimalScale={this.props.selectedMarket.base_currency_decimal}
              fixedDecimalScale
              id="volume"
              label={I18n.translate('general_amount')}
              className={classes.textFieldStyle}
              value={this.state.volume}
              error={!amountValidation.isValid}
              helperText={amountValidation.message}
              onChange={this.handleVolumeChange}
              InputProps={{
                classes: {
                  underline: classes[`underline${orderDirection}`],
                  error: classes[`underlineError${orderDirection}`],
                  disabled: classes.formLabelDisabled
                },
                startAdornment: !this.isBuyOrder() ? (
                  <InputAdornment position="start">
                    <IconButton
                      className={classes.addButton}
                      disabled={!isUserLoggedIn()}
                      onClick={event =>
                        this.useAvailableBalance(event, this.isBuyOrder())
                      }
                      value=""
                    >
                      <Icon
                        className={classes[`color${orderDirection}`]}
                        style={{ fontSize: '18px' }}
                        onMouseUp={this.handleMouseUp}
                      >
                        add_circle
                      </Icon>
                    </IconButton>
                  </InputAdornment>
                ) : null,
                endAdornment: (
                  <InputAdornment position="end">
                    <div className={classes.priceAdornmentStyle}>
                      {this.props.selectedMarket.base_currency}
                    </div>
                  </InputAdornment>
                )
              }}
              InputLabelProps={{
                classes: {
                  focused: classes.cssFocused,
                  error: classes[`color${orderDirection}`],
                  root: classes[`inputLabel${orderDirection}`],
                  disabled: classes[`inputLabel${orderDirection}`]
                }
              }}
              FormHelperTextProps={{
                classes: {
                  error: classes[`color${orderDirection}`]
                }
              }}
            />
            <NumberFormat
              customInput={TextField}
              decimalSeparator="."
              decimalScale={this.props.selectedMarket.counter_currency_decimal}
              fixedDecimalScale
              id="total-amount"
              disabled={this.isMarketOrder()}
              label={I18n.translate(
                this.isMarketOrder()
                  ? 'general_total_approximately'
                  : 'general_total'
              )}
              className={classes.textFieldStyle}
              value={this.state.totalAmount}
              onChange={this.handleTotalAmountChange}
              InputProps={{
                classes: {
                  underline: classes[`underline${orderDirection}`],
                  error: classes[`underlineError${orderDirection}`],
                  disabled: classes.formLabelDisabled
                },
                startAdornment:
                  this.isBuyOrder() && !this.isMarketOrder() ? (
                    <InputAdornment position="start">
                      <IconButton
                        disabled={!isUserLoggedIn()}
                        className={classes.addButton}
                        onClick={event =>
                          this.useAvailableBalance(event, this.isBuyOrder())
                        }
                      >
                        <Icon
                          className={classes[`color${orderDirection}`]}
                          style={{ fontSize: '18px' }}
                          onMouseUp={this.handleMouseUp}
                        >
                          add_circle
                        </Icon>
                      </IconButton>
                    </InputAdornment>
                  ) : null,
                endAdornment: (
                  <InputAdornment position="end">
                    <div className={classes.priceAdornmentStyle}>
                      {this.props.selectedMarket.counter_currency}
                    </div>
                  </InputAdornment>
                )
              }}
              InputLabelProps={{
                classes: {
                  focused: classes.cssFocused,
                  error: classes[`color${orderDirection}`],
                  root: classes[`inputLabel${orderDirection}`],
                  disabled: classes.formLabelDisabled
                }
              }}
            />
            {this.props.isPreLoginMode ? (
              <PreLoginButtons />
            ) : (
              <Button
                variant="contained"
                className={classes.buttonStyle}
                color={this.isBuyOrder() ? 'primary' : 'secondary'}
                onClick={
                  this.isMarketOrder()
                    ? this.showMarketOrderConfirmation
                    : this.placeOrder
                }
                disabled={!(isUserLoggedIn() && this.state.buttonEnabled)}
              >
                {I18n.translate(
                  'trade_place_order',
                  I18n.translate(this.isBuyOrder() ? 'trade_buy' : 'trade_sell')
                )}
                {/* Gelişmiş Görünüm Satış Emri sdev */} satış emri semih
              </Button>
            )}
          </div>
        </StyledPaper>
        <div className={classes.buttonContainer}>
          <Button
            size="small"
            color={this.isBuyOrder() ? 'primary' : 'secondary'}
            className={classes.tradeViewToggle}
            onClick={this.changeTradeview}
          >
            {`${I18n.translate(
              preferences && preferences.advancedTradeView
                ? 'general_basic'
                : 'general_advanced'
            )} ${I18n.translate('general_view')}`}
            <ExitToApp className={classes.exitToAppIcon} />
          </Button>
        </div>
        {isAdvancedView && (
        <div className={classes.baseCurrencyContainer}>
          <div className={classes.popoverStyle}>
            {this.props.tickers && this.baseCurrencies
              ? this.baseCurrencies.map(item => {
                  const tickersOfCurrency = this.props.tickers.filter(
                    ticker =>
                      ticker &&
                      ticker.market &&
                      ticker.market.base_currency_code === item
                  );
                  return (
                    <div
                      key={item}
                      className={classes.baseCurrencyGroup}
                    >
                      <div className={classes.baseCurrencyRow}>
                        <CoinIcon
                          currency={item}
                          color="color"
                          classes={{
                            container: classes.coinIconContainer,
                            image: classes.coinIcon
                          }}
                        />
                        <div className={classes.baseCurrencyLabel}>
                          {`${I18n.translate(
                            `general_currency_name_${item}`
                          )} (${item})`}
                        </div>
                      </div>
                      {tickersOfCurrency.map(ticker => (
                        <div
                          key={ticker.market.market_code}
                          className={classes.marketRow}
                          onClick={() =>
                            this.changeMarket(ticker.market.market_code)
                          }
                        >
                          <div className={classes.marketName}>
                            {`${ticker.market.base_currency_code} / ${
                              ticker.market.counter_currency_code
                            }${
                              ticker.market.market_code ===
                              this.props.selectedMarket.market_code
                                ? ' ✔'
                                : ''
                            }`}
                          </div>
                          <div className={classes.marketPrice}>
                            {ticker.last_price}
                          </div>
                          <div
                            className={classNames(
                              classes.marketChange,
                              { [classes.up]: ticker.change_24h > 0 },
                              { [classes.down]: ticker.change_24h < 0 }
                            )}
                          >
                            {`${ticker.change_24h}%`}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })
              : <div>semih</div>}
          </div>
        </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TradePane);

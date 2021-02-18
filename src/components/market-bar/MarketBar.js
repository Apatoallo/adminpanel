import React from 'react';
import { findDOMNode } from 'react-dom';
import DocumentTitle from 'react-document-title';
import { withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import { DropdownIcon } from '../../components/icons/Icons';
import CoinIcon from '../../components/coin-icon/CoinIcon';
import classNames from 'classnames';
import I18n from '../../common/i18n/I18n';
import { formatMoney } from '../../common/utils/numberUtil';

//import asyncPoll from 'react-async-poll';
import socketHelper from '../../api/socketHelper';
import { isUserLoggedIn } from '../../modules/login/loginHelper';
import { CURRENCY_DECIMALS } from '../../common/constants';
import history from '../../common/history';

//const onPollInterval = (props) => {
//  if (props.accountInfo) {
//    props.getAccountLines(props.accountInfo.account_number);
//  }
//};

const styles = theme => ({
  marketBarContainerStyle: {
    display: 'flex',
    backgroundColor: theme.colors.background.marketBar,
    color: theme.colors.textColor.white,
    boxSizing: 'border-box',
    justifyContent: 'center',
    width: '100%',
    height: '52px',
    position: 'fixed',
    top: '60px',
    left: '0',
    zIndex: '999',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.08)',
    '@media screen and (max-width: 600px)': {
      width: '100vw',
      height: '100px'
    }
  },
  marketBarStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '1202px',
    '@media screen and (max-width: 600px)': {
      width: '100vw',
      flexDirection: 'column'
    }
  },
  marketInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '52px',
    alignItems: 'center',
    '@media screen and (max-width: 600px)': {
      width: '100%',
      borderBottom: '2px solid rgba(255, 255, 255, 0.05)'
    }
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
    width: '286px',
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
  flip: {
    transform: 'rotate(-180deg)',
    transition: 'transform 150ms'
  },
  selectedMarketInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  valueRow: {
    fontSize: '16px',
    fontWeight: 900
  },
  descriptionRow: {
    fontSize: '12px',
    color: theme.colors.textColor.white54
  },
  lastPriceContainer: {
    boxSizing: 'border-box',
    marginLeft: theme.unit.margin,
    paddingRight: '16px',
    '@media screen and (max-width: 600px)': {
      display: 'none'
    }
  },
  volumeContainer: {
    boxSizing: 'border-box',
    padding: '0px 16px',
    borderLeft: '2px solid rgba(255, 255, 255, 0.05)',
    '@media screen and (max-width: 600px)': {
      display: 'none'
    }
  },
  changeContainer: {
    boxSizing: 'border-box',
    padding: '0px 16px',
    borderLeft: '2px solid rgba(255, 255, 255, 0.05)',
    '@media screen and (max-width: 600px)': {
      display: 'none'
    }
  },
  up: {
    color: theme.colors.textColor.green
  },
  down: {
    color: theme.colors.textColor.red
  },
  baseCurrencyGroup: {
    borderTop: '2px solid rgba(255, 255, 255, 0.05)',
    padding: '12px 16px 10px',
    boxSizing: 'border-box'
  },
  baseCurrencyRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '16px'
  },
  baseCurrencyLabel: {
    marginLeft: '2px',
    fontWeight: '700',
    fontSize: '16px'
  },
  marketRow: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: '14px',
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
  balancePopoverBaseRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    lineHeight: '18px'
  },
  keyValueRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    lineHeight: '24px'
  },
  key: {
    color: theme.colors.textColor.white54
  },
  value: {
    color: theme.colors.textColor.white,
    fontWeight: 900
  },
  marketBalanceInfo: {
    width: '100%',
    paddingRight: '24px',
    boxSizing: 'border-box',
    zIndex: '2500'
  },
  balanceMenuContent: {
    borderTop: '2px solid rgba(255, 255, 255, 0.05)',
    padding: '14px 54px 14px 16px',
    boxSizing: 'border-box'
  },
  balanceMenuPaper: {
    backgroundColor: theme.colors.background.marketBar,
    borderRadius: '0 0 12px 12px',
    '@media screen and (max-width: 600px)': {
      maxWidth: '100vw',
      left: '0 !important'
    }
  },
  popoverBaseOpen: {
    backgroundColor: theme.colors.background.marketBarHover
  },
  red: {
    animationName: 'whiteRedWhite',
    animationDuration: '2s'
  },
  green: {
    animationName: 'whiteGreenWhite',
    animationDuration: '2s'
  },
  balanceAreaContainer: {
    '@media screen and (max-width: 600px)': {
      width: '100%'
    }
  },
  popoverPaper: {
    borderRadius: '0',
    '@media screen and (max-width: 600px)': {
      maxWidth: '100vw',
      left: '0 !important',
      borderRadius: '0 0 12px 12px'
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
  highLowValue: {
    color: theme.colors.textColor.white,
    fontWeight: 900,
    marginLeft: '6px'
  },
  coinIconContainer: {
    width: '22px',
    marginRight: '4px'
  },
  coinIcon: {
    height: '20px'
  }
});

class MarketBar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      marketMenuOpen: false,
      balanceMenuOpen: false,
      marketMenuAnchor: findDOMNode(this.marketMenuPopoverBase),
      balanceMenuAnchor: findDOMNode(this.balanceMenuPopoverBase),
      baseBalanceColor: 'white',
      counterBalanceColor: 'white'
    };
  }

  accountLinesTimeoutFunc = null;

  componentWillReceiveProps(nextProps) {
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

  getAccountLines(initial, props = this.props) {
    if (props.accountInfo) {
      props.getAccountLines(props.accountInfo.account_number);
    }
    if (isUserLoggedIn() && !props.accountInfo) {
      props.getDetail().then(() => {
        props.getAccountLines(props.accountInfo.account_number);
      });
    } else if ((initial || !props.accountLines) && props.accountInfo) {
      props.getAccountLines(props.accountInfo.account_number);
    }
  }

  componentWillMount() {
    this.props.getMarketsInfo();
    if (!this.props.selectedMarket) {
      this.props.changeMarket('BTCTRY');
    }

    this.getAccountLines(true);
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

  getNetBalance = (account, isBaseCurrency) => {
    return formatMoney(
      account.balance - account.blocked_amount - account.waiting_order_amount,
      isBaseCurrency
        ? this.props.selectedMarket.base_currency_decimal
        : CURRENCY_DECIMALS[this.props.selectedMarket.counter_currency]
    );
  };

  toggleMarketPopover = () => {
    if (!this.state.marketMenuOpen) {
      socketHelper.subscribeToTickers();
    }
    this.setState({ marketMenuOpen: !this.state.marketMenuOpen });
  };

  toggleBalancePopover = () => {
    this.setState({ balanceMenuOpen: !this.state.balanceMenuOpen });
  };

  handleMarketMenuClose = () => {
    socketHelper.unsubscribeFromTickers();
    this.setState({ marketMenuOpen: false });
  };

  handleBalanceMenuClose = () => {
    this.setState({ balanceMenuOpen: false });
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
      this.handleMarketMenuClose();

      if (
        isUserLoggedIn() &&
        this.props.location.pathname !== '/' &&
        this.props.location.pathname !== '/advanced'
      ) {
        history.push(rootUrl);
      }
    } else {
      this.props.getMarketsInfo();
    }
  };

  render() {
    const { classes, className } = this.props;
    const tradeviewMode = this.props.location.pathname === '/advanced';

    return (
      <DocumentTitle
        title={
          this.props.ticker && this.props.selectedMarket
            ? `(${this.props.ticker.last_price} ${
                this.props.selectedMarket.counter_currency
              }) ${I18n.translate('site_title')}`
            : I18n.translate('site_title')
        }
      >
        <div
          className={className ? className : classes.marketBarContainerStyle}
          aria-hidden="false"
        >
          {this.props.ticker && this.props.markets ? (
            <div className={classes.marketBarStyle}>
              <div className={classes.marketInfoContainer}>
                <div
                  ref={node => {
                    this.setState({ marketMenuAnchor: findDOMNode(node) });
                  }}
                  className={classNames(classes.marketMenuPopoverBase, {
                    [classes.popoverBaseOpen]: this.state.marketMenuOpen
                  })}
                  onClick={this.toggleMarketPopover}
                >
                  <div className={classes.selectedMarketInfo}>
                    <div className={classes.valueRow}>
                      {`${this.props.selectedMarket.base_currency} / ${
                        this.props.selectedMarket.counter_currency
                      } `}
                    </div>
                    <div className={classes.descriptionRow}>
                      {I18n.translate('market_bar_market_selection')}
                    </div>
                  </div>
                  <DropdownIcon
                    className={classNames({
                      [classes.flip]: this.state.marketMenuOpen
                    })}
                  />
                </div>
                
                {/* Dropdown menu  */}

                <Popover
                  open={this.state.marketMenuOpen}
                  anchorEl={this.state.marketMenuAnchor}
                  anchorReference="anchorEl"
                  onClose={this.handleMarketMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  PaperProps={{
                    elevation: 0,
                    classes: { root: classes.popoverPaper }
                  }}
                  transitionDuration={150}
                >
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
                      : null}
                  </div>
                </Popover>
                <div className={classes.lastPriceContainer}>
                  <div className={classes.valueRow}>
                    {`${formatMoney(
                      this.props.ticker.last_price,
                      this.props.selectedMarket.counter_currency_decimal
                    )} ${this.props.selectedMarket.counter_currency}`}
                  </div>
                  <div className={classes.descriptionRow}>
                    {I18n.translate('market_bar_last_price')}
                  </div>
                </div>
                <div className={classes.volumeContainer}>
                  <div className={classes.valueRow}>
                    {`${formatMoney(
                      this.props.ticker.volume_24h,
                      this.props.selectedMarket.presentation_decimal
                    )} ${this.props.selectedMarket.base_currency}`}
                  </div>
                  <div className={classes.descriptionRow}>
                    {I18n.translate('market_bar_volume_24h')}
                  </div>
                </div>
                <div className={classes.changeContainer}>
                  <div
                    className={classNames(
                      classes.valueRow,
                      { [classes.up]: this.props.ticker.change_24h > 0 },
                      { [classes.down]: this.props.ticker.change_24h < 0 }
                    )}
                  >
                    {`${this.props.ticker.change_24h > 0 ? '+' : ''}${
                      this.props.ticker.change_24h
                    } %`}
                  </div>
                  <div className={classes.descriptionRow}>
                    {I18n.translate('market_bar_change_24h')}
                  </div>
                </div>
                {tradeviewMode && (
                  <div className={classes.highlowContainer}>
                    <div className={classes.balancePopoverBaseRow}>
                      <div className={classes.key}>
                        {I18n.translate('market_bar_high_24h')}
                      </div>
                      <div className={classes.highLowValue}>
                        {`${formatMoney(
                          this.props.ticker.high_24h,
                          this.props.selectedMarket.counter_currency_decimal
                        )} ${this.props.selectedMarket.counter_currency}`}
                      </div>
                    </div>
                    <div className={classes.balancePopoverBaseRow}>
                      <div className={classes.key}>
                        {I18n.translate('market_bar_low_24h')}
                      </div>
                      <div className={classes.highLowValue}>
                        {`${formatMoney(
                          this.props.ticker.low_24h,
                          this.props.selectedMarket.counter_currency_decimal
                        )} ${this.props.selectedMarket.counter_currency}`}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {this.props.accountLines ? (
                <div className={classes.balanceAreaContainer}>
                  <div
                    ref={node => {
                      this.setState({ balanceMenuAnchor: findDOMNode(node) });
                    }}
                    className={classNames(classes.balanceMenuPopoverBase, {
                      [classes.popoverBaseOpen]: this.state.balanceMenuOpen
                    })}
                    onClick={this.toggleBalancePopover}
                  >
                    <div className={classes.marketBalanceInfo}>
                      <div className={classes.balancePopoverBaseRow}>
                        <div className={classes.key}>
                          {I18n.translate(
                            'market_bar_gross_balance',
                            this.props.selectedMarket.base_currency
                          )}
                        </div>
                        <div
                          className={classNames(
                            classes.value,
                            {
                              [classes.red]:
                                this.state.baseBalanceColor === 'red'
                            },
                            {
                              [classes.green]:
                                this.state.baseBalanceColor === 'green'
                            }
                          )}
                        >
                          {`${formatMoney(
                            this.getBaseAccount().balance,
                            this.props.selectedMarket.base_currency_decimal
                          )} ${this.getBaseAccount().currency}`}
                        </div>
                      </div>
                      <div className={classes.balancePopoverBaseRow}>
                        <div className={classes.key}>
                          {I18n.translate(
                            'market_bar_gross_balance',
                            this.props.selectedMarket.counter_currency
                          )}
                        </div>
                        <div
                          className={classNames(
                            classes.value,
                            {
                              [classes.red]:
                                this.state.counterBalanceColor === 'red'
                            },
                            {
                              [classes.green]:
                                this.state.counterBalanceColor === 'green'
                            }
                          )}
                        >
                          {`${formatMoney(
                            this.getCounterAccount().balance,
                            CURRENCY_DECIMALS[
                              this.props.selectedMarket.counter_currency
                            ]
                          )} ${this.getCounterAccount().currency}`}
                        </div>
                      </div>
                    </div>
                    <DropdownIcon
                      className={classNames({
                        [classes.flip]: this.state.balanceMenuOpen
                      })}
                    />
                  </div>
                  <Popover
                    open={this.state.balanceMenuOpen}
                    anchorEl={this.state.balanceMenuAnchor}
                    anchorReference="anchorEl"
                    onClose={this.handleBalanceMenuClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    PaperProps={{
                      elevation: 1,
                      classes: { root: classes.balanceMenuPaper }
                    }}
                    transitionDuration={150}
                  >
                    <div className={classes.balanceMenuPopoverStyle}>
                      <div className={classes.balanceMenuContent}>
                        <div className={classes.keyValueRow}>
                          <div className={classes.key}>
                            {I18n.translate('market_bar_sell_orders')}
                          </div>
                          <div className={classes.value}>
                            {`${formatMoney(
                              this.getBaseAccount().waiting_order_amount,
                              this.props.selectedMarket.base_currency_decimal
                            )} ${this.getBaseAccount().currency}`}
                          </div>
                        </div>
                        <div className={classes.keyValueRow}>
                          <div className={classes.key}>
                            {I18n.translate(
                              'market_bar_available',
                              this.props.selectedMarket.base_currency
                            )}
                          </div>
                          <div className={classes.value}>
                            {`${this.getNetBalance(
                              this.getBaseAccount(),
                              true
                            )} ${this.getBaseAccount().currency}`}
                          </div>
                        </div>
                        <div className={classes.keyValueRow}>
                          <div className={classes.key}>
                            {I18n.translate('market_bar_buy_orders')}
                          </div>
                          <div className={classes.value}>
                            {`${formatMoney(
                              this.getCounterAccount().waiting_order_amount,
                              CURRENCY_DECIMALS[
                                this.props.selectedMarket.counter_currency
                              ]
                            )} ${this.getCounterAccount().currency}`}
                          </div>
                        </div>
                        <div className={classes.keyValueRow}>
                          <div className={classes.key}>
                            {I18n.translate(
                              'market_bar_available',
                              this.props.selectedMarket.counter_currency
                            )}
                          </div>
                          <div className={classes.value}>
                            {`${this.getNetBalance(
                              this.getCounterAccount(),
                              false
                            )} ${this.getCounterAccount().currency}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Popover>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </DocumentTitle>
    );
  }
}

//export default withStyles(styles)(asyncPoll(30 * 1000, onPollInterval)(MarketBar));
export default withStyles(styles)(MarketBar);

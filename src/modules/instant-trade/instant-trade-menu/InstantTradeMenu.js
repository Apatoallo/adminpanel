import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';
import classNames from 'classnames';

import history from '../../../common/history';
import StyledPaper from '../../../components/common/StyledPaper';
import I18n from '../../../common/i18n/I18n';
import socketHelper from '../../../api/socketHelper';
import CoinIcon from '../../../components/coin-icon/CoinIcon';
import { Arrow } from '../../../components/icons/Icons';

import withMediaQuery from '../../../common/utils/withMediaQuery';

import MaterialTable from '../../../components/material-table/MaterialTable';
import { roundToFixedDigits } from '../../../common/utils/numberUtil';

import pageVisibilityApi from '../../../common/utils/pageVisibilityApi';
import { INSTANT_TRADE_CONSTANTS } from '../../../common/constants';
const { hidden, visibilityChange } = pageVisibilityApi();

const styles = theme => ({
  container: {
    marginTop: theme.unit.margin,
    width: '100%'
  },
  toolbarContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    '@media screen and (max-width: 800px)': {
      flexDirection: 'column-reverse',
      justifyContent: 'initial'
    }
  },
  link: {
    color: theme.colors.textColor.blue,
    fontWeight: '500'
  },
  avatarIcon: {
    fill: theme.colors.background.avatarIcon
  },
  tabContainerAndDivider: {
    display: 'flex',
    flexDirection: 'column'
  },
  tabContainer: {
    minHeight: '48px'
  },
  tabIndicator: {
    backgroundColor: theme.colors.textColor.blue
  },
  tab: {
    minWidth: '90px',
    fontFamily: 'Roboto',
    fontWeight: '400',
    height: '48px',
    minHeight: '40px',
    color: theme.colors.textColor.inactiveTab
  },
  tabSelected: {
    color: theme.colors.textColor.activeTab,
    fontWeight: '500'
  },
  dividerStyle: {
    height: '2px',
    marginTop: '-2px',
    backgroundColor: theme.colors.background.divider,
    marginBottom: '24px',
    '@media screen and (max-width: 800px)': {
      display: 'none'
    }
  },
  dividerStyleMobile: {
    height: '2px',
    marginTop: '-2px',
    backgroundColor: theme.colors.background.divider,
    '@media screen and (min-width: 801px)': {
      display: 'none'
    }
  },
  tickerRow: {
    display: 'table-row',
    width: '100%',
    borderBottom: theme.colors.borderColor.rowSeperatorBorder,
    marginBottom: '4px'
  },
  buttonInner: {
    display: 'flex',
    flexDirection: 'column'
  },
  currencyCellContainer: {
    display: 'table-cell',
    color: theme.colors.textColor.tableHeader
  },
  currencyCell: {
    display: 'flex',
    flexDirection: 'row'
  },
  buttonsContainer: {
    verticalAlign: 'middle'
  },
  button: {
    minWidth: '48px',
    padding: '2px',
    margin: '2px 6px'
  },
  buttonMobile: {
    minWidth: '32px',
    padding: '2px',
    margin: '2px'
  },
  buttonLabelMobile: {
    fontSize: '12px'
  },
  proButtonMobile: {
    height: '14px',
    minWidth: '32px',
    padding: '0',
    margin: '2px 2px 2px 4px',
    lineHeight: '12px'
  },
  proButtonOutlined: {
    color: theme.colors.textColor.spreadValue,
    border: theme.colors.borderColor.buttonBorder
  },
  proButtonRoot: {
    '&:hover': {
      backgroundColor: theme.colors.background.inactiveOrderDirection
    }
  },
  tickersContainer: {
    display: 'table',
    padding: '4px',
    width: '100%',
    boxSizing: 'border-box',
    borderCollapse: 'separate',
    borderSpacing: '8px'
  },
  priceContainer: {
    display: 'table-cell',
    textAlign: 'right',
    color: theme.colors.textColor.input,
    fontSize: '14px',
    whiteSpace: 'nowrap'
  },
  priceArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  priceArea9thDigit: {
    color: 'rgba(48, 66, 98, 0.54)',
    fontSize: '10px',
    fontWeight: '500',
    '@media screen and (max-width: 600px)': {
      fontSize: '10px'
    }
  },
  priceChange: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: '14px',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  priceChangeMobile: {
    marginTop: '4px',
    fontSize: '12px',
    '@media screen and (min-width: 421px)': {
      fontSize: '13px'
    }
  },
  priceChangeUp: {
    color: theme.colors.textColor.green
  },
  priceChangeDown: {
    color: theme.colors.textColor.red
  },
  priceAndChangeContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    fontSize: '12px',
    '@media screen and (min-width: 421px)': {
      fontSize: '13px'
    }
  },
  coinIconContainer: {
    width: '22px',
    marginRight: '4px'
  },
  coinIcon: {
    height: '24px'
  },
  coinIconMobile: {
    height: '28px'
  },
  currencyCodeCell: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  currencyCode: {
    marginLeft: '6px',
    '@media screen and (min-width: 421px)': {
      marginLeft: '12px'
    }
  },
  currencyCodeAndName: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  currencyCodeAndProButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  currencyName: {
    fontWeight: '500',
    fontSize: '11px',
    margin: '2px 0 0 6px',
    whiteSpace: 'pre',
    '@media screen and (min-width: 421px)': {
      fontSize: '12px',
      margin: '2px 0 0 12px'
    }
  },
  mTableToolbar: {
    minHeight: '48px'
  },
  addressLabelUnderline: {
    '&:before': {
      borderBottomColor: 'rgba(0, 0, 0, 0.12)'
    },
    '&:after': {
      borderBottomColor: theme.colors.textColor.blue
    },
    '&:hover': {
      '&:not(.Mui-disabled)': {
        '&:before': {
          borderBottom: `${
            theme.colors.borderColor.rowSeperatorBorder
          } !important`
        }
      }
    }
  },
  address: {
    color: theme.colors.textColor.input,
    backgroundColor: theme.colors.background.searchBarHover,
    borderRadius: '8px',
    transition: theme.transitions.create('width'),
    width: '180px',
    '&:hover:not($focused):not($error) $notchedOutline': {
      border: 'none'
    },
    '&$focused': {
      border: 'none',
      width: '240px'
    }
  },
  addressLabel: {
    color: theme.colors.textColor.inputLabel,
    '&$cssFocused': {
      color: theme.colors.textColor.blue
    }
  },
  cssFocused: {},
  textFieldWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '2px',
    marginRight: '12px',
    '@media screen and (max-width: 800px)': {
      margin: '12px',
      justifyContent: 'flex-end'
    }
  },
  clearIcon: {
    color: theme.colors.textColor.input
  },
  notchedOutline: {
    border: 'none'
  },
  searchBarInput: {
    padding: '8px'
  },
  focused: {},
  tooltip: {
    fontSize: '13px'
  }
});

class InstantTradeMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  }

  componentDidMount() {
    const oldGroup = this.props.preferences.selectedTickerGroup;
    const page = this.props.location.pathname;
    let currencyParam = oldGroup.currency_code;
    if (page.split('/').length > 3) {
      currencyParam = page.split('/')[3];
    } else {
      history.push(`/instant/market/${currencyParam}`);
    }

    const tickerGroup = this.props.tickerGroups.filter(
      item => item.currency_code === currencyParam
    );

    if (tickerGroup && tickerGroup.length > 0) {
      this.props.changePreferences('selectedTickerGroup', tickerGroup[0]);
    }

    socketHelper.subscribeToGroupedTickers(
      this.props.preferences.selectedTickerGroup.currency_code
    );

    this.props.getCurrencyList();

    document.addEventListener(
      visibilityChange,
      this.handleVisibilityChange,
      false
    );

    if (!this.props.markets) {
      this.props.getMarketsInfo();
    }
  }

  componentWillUnmount() {
    socketHelper.unsubscribeFromGroupedTickers(
      this.props.preferences.selectedTickerGroup.currency_code
    );
    document.removeEventListener(visibilityChange, this.handleVisibilityChange);
  }

  handleVisibilityChange = () => {
    if (document[hidden]) {
      socketHelper.unsubscribeFromGroupedTickers(
        this.props.preferences.selectedTickerGroup.currency_code
      );
    } else {
      socketHelper.subscribeToGroupedTickers(
        this.props.preferences.selectedTickerGroup.currency_code
      );
    }
  };

  handleTickerGroupChange = (evt, value) => {
    const oldGroup = this.props.preferences.selectedTickerGroup;
    socketHelper.unsubscribeFromGroupedTickers(oldGroup.currency_code);

    const tickerGroup = this.props.tickerGroups.filter(
      item => item.currency_code === value
    );
    if (tickerGroup && tickerGroup.length > 0) {
      this.props.changePreferences('selectedTickerGroup', tickerGroup[0]);
      history.push(`/instant/market/${value}`);
      socketHelper.subscribeToGroupedTickers(value);
    }
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

  handleButtonClick = (direction, base_currency) => {
    const firstCoinCode =
      direction === 'B'
        ? this.props.preferences.selectedTickerGroup.currency_code
        : base_currency.currency_code;
    const secondCoinCode =
      direction === 'B'
        ? base_currency.currency_code
        : this.props.preferences.selectedTickerGroup.currency_code;

    const firstCoin = this.getCurrencyFromList(firstCoinCode);
    const secondCoin = this.getCurrencyFromList(secondCoinCode);

    if (firstCoin && secondCoin) {
      this.props.changePreferences('instantTradeFirstCoin', firstCoin);
      this.props.changePreferences('instantTradeSecondCoin', secondCoin);
      socketHelper.unsubscribeFromGroupedTickers(
        this.props.preferences.selectedTickerGroup.currency_code
      );
      document.removeEventListener(
        visibilityChange,
        this.handleVisibilityChange
      );
      history.push(
        `/instant/trade/${firstCoin.currency_code}_${secondCoin.currency_code}`
      );
    } else {
      this.props.showDialog({
        title: I18n.translate('general_error'),
        text: I18n.translate('general_error_description'),
        okButtonText: I18n.translate('general_ok')
      });
    }
  };

  handleSearchTextChange = (event, value) => {
    this.setState({ searchText: event ? event.target.value : value });
  };

  getTableData = () => {
    const { preferences, groupedTickers, markets } = this.props;
    const { selectedTickerGroup } = preferences;
    const { searchText } = this.state;

    const filteredItems =
      markets &&
      groupedTickers &&
      selectedTickerGroup &&
      groupedTickers[selectedTickerGroup.currency_code]
        ? Object.values(groupedTickers[selectedTickerGroup.currency_code])
            .filter(
              item =>
                item.currency_code
                  .toLowerCase()
                  .indexOf(searchText.toLowerCase()) >= 0 ||
                item.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
            )
            .map(item => {
              const market_code = `${item.currency_code}${
                selectedTickerGroup.currency_code
              }`;
              if (
                markets.filter(market => market.market_code === market_code)
                  .length > 0
              ) {
                return { ...item, market_code };
              }
              return item;
            })
        : [];

    filteredItems.sort(this.compare);
    return filteredItems;
  };

  compare = (a, b) => {
    if (a.precedence < b.precedence) {
      return -1;
    }
    if (a.precedence > b.precedence) {
      return 1;
    }
    if (a.currency_code > b.currency_code) {
      return 1;
    }
    if (a.currency_code < b.currency_code) {
      return -1;
    }
    return 0;
  };

  goToMarket = market_code => {
    socketHelper.unsubscribeFromGroupedTickers(
      this.props.preferences.selectedTickerGroup.currency_code
    );
    document.removeEventListener(visibilityChange, this.handleVisibilityChange);
    this.props.changeMarket(market_code);
    history.push('/market');
  };

  getColumns = isMobile => {
    const { classes } = this.props;
    let columns = [];
    if (isMobile) {
      columns = [
        {
          field: 'currency_code',
          title: I18n.translate('general_currency_code'),
          render: rowData => (
            <div className={classes.currencyCodeCell}>
              <CoinIcon
                color="color"
                currency={rowData.currency_code}
                classes={{
                  image: classes.coinIconMobile
                }}
              />
              <div className={classes.currencyCodeAndName}>
                <div className={classes.currencyCodeAndProButton}>
                  <div className={classes.currencyCode}>
                    {rowData.currency_code}
                  </div>
                  {rowData.market_code && (
                    <Button
                      className={classNames(classes.proButtonMobile)}
                      classes={{
                        label: classes.buttonLabelMobile,
                        outlined: classes.proButtonOutlined,
                        root: classes.proButtonRoot
                      }}
                      variant="outlined"
                      onClick={() => this.goToMarket(rowData.market_code)}
                    >
                      <div className={classes.buttonInner}>PRO</div>
                    </Button>
                  )}
                </div>
                <div className={classes.currencyName}>
                  {rowData.currency_name}
                </div>
              </div>
            </div>
          )
        },
        {
          field: 'price',
          title: I18n.translate('market_bar_last_price'),
          type: 'numeric',
          render: rowData => {
            let price = roundToFixedDigits(
              rowData.price,
              INSTANT_TRADE_CONSTANTS.ROUND_PRICE_DIGITS
            );
            return (
              <div className={classes.priceAndChangeContainer}>
                <div className={classes.priceArea}>
                  <div
                    className={classNames(
                      classes.priceCell,
                      {
                        [classes.priceChangeUp]: rowData.price_change > 0
                      },
                      {
                        [classes.priceChangeDown]: rowData.price_change < 0
                      }
                    )}
                  >
                    {price.substring(0, price.length > 10 ? 10 : price.length)}
                    <span className={classes.priceArea9thDigit}>
                      {price.length > 10 ? price.substring(10) : ''}
                    </span>
                  </div>
                  <div
                    className={classNames(
                      classes.priceCell,
                      {
                        [classes.priceChangeUp]: rowData.price_change > 0
                      },
                      {
                        [classes.priceChangeDown]: rowData.price_change < 0
                      }
                    )}
                    style={{ marginLeft: '5px' }}
                  >
                    {rowData.counter_code}
                  </div>
                </div>
                <div
                  className={classNames(
                    classes.priceChange,
                    classes.priceChangeMobile,
                    {
                      [classes.priceChangeUp]: rowData.change_24h > 0
                    },
                    {
                      [classes.priceChangeDown]: rowData.change_24h < 0
                    }
                  )}
                >
                  {Math.abs(rowData.change_24h).toFixed(2) !== '0.00' && (
                    <Arrow
                      rotate={rowData.change_24h > 0 ? 45 : -135}
                      translate={rowData.change_24h > 0 ? '5 -5' : '-12 -8'}
                      fillColor={rowData.change_24h > 0 ? '#3ad09f' : '#f87979'}
                    />
                  )}
                  {`${Math.abs(rowData.change_24h).toFixed(2)}%`}
                </div>
              </div>
            );
          }
        },
        {
          field: 'buttons',
          title: '',
          type: 'numeric',
          sorting: false,
          render: rowData => (
            <div className={classes.buttonsContainer}>
              <Button
                className={classes.buttonMobile}
                classes={{ label: classes.buttonLabelMobile }}
                variant="outlined"
                color="primary"
                onClick={() => this.handleButtonClick('B', rowData.ticker)}
              >
                AL
              </Button>
              <Button
                className={classes.buttonMobile}
                classes={{ label: classes.buttonLabelMobile }}
                variant="outlined"
                color="secondary"
                onClick={() => this.handleButtonClick('S', rowData.ticker)}
              >
                <div className={classes.buttonInner}>SAT</div>
              </Button>
            </div>
          )
        }
      ];
    } else {
      columns = [
        {
          field: 'currency_code',
          title: I18n.translate('general_currency_code'),
          render: rowData => (
            <div className={classes.currencyCodeCell}>
              <CoinIcon
                color="color"
                currency={rowData.currency_code}
                classes={{
                  image: classes.coinIcon
                }}
              />
              <div className={classes.currencyCode}>
                {rowData.currency_code}
              </div>
            </div>
          )
        },
        {
          field: 'currency_name',
          title: I18n.translate('general_currency_description')
        },
        {
          field: 'price',
          title: I18n.translate('market_bar_last_price'),
          type: 'numeric',
          render: rowData => {
            let price = roundToFixedDigits(
              rowData.price,
              INSTANT_TRADE_CONSTANTS.ROUND_PRICE_DIGITS
            );
            return (
              <div className={classes.priceArea}>
                <div
                  className={classNames(
                    classes.priceCell,
                    {
                      [classes.priceChangeUp]: rowData.price_change > 0
                    },
                    {
                      [classes.priceChangeDown]: rowData.price_change < 0
                    }
                  )}
                >
                  {price.substring(0, price.length > 10 ? 10 : price.length)}
                  <span className={classes.priceArea9thDigit}>
                    {price.length > 10 ? price.substring(10) : ''}
                  </span>
                </div>
                <div
                  className={classNames(
                    classes.priceCell,
                    {
                      [classes.priceChangeUp]: rowData.price_change > 0
                    },
                    {
                      [classes.priceChangeDown]: rowData.price_change < 0
                    }
                  )}
                  style={{ marginLeft: price.length > 10 ? '0px' : '6px' }}
                >
                  {rowData.counter_code}
                </div>
              </div>
            );
          }
        },
        {
          field: 'change_24h',
          title: I18n.translate('market_bar_change_24h'),
          type: 'numeric',
          render: rowData => (
            <div
              className={classNames(
                classes.priceChange,
                {
                  [classes.priceChangeUp]: rowData.change_24h > 0
                },
                {
                  [classes.priceChangeDown]: rowData.change_24h < 0
                }
              )}
            >
              {Math.abs(rowData.change_24h).toFixed(2) !== '0.00' && (
                <Arrow
                  rotate={rowData.change_24h > 0 ? 45 : -135}
                  translate={rowData.change_24h > 0 ? '5 -5' : '-12 -8'}
                  fillColor={rowData.change_24h > 0 ? '#3ad09f' : '#f87979'}
                />
              )}
              {`${Math.abs(rowData.change_24h).toFixed(2)}%`}
            </div>
          )
        },
        {
          field: 'buttons',
          title: '',
          type: 'numeric',
          sorting: false,
          render: rowData => (
            <div className={classes.buttonsContainer}>
              {rowData.market_code && (
                <Tooltip
                  classes={{ tooltip: classes.tooltip }}
                  title={I18n.translate(
                    'instant_trade_pro_tooltip',
                    rowData.market_code
                  )}
                >
                  <Button
                    className={classes.button}
                    variant="outlined"
                    classes={{
                      outlined: classes.proButtonOutlined,
                      root: classes.proButtonRoot
                    }}
                    onClick={() => this.goToMarket(rowData.market_code)}
                  >
                    <div className={classes.buttonInner}>
                      {I18n.translate('instant_trade_menu_pro_button')}
                    </div>
                  </Button>
                </Tooltip>
              )}
              <Button
                className={classes.button}
                variant="outlined"
                color="primary"
                onClick={() => this.handleButtonClick('B', rowData.ticker)}
              >
                {I18n.translate('instant_trade_menu_buy_button')}
              </Button>
              <Button
                className={classes.button}
                variant="outlined"
                color="secondary"
                onClick={() => this.handleButtonClick('S', rowData.ticker)}
              >
                <div className={classes.buttonInner}>
                  {I18n.translate('instant_trade_menu_sell_button')}
                </div>
              </Button>
            </div>
          )
        }
      ];
    }
    return columns;
  };

  render() {
    const {
      classes,
      tickerGroups,
      preferences,
      currencyList,
      mediaQueryMatches
    } = this.props;
    const { selectedTickerGroup } = preferences;

    const tableData = this.getTableData();
    const columns = this.getColumns(mediaQueryMatches);

    return (
      <StyledPaper className={classes.container}>
        <div className={classes.toolbarContainer}>
          <div className={classes.toolbar}>
            <div className={classes.textFieldWrapper}>
              <TextField
                id="tokenSearch"
                className={classes.textField}
                value={this.state.searchText}
                onChange={this.handleSearchTextChange}
                placeholder={I18n.translate('general_search')}
                InputProps={{
                  classes: {
                    root: classes.address,
                    input: classes.searchBarInput,
                    notchedOutline: classes.notchedOutline,
                    focused: classes.focused
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search className={classes.searchIcon} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        classes={{ root: classes.clearIcon }}
                        size="small"
                        onClick={e => {
                          e.preventDefault();
                          this.handleSearchTextChange(null, '');
                        }}
                      >
                        <Clear />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                InputLabelProps={{
                  classes: {
                    focused: classes.cssFocused,
                    root: classes.addressLabel
                  }
                }}
                variant="outlined"
              />
            </div>
            <div className={classes.tabContainerAndDivider}>
              <Tabs
                classes={{
                  root: classes.tabContainer,
                  indicator: classes.tabIndicator
                }}
                value={selectedTickerGroup.currency_code}
                onChange={this.handleTickerGroupChange}
                variant="fullWidth"
              >
                {tickerGroups.map(tickerGroup => (
                  <Tab
                    classes={{
                      root: classes.tab,
                      selected: classes.tabSelected
                    }}
                    key={tickerGroup.currency_code}
                    value={tickerGroup.currency_code}
                    label={tickerGroup.currency_code}
                  />
                ))}
              </Tabs>
              <Divider className={classes.dividerStyleMobile} />
            </div>
          </div>
          <Divider className={classes.dividerStyle} />
        </div>
        <div className={classes.tableContainer}>
          <MaterialTable
            options={{
              paging: false,
              toolbar: false,
              padding: mediaQueryMatches ? 'dense' : 'default'
            }}
            classes={{
              root: classes.table
            }}
            localization={{
              toolbar: {
                searchPlaceholder: I18n.translate('general_search'),
                searchTooltip: I18n.translate('general_search')
              },
              body: {
                emptyDataSourceMessage: I18n.translate(
                  'general_no_records_to_display'
                )
              }
            }}
            columns={
              currencyList.all.length > 0 || currencyList.popular.length > 0
                ? columns
                : []
            }
            data={tableData.map(ticker => ({
              currency_code: ticker.currency_code,
              currency_name: ticker.name,
              counter_code: selectedTickerGroup.currency_code,
              price: ticker.ask,
              change_24h: ticker.change_24h,
              price_change: ticker.price_change,
              ticker: ticker,
              market_code: ticker.market_code
            }))}
          />
        </div>
      </StyledPaper>
    );
  }
}

InstantTradeMenu.defaultProps = {
  tickerGroups: [
    {
      currency_code: 'TRY',
      name: 'Türk Lirası',
      precedence: 0
    },
    {
      currency_code: 'BTC',
      name: 'Bitcoin',
      precedence: 10
    },
    {
      currency_code: 'ETH',
      name: 'Ethereum',
      precedence: 20
    },
    {
      currency_code: 'USDT',
      name: 'Tether',
      precedence: 5
    },
    {
      currency_code: 'BUSD',
      name: 'Binance USD',
      precedence: 6
    }
  ]
};

export default withStyles(styles)(
  withMediaQuery('(max-width:800px)')(InstantTradeMenu)
);

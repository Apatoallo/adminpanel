import React from 'react';
import { Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import StyledPaper from '../../../../components/common/StyledPaper';
import ContrastTable from '../../../../components/common/ContrastTable';
import { formatMoney } from '../../../../common/utils/numberUtil';
import MarketHistoryContainer from './../market-history/MarketHistoryContainer';
import I18n from '../../../../common/i18n/I18n';
import { ORDER_DIRECTIONS } from '../../tradeConstants';

const styles = theme => ({
  pageStyle: {
    display: 'flex',
    flexDirection: 'column'
  },
  orderBookStyle: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.unit.margin,
    width: '100%',
    '@media screen and (max-width: 600px)': {
      flexDirection: 'column',
      height: 'auto'
    }
  },
  orderBookVerticalStyle: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.unit.margin,
    minWidth: '400px'
  },
  awaitingBuyOrders: {
    width: `50%`,
    height: '100%',
    '@media screen and (max-width: 600px)': {
      width: '100%'
    }
  },
  awaitingSellOrders: {
    width: `50%`,
    height: '100%',
    marginLeft: theme.unit.margin,
    '@media screen and (max-width: 600px)': {
      width: '100%',
      margin: `${theme.unit.margin} 0`
    }
  },
  awaitingBuyOrdersVertical: {
    minWidth: '400px',
    maxWidth: '400px',
    height: 'auto',
    '@media screen and (max-width: 600px)': {
      minWidth: 'auto'
    }
  },
  awaitingSellOrdersVertical: {
    minWidth: '400px',
    height: 'auto',
    '@media screen and (max-width: 600px)': {
      minWidth: 'auto'
    }
  },
  orderBookContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box'
  },
  lastTransactionsVertical: {
    marginTop: theme.unit.margin,
    marginLeft: theme.unit.margin,
    width: '100%'
  },
  spreadValue: {
    fontSize: '14px',
    fontWeight: '500',
    color: theme.colors.textColor.spreadValue
  },
  tableHeaderStyle: {
    whiteSpace: 'pre'
  },
  orderBookTableStyle: {
    tableLayout: 'fixed'
  },
  tabIndicator: {
    backgroundColor: theme.colors.textColor.blue
  }
});

class MarketContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      historyType: this.isVertical() ? 'userHistory' : 'marketHistory'
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.sliceSize !== nextProps.sliceSize) {
      return true;
    }
    if (
      nextProps.selectedMarket.market_code !==
        this.props.selectedMarket.market_code ||
      nextProps.currentTradeViewStyle !== this.props.currentTradeViewStyle ||
      nextProps.theme !== this.props.theme
    ) {
      return true;
    }
    if (
      JSON.stringify(this.props.buyers) !== JSON.stringify(nextProps.buyers)
    ) {
      return true;
    }
    if (
      JSON.stringify(this.props.sellers) !== JSON.stringify(nextProps.sellers)
    ) {
      return true;
    }
    if (nextProps.openOrders) {
      if (this.props.openOrders) {
        if (this.props.openOrders.length !== nextProps.openOrders.length) {
          for (let i = 0; i < nextProps.openOrders.length; i++) {
            if (nextProps.openOrders[i].auto_dismiss === true) {
              return false;
            }
          }
          return true;
        } else {
          for (let i = 0; i < this.props.openOrders.length; i++) {
            if (
              this.props.openOrders[i].order_number !==
              nextProps.openOrders[i].order_number
            ) {
              return true;
            }
          }
        }
      } else {
        return true;
      }
    }
    return false;
  }

  buyersMap = [];
  sellersMap = [];

  getSliceSize = () => this.props.sliceSize || 12;

  getBuyersData = () => {
    if (this.props.buyers) {
      let buyers = [...this.props.buyers.slice(0, this.getSliceSize())];
      const buyersMap = buyers.map((item, index) => {
        let oldAmount = 0;
        if (this.buyersMap.length > 0) {
          const oldValue = this.buyersMap.filter(
            b => b.orders_price === item.orders_price
          );
          if (oldValue.length > 0) {
            oldAmount = oldValue[0].orders_total_amount;
          }
        }
        return {
          key: `${ORDER_DIRECTIONS.BUY}|${item.orders_price}|${
            item.orders_total_amount
          }|${index}`,
          incrementHighlight:
            parseFloat(item.orders_total_amount) > parseFloat(oldAmount),
          decrementHighlight:
            parseFloat(item.orders_total_amount) < parseFloat(oldAmount),
          values: [
            {
              value: formatMoney(
                item.orders_price * item.orders_total_amount,
                this.props.selectedMarket.counter_currency_decimal
              ),
              rawValue: item.orders_price * item.orders_total_amount,
              style: { opacity: '0.7' },
              numeric: true
            },
            {
              value: item.orders_total_amount,
              darkenTrailingZeros: true,
              numeric: true
            },
            {
              value: item.orders_price,
              style: { color: '#3ad09f', fontWeight: '500' },
              preItem: this.checkOrderOwnership(item, 'B'),
              numeric: true
            }
          ]
        };
      }, this);
      this.buyersMap = buyers;
      return buyersMap;
    } else {
      return [];
    }
  };

  getBuyersHeader = market => [
    `${I18n.translate('general_value')} (${market.counter_currency})`,
    `${I18n.translate('general_amount')} (${market.base_currency})`,
    `${I18n.translate('general_price')} (${market.counter_currency})`
  ];

  getSellersHeader = market => [
    `${I18n.translate('general_price')} (${market.counter_currency})`,
    `${I18n.translate('general_amount')} (${market.base_currency})`,
    `${I18n.translate('general_value')} (${market.counter_currency})`
  ];

  checkOrderOwnership = (order, buyOrSell) => {
    if (this.props.openOrders) {
      let ordersAmount = 0;
      const filtered = this.props.openOrders.filter(openOrder => {
        if (
          openOrder.price === order.orders_price &&
          openOrder.buy_sell === buyOrSell &&
          openOrder.market_code === this.props.selectedMarket.market_code
        ) {
          ordersAmount = openOrder.volume;
          return true;
        } else {
          return false;
        }
      });
      return filtered.length > 0 ? (
        <Tooltip
          title={I18n.translate(
            'orderbook_order_indicator_tooltip',
            order.orders_price,
            ordersAmount
          )}
        >
          <span>●&nbsp;</span>
        </Tooltip>
      ) : (
        ''
      );
    } else {
      return '';
    }
  };

  getSellersData = () => {
    if (this.props.sellers) {
      let sellers = [...this.props.sellers.slice(0, this.getSliceSize())];
      if (this.isVertical()) {
        sellers.reverse();
      }
      const sellersMap = sellers.map((item, index) => {
        let oldAmount = 0;
        if (this.sellersMap.length > 0) {
          const oldValue = this.sellersMap.filter(
            b => b.orders_price === item.orders_price
          );
          if (oldValue.length > 0) {
            oldAmount = oldValue[0].orders_total_amount;
          }
        }
        return {
          key: `${ORDER_DIRECTIONS.SELL}|${item.orders_price}|${
            item.orders_total_amount
          }|${index}`,
          incrementHighlight:
            parseFloat(item.orders_total_amount) > parseFloat(oldAmount),
          decrementHighlight:
            parseFloat(item.orders_total_amount) < parseFloat(oldAmount),
          values: !this.isVertical()
            ? [
                {
                  value: item.orders_price,
                  style: { color: '#f87979', fontWeight: '500' },
                  numeric: true,
                  preItem: this.checkOrderOwnership(item, 'S')
                },
                {
                  value: item.orders_total_amount,
                  darkenTrailingZeros: true,
                  numeric: true
                },
                {
                  value: formatMoney(
                    item.orders_price * item.orders_total_amount,
                    this.props.selectedMarket.counter_currency_decimal
                  ),
                  rawValue: item.orders_price * item.orders_total_amount,
                  style: { opacity: '0.7' },
                  numeric: true
                }
              ]
            : [
                {
                  value: formatMoney(
                    item.orders_price * item.orders_total_amount,
                    this.props.selectedMarket.counter_currency_decimal
                  ),
                  rawValue: item.orders_price * item.orders_total_amount,
                  style: { opacity: '0.7' },
                  numeric: true
                },
                {
                  value: item.orders_total_amount,
                  darkenTrailingZeros: true,
                  numeric: true
                },
                {
                  value: item.orders_price,
                  style: { color: '#f87979', fontWeight: '500' },
                  numeric: true,
                  preItem: this.checkOrderOwnership(item, 'S')
                }
              ]
        };
      }, this);
      this.sellersMap = sellers;
      return sellersMap;
    } else {
      return [];
    }
  };

  isVertical = () => {
    return this.props.tradeViewStyle
      ? this.props.tradeViewStyle === 'vertical'
      : this.props.currentTradeViewStyle === 'vertical';
  };

  getSpread = () => {
    if (
      this.props.buyers &&
      this.props.sellers &&
      this.props.buyers.length > 0 &&
      this.props.sellers.length > 0
    ) {
      return [
        {
          key: 'spread',
          values: [
            {
              value: I18n.translate(
                'trade_spread',
                this.props.selectedMarket.counter_currency
              ),
              style: {
                color: this.props.theme.colors.textColor.spreadText,
                fontWeight: '400',
                fontSize: '12px'
              }
            },
            { value: '' },
            {
              value: formatMoney(
                this.props.sellers[0].orders_price -
                  this.props.buyers[0].orders_price,
                this.props.selectedMarket.counter_currency_decimal
              ),
              style: {
                color: this.props.theme.colors.textColor.spreadValue,
                fontWeight: '500',
                fontSize: '14px'
              }
            }
          ],
          style: {
            backgroundColor: this.props.theme.colors.background.contrastRow,
            borderTop: this.props.theme.colors.borderColor.dashedBorder,
            borderBottom: this.props.theme.colors.borderColor.dashedBorder
          }
        }
      ];
    } else {
      return [];
    }
  };

  sendOrderInformation = (row, orders) => {
    const split = row.key.split('|');
    if (split.length >= 4) {
      let index = parseInt(split[3], 10);
      if (this.isVertical()) {
        const sliceSize = this.getSliceSize();
        const minLength =
          this.props.sellers.length > sliceSize
            ? sliceSize
            : this.props.sellers.length;
        if (split[0] === ORDER_DIRECTIONS.BUY) {
          orders = orders.slice(minLength + 1);
        } else {
          orders = orders.slice(0, minLength);
          orders.reverse();
          index = minLength - 1 - index;
        }
      }

      const calculatedOrders = orders.slice(0, index + 1).reduce(
        (total, order) => {
          const totalAmountIndex =
            split[0] === ORDER_DIRECTIONS.BUY ? 0 : this.isVertical() ? 0 : 2;
          total['volume'] = total['volume'] + parseFloat(order.values[1].value);
          total['amount'] =
            total['amount'] +
            parseFloat(order.values[totalAmountIndex].rawValue);
          return total;
        },
        { volume: 0, amount: 0 }
      );
      const data = {
        orderDirection:
          split[0] === ORDER_DIRECTIONS.BUY
            ? ORDER_DIRECTIONS.SELL
            : ORDER_DIRECTIONS.BUY,
        price: split[1],
        volume: calculatedOrders['volume'].toFixed(8),
        totalAmount: formatMoney(
          calculatedOrders['amount'],
          this.props.selectedMarket.counter_currency_decimal
        )
      };

      this.props.sendOrderInformation(data);
      if (this.props.onRowClick) {
        this.props.onRowClick(data);
      }
    }
  };

  render() {
    const { classes, PaperProps, TableProps } = this.props;
    const buyers = this.getBuyersData();
    const sellers = this.getSellersData();
    const spread = this.getSpread();

    const buyOrders = this.isVertical()
      ? [...sellers, ...spread, ...buyers]
      : buyers;
    return (
      <div className={classes.orderBookContainerStyle}>
        <div
          className={
            this.isVertical()
              ? classes.orderBookVerticalStyle
              : classes.orderBookStyle
          }
        >
          <StyledPaper
            title={
              this.props.tradeViewMode
                ? undefined
                : this.isVertical()
                ? I18n.translate('trade_awaiting_buy_sell_orders')
                : I18n.translate('trade_awaiting_buy_orders')
            }
            className={
              this.isVertical()
                ? classes.awaitingBuyOrdersVertical
                : classes.awaitingBuyOrders
            }
            {...PaperProps}
          >
            <ContrastTable
              className={classes.orderBookTableStyle}
              hover={true}
              tableHeaderStyle={classes.tableHeaderStyle}
              headerItems={this.getBuyersHeader(this.props.selectedMarket)}
              fixedLayoutOnMobile={true}
              data={buyOrders}
              padding={this.isVertical() ? 'dense' : 'default'}
              size="small"
              onRowClick={row =>
                this.sendOrderInformation(row, buyOrders, ORDER_DIRECTIONS.BUY)
              }
              {...TableProps}
            />
          </StyledPaper>
          {!this.isVertical() ? (
            <StyledPaper
              title={I18n.translate('trade_awaiting_sell_orders')}
              className={classes.awaitingSellOrders}
            >
              <ContrastTable
                className={classes.orderBookTableStyle}
                hover={true}
                tableHeaderStyle={classes.tableHeaderStyle}
                headerItems={this.getSellersHeader(this.props.selectedMarket)}
                data={sellers}
                fixedLayoutOnMobile={true}
                size="small"
                onRowClick={row =>
                  this.sendOrderInformation(row, sellers, ORDER_DIRECTIONS.SELL)
                }
              />
            </StyledPaper>
          ) : null}
        </div>
        {this.isVertical() && !this.props.tradeViewMode ? (
          <StyledPaper
            className={classes.lastTransactionsVertical}
            title={I18n.translate('trade_last_transactions')}
          >
            <MarketHistoryContainer padding="dense" />
          </StyledPaper>
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MarketContent);

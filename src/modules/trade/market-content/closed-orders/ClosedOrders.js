import React from 'react';
import moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withStyles } from '@material-ui/core/styles';
import ContrastTable from '../../../../components/common/ContrastTable';
import TradeHistoryContainer from '../../../account/trade-history/TradeHistoryContainer';
import I18n from '../../../../common/i18n/I18n';
import { Arrow } from '../../../../components/icons/Icons';
import lightTheme from '../../../../common/theme/lightTheme';
import { isUserLoggedIn } from '../../../login/loginHelper';
import { CLOSED_ORDERS_PARAMS } from '../marketContentConstants';

const styles = theme => ({
  tableStyle: {
    overflow: 'hidden'
  },
  hyperLink: {
    textDecoration: 'underline',
    cursor: 'pointer',
    color: theme.colors.textColor.blue
  },
  orderDetailIconStyle: {
    color: theme.colors.textColor.menuItem
  }
});

class ClosedOrders extends React.PureComponent {
  componentDidMount() {
    if (isUserLoggedIn()) {
      this.props.changePreferences('closedOrdersPageNumber', 0);
      this.getHistory(0);
    }
  }

  componentDidUpdate(prevProps) {
    if (!isUserLoggedIn()) {
      return;
    }

    if (
      prevProps.marketCode !== this.props.marketCode ||
      prevProps.hideCancelled !== this.props.hideCancelled
    ) {
      this.getHistory(this.props.preferences.closedOrdersPageNumber);
    }
  }

  onChangePage = (event, pageNumber) => {
    this.props.changePreferences('closedOrdersPageNumber', pageNumber);
    this.getHistory(pageNumber);
  };

  getHistory = pageNumber => {
    const { marketCode, hideCancelled, pageSize } = this.props;
    const pageSizeOrDefault =
      pageSize || CLOSED_ORDERS_PARAMS.DEFAULT_PAGE_SIZE;

    this.props.getClosedOrders({
      market_code: marketCode,
      hide_cancelled: hideCancelled,
      page_number: pageNumber + 1,
      page_size: pageSizeOrDefault
    });
  };

  getHeaderItems = () => {
    const { marketCode, markets, hideAveragePrice } = this.props;
    let market = null;

    if (markets && markets.length > 0) {
      market = markets.find(m => m.market_code === marketCode);
    }

    return [
      { value: I18n.translate('general_date_time'), numeric: false },
      {
        value: I18n.translate('general_market'),
        hidden: this.props.marketCode !== ''
      },
      `${I18n.translate('general_order_price')} ${
        market ? `(${market.counter_currency})` : ''
      }`,
      `${I18n.translate('general_amount')} ${
        market ? `(${market.base_currency})` : ''
      }`,
      `${I18n.translate('general_executed_amount')} ${
        market ? `(${market.base_currency})` : ''
      }`,
      {
        value: `${I18n.translate('general_average_price')} ${
          market ? `(${market.counter_currency})` : ''
        }`,
        hidden: hideAveragePrice
      },
      `${I18n.translate('general_total')} ${
        market ? `(${market.counter_currency})` : ''
      }`,
      I18n.translate('general_status')
    ];
  };

  showTradeDetail = orderNumber => {
    this.props.showDialog({
      title: I18n.translate('order_trade_detail_title'),
      text: (
        <MuiThemeProvider theme={createMuiTheme(lightTheme)}>
          <TradeHistoryContainer orderNumber={orderNumber} />
        </MuiThemeProvider>
      ),
      okButtonText: I18n.translate('general_ok')
    });
  };

  mapFormattedOrders = (item, index) => {
    const { hideAveragePrice } = this.props;

    let mapResult = {
      key: item.order_number,
      highlight: item.highlight,
      values: [
        {
          value: moment(item.update_date).format('DD.MM.YYYY - HH:mm:ss'),
          numeric: false,
          style: { whiteSpace: 'nowrap' }
        },
        {
          value: item.market_code,
          hidden: this.props.marketCode !== ''
        },
        {
          value:
            item.order_type !== 'market'
              ? item.price
              : I18n.translate('general_market').toUpperCase(),
          style: {
            color: item.buy_sell === 'B' ? '#3ad09f' : '#f87979',
            whiteSpace: 'nowrap'
          },
          preItem: (
            <Arrow
              rotate={item.buy_sell === 'B' ? 45 : -135}
              translate={item.buy_sell === 'B' ? '0' : '-8 -15'}
              fillColor={item.buy_sell === 'B' ? '#3ad09f' : '#f87979'}
            />
          )
        },
        {
          value: item.volume
        },
        { value: item.volume_executed },
        {
          value: item.avg_price,
          hidden: hideAveragePrice
        },
        {
          value: item.total
        },
        {
          value: I18n.translate(`order_status_${item.status}`)
        },
        {
          value:
            item.volume_executed > 0 ? (
              <Tooltip title={I18n.translate('order_detail_tooltip')}>
                <IconButton
                  style={{ padding: '0px', margin: '3px' }}
                  onClick={() => this.showTradeDetail(item.order_number)}
                >
                  <Icon
                    className={this.props.classes.orderDetailIconStyle}
                    style={{ fontSize: '22px' }}
                  >
                    more_horiz
                  </Icon>
                </IconButton>
              </Tooltip>
            ) : null,
          isActionButton: true,
          padding: 'none'
        }
      ]
    };

    return mapResult;
  };

  getFormattedOrders = () => {
    const { closedOrders } = this.props;
    if (closedOrders && closedOrders.length > 0) {
      return closedOrders.map(this.mapFormattedOrders);
    }
  };

  render() {
    const {
      TableProps,
      closedOrders,
      closedOrdersParams,
      pageSize,
      preferences
    } = this.props;

    const pageSizeOrDefault =
      pageSize || CLOSED_ORDERS_PARAMS.DEFAULT_PAGE_SIZE;
    const headerItems = this.getHeaderItems();
    const totalCount =
      closedOrders &&
      closedOrdersParams &&
      (closedOrdersParams.total_count || 0);

    return totalCount > 0 ? (
      <ContrastTable
        className={this.tableStyle}
        hover={true}
        headerItems={headerItems}
        padding="dense"
        data={this.getFormattedOrders()}
        paginationProps={{
          colSpan: headerItems.length,
          count: totalCount,
          rowsPerPage: pageSizeOrDefault,
          page: preferences.closedOrdersPageNumber,
          onChangePage: this.onChangePage,
          rowsPerPageOptions: [pageSizeOrDefault]
        }}
        {...TableProps}
      />
    ) : (
      <ContrastTable
        className={this.tableStyle}
        padding="dense"
        data={[]}
        headerItems={headerItems}
        {...TableProps}
      />
    );
  }
}

export default withStyles(styles, { withTheme: true })(ClosedOrders);

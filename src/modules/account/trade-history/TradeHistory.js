import React from 'react';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import ContrastTable from '../../../components/common/ContrastTable';
import I18n from '../../../common/i18n/I18n';

const ROWS_PER_PAGE = 20;

const styles = theme => ({
  table: {
    whiteSpace: 'pre',
    minWidth: '700px'
  },
  scrollOnMobile: {
    '@media screen and (max-width: 600px)': {
      overflowX: 'auto'
    }
  }
});

class TradeHistory extends React.PureComponent {
  componentWillMount() {
    this.getHistory(this.props, this.pageNumber);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.tradeType !== nextProps.tradeType ||
      this.props.marketCode !== nextProps.marketCode ||
      this.props.orderNumber !== nextProps.orderNumber ||
      this.props.dateRange !== nextProps.dateRange
    ) {
      this.pageNumber = 0;
      this.getHistory(nextProps, this.pageNumber);
    }
  }

  pageNumber = 0;

  onChangePage = (event, pageNumber) => {
    this.pageNumber = pageNumber;
    this.getHistory(this.props, this.pageNumber);
  };

  getHistory = (props, pageNumber) => {
    props
      .getTradeHistory(
        props.tradeType,
        props.marketCode,
        props.dateRange,
        props.orderNumber,
        pageNumber + 1
      )
      .then(() => {});
  };

  headerItems = [
    {
      value: `  ${I18n.translate('general_date_time')}`,
      numeric: false,
      style: { whiteSpace: 'pre' }
    },
    { value: I18n.translate('general_market'), numeric: false },
    { value: I18n.translate('trade_buy_sell'), numeric: false },
    { value: I18n.translate('general_amount'), numeric: false },
    { value: I18n.translate('general_price'), numeric: false },
    { value: I18n.translate('general_fee'), numeric: false },
    { value: I18n.translate('general_total'), numeric: false },
    { value: I18n.translate('trade_role'), numeric: false }
  ];

  getFormattedTrades = () => {
    return this.props.tradeHistoryResult && this.props.tradeHistoryResult.trades
      ? this.props.tradeHistoryResult.trades.map(item => ({
          key: item.id,
          values: [
            {
              value: moment(item.add_date).format('  DD.MM.YYYY HH:mm:ss'),
              numeric: false,
              style: { whiteSpace: 'pre' }
            },
            {
              value: item.market_code,
              numeric: false
            },
            {
              value: I18n.translate(
                item.buy_sell === 'B' ? 'trade_buy' : 'trade_sell'
              ),
              numeric: false
            },
            { value: item.amount, numeric: false },
            { value: item.price, numeric: false },
            {
              value: item.fee,
              numeric: false,
              postItem: ` ${item.fee_currency_code}`
            },
            { value: item.total_price, numeric: false },
            {
              value: I18n.translate(`trade_role_${item.maker_taker}`),
              numeric: false
            }
          ]
        }))
      : null;
  };

  render() {
    const { tradeHistoryResult } = this.props;
    return tradeHistoryResult &&
      tradeHistoryResult.trades &&
      tradeHistoryResult.trades.length > 0 ? (
      <div className={this.props.classes.scrollOnMobile}>
        <ContrastTable
          hover={true}
          headerItems={this.headerItems}
          className={this.props.classes.table}
          padding="none"
          data={this.getFormattedTrades()}
          paginationProps={{
            colSpan: this.headerItems.length,
            count: tradeHistoryResult.total_count,
            rowsPerPage: ROWS_PER_PAGE,
            page: this.pageNumber,
            onChangePage: this.onChangePage,
            rowsPerPageOptions: [ROWS_PER_PAGE]
          }}
        />
      </div>
    ) : null;
  }
}

export default withStyles(styles, { withTheme: true })(TradeHistory);

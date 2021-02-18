import React from 'react';
import moment from 'moment';
import Tooltip from '@material-ui/core/Tooltip';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withStyles } from '@material-ui/core/styles';
import ContrastTable from '../../../../components/common/ContrastTable';
import TradeHistoryContainer from '../../../account/trade-history/TradeHistoryContainer';
import I18n from '../../../../common/i18n/I18n';
import { Arrow, CancelIcon } from '../../../../components/icons/Icons';
import lightTheme from '../../../../common/theme/lightTheme';
import { isUserLoggedIn } from '../../../login/loginHelper';

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

class OrderHistory extends React.PureComponent {
  componentDidMount() {
    if (isUserLoggedIn()) {
      this.props.getOpenOrders(this.props.marketCode);
    }
  }

  componentDidUpdate(prevProps) {
    if (!isUserLoggedIn()) {
      return;
    }

    if (
      prevProps !== this.props &&
      prevProps.openOrders !== this.props.openOrders
    ) {
      if (this.props.openOrders && this.props.onMount) {
        this.props.onMount(this.props.openOrders.length);
      }
    }

    if (prevProps.marketCode !== this.props.marketCode) {
      this.props.getOpenOrders(this.props.marketCode);
    }
  }

  getHeaderItems = () => {
    const { marketCode, selectedMarket } = this.props;
    return [
      { value: I18n.translate('general_date_time'), numeric: false },
      I18n.translate('general_market'),
      `${I18n.translate('general_order_price')} ${
        marketCode ? '(' + selectedMarket.counter_currency + ')' : ''
      }`,
      `${I18n.translate('general_amount')} ${
        marketCode ? '(' + selectedMarket.base_currency + ')' : ''
      }`,
      `${I18n.translate('general_remaining')} ${
        marketCode ? '(' + selectedMarket.base_currency + ')' : ''
      }`,
      `${I18n.translate('general_total')} ${
        marketCode ? '(' + selectedMarket.counter_currency + ')' : ''
      }`,
      I18n.translate('general_status'),
      { value: '', padding: 'none', isActionButton: true }
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
          value: item.market_code
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
        { value: item.volume_remaining },
        {
          value: item.total
        },
        {
          value:
            item.volume_executed > 0 ? (
              <Tooltip title={I18n.translate('order_detail_tooltip')}>
                <div
                  className={this.props.classes.hyperLink}
                  onClick={() => this.showTradeDetail(item.order_number)}
                >
                  {I18n.translate(`order_status_${item.status}`)}
                </div>
              </Tooltip>
            ) : (
              I18n.translate(`order_status_${item.status}`)
            )
        },
        {
          value: item.cancelable ? (
            <CancelIcon
              onClick={this.showCancelOrderDialog}
              fillColor={this.props.theme.colors.background.cancelIcon}
              fillOpacity={this.props.theme.colors.opacity.cancelIcon}
              itemKey={item.order_number}
            />
          ) : null,
          isActionButton: true,
          tooltipText: I18n.translate('trade_cancel_order_tooltip'),
          padding: 'none'
        }
      ]
    };

    return mapResult;
  };

  getFormattedOrders = () => {
    return this.props.openOrders
      ? this.props.openOrders.map((item, index) =>
          this.mapFormattedOrders(item, index)
        )
      : null;
  };

  cancelOrder = orderId => {
    this.props
      .cancelOrder(orderId)
      .then(() => {})
      .catch(() => {
        this.props.showDialog({
          title: I18n.translate('general_error'),
          text: I18n.translate('general_error_description')
        });
      });
  };

  showCancelOrderDialog = orderId => {
    const dismissDialog = this.props.preferences.dismissOrderCancelDialog;
    if (!dismissDialog) {
      this.props.showDialog(
        {
          title: I18n.translate('trade_cancel_order_dialog_title'),
          text: I18n.translate('trade_cancel_order_dialog_message'),
          okButtonText: I18n.translate('general_yes'),
          cancelButtonText: I18n.translate('general_no'),
          key: orderId,
          dismissable: true,
          dismissPreferenceKey: 'dismissOrderCancelDialog'
        },
        {
          ok: this.cancelOrder
        }
      );
    } else {
      this.cancelOrder(orderId);
    }
  };

  render() {
    const { TableProps } = this.props;
    return (
      <ContrastTable
        className={this.tableStyle}
        hover={true}
        headerItems={this.getHeaderItems()}
        padding="dense"
        data={this.getFormattedOrders()}
        {...TableProps}
      />
    );
  }
}

//export default withStyles(styles, {withTheme: true})(asyncPoll(30 * 1000, onPollInterval)(OrderHistory));
export default withStyles(styles, { withTheme: true })(OrderHistory);

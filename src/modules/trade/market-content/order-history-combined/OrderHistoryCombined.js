import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import I18n from '../../../../common/i18n/I18n';
import { isUserLoggedIn } from '../../../login/loginHelper';
import StyledPaper from '../../../../components/common/StyledPaper';
import OrderHistoryContainer from '../order-history/OrderHistoryContainer';
import ClosedOrdersContainer from '../closed-orders/ClosedOrdersContainer';
import { withStyles } from '@material-ui/core';
import { CLOSED_ORDERS_PARAMS } from '../marketContentConstants';

const styles = theme => ({
  historyTypeTabStyle: {
    textTransform: 'none',
    fontFamily: 'Roboto',
    fontWeight: '400',
    height: '40px',
    minHeight: '40px',
    color: theme.colors.textColor.inactiveTab
  },
  tableCellStyle: {
    fontSize: '11.5px !important',
    letterSpacing: '0.2px',
    '@media screen and (max-width: 1439px)': {
      fontSize: '11px !important'
    }
  },
  tableRowStyle: {
    height: '24px'
  },
  actionButtonStyle: {
    marginRight: '0'
  },
  defaultTabSelected: {
    color: theme.colors.textColor.activeTab,
    fontWeight: '500'
  },
  dividerStyle: {
    height: '2px',
    marginTop: '-2px',
    backgroundColor: theme.colors.background.divider
  },
  tabsRoot: {
    minHeight: '40px',
    height: '40px'
  },
  tabIndicator: {
    backgroundColor: theme.colors.textColor.blue
  },
  checkbox: {
    color: theme.colors.background.checkboxBorder,
    '&$checked': {
      color: theme.colors.textColor.blue
    },
    padding: '2px 12px'
  },
  checked: {},
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: '40px'
  },
  marketFilterContainer: {
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
  scrollWrapper: {
    overflow: 'hidden',
    height: '100%'
  },
  historyTablesContainer: {
    height: 'calc(100% - 42px)',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '16px',
      backgroundColor: theme.colors.background.paper
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '12px',
      backgroundColor: theme.colors.textColor.inputLabel,
      '&:hover': {
        backgroundColor: theme.colors.textColor.tableHeader
      },
      border: `solid 4px ${theme.colors.background.paper}`
    },
    '&::-webkit-scrollbar-track': {
      width: '10px',
      borderRadius: '12px',
      backgroundColor: theme.colors.background.paper
    }
  },
  scrollbar: {
    backgroundColor: theme.colors.background.paper
  }
});

class OrderHistoryCombined extends React.PureComponent {
  ordersTimeoutFunc = null;

  componentDidMount() {
    const {
      openOrdersMarketCode,
      getOpenOrders,
      historyType,
      preferences
    } = this.props;

    if (isUserLoggedIn() && historyType === 'marketHistory') {
      getOpenOrders(preferences.showAllMarkets ? '' : openOrdersMarketCode);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.props.ordersUpdateTimeout > 0) {
      if (this.ordersTimeoutFunc) {
        window.clearTimeout(this.ordersTimeoutFunc);
      }
      this.ordersTimeoutFunc = window.setTimeout(
        this.getHistory,
        this.props.ordersUpdateTimeout
      );
    }
  }

  getHistory = () => {
    const {
      getOpenOrders,
      historyType,
      getClosedOrders,
      preferences,
      openOrdersMarketCode,
      closedOrdersMarketCode,
      closedOrdersPageSize
    } = this.props;

    if (isUserLoggedIn()) {
      getOpenOrders(preferences.showAllMarkets ? '' : openOrdersMarketCode);
      if (historyType === 'marketHistory') {
        getClosedOrders({
          market_code: closedOrdersMarketCode,
          hide_cancelled: preferences.hideCancelled,
          page_number: preferences.closedOrdersPageNumber + 1,
          page_size:
            closedOrdersPageSize || CLOSED_ORDERS_PARAMS.DEFAULT_PAGE_SIZE
        });
      }
    }
  };

  render() {
    const {
      classes,
      className,
      historyType,
      onHistoryTypeChange,
      showAllMarkets,
      onMarketFilterChange,
      openOrdersMarketCode,
      closedOrdersMarketCode,
      closedOrdersPageSize,
      hideCancelled,
      hideAveragePrice,
      onHideCancelledChange,
      TableProps
    } = this.props;
    return (
      <StyledPaper className={className}>
        <div className={classes.tabContainer}>
          <Tabs
            value={historyType}
            onChange={onHistoryTypeChange}
            textColor="primary"
            classes={{
              root: classes.tabsRoot,
              indicator: classes.tabIndicator
            }}
          >
            <Tab
              classes={{
                root: classes.historyTypeTabStyle,
                selected: classes.defaultTabSelected
              }}
              value="userHistory"
              label={I18n.translate('trade_open_orders')}
            />
            <Tab
              classes={{
                root: classes.historyTypeTabStyle,
                selected: classes.defaultTabSelected
              }}
              value="marketHistory"
              label={I18n.translate('trade_my_order_history')}
            />
          </Tabs>
          {historyType === 'userHistory' ? (
            <div className={classes.marketFilterContainer}>
              <div
                className={classes.switchLabel}
                onClick={onMarketFilterChange}
              >
                {I18n.translate('trade_show_all_markets')}
              </div>
              <Checkbox
                checked={showAllMarkets}
                disabled={!isUserLoggedIn()}
                classes={{
                  root: classes.checkbox,
                  checked: classes.checked
                }}
                onChange={onMarketFilterChange}
                aria-label="verticalView"
              />
            </div>
          ) : (
            <div className={classes.marketFilterContainer}>
              <div
                className={classes.switchLabel}
                onClick={onHideCancelledChange}
              >
                {I18n.translate('hide_canceled_orders')}
              </div>
              <Checkbox
                checked={hideCancelled}
                disabled={!isUserLoggedIn()}
                classes={{
                  root: classes.checkbox,
                  checked: classes.checked
                }}
                onChange={onHideCancelledChange}
                aria-label="verticalView"
              />
            </div>
          )}
        </div>
        <Divider className={classes.dividerStyle} />
        <div className={classes.scrollWrapper}>
          <div className={classes.historyTablesContainer}>
            {historyType === 'userHistory' ? (
              <OrderHistoryContainer
                orderStatus="O"
                marketCode={showAllMarkets ? '' : openOrdersMarketCode}
                TableProps={TableProps}
              />
            ) : (
              <ClosedOrdersContainer
                marketCode={closedOrdersMarketCode}
                hideCancelled={hideCancelled}
                hideAveragePrice={hideAveragePrice}
                pageSize={closedOrdersPageSize}
                TableProps={TableProps}
              />
            )}
          </div>
        </div>
      </StyledPaper>
    );
  }
}

export default withStyles(styles)(OrderHistoryCombined);

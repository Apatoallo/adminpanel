import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import classNames from 'classnames';
import OrderBookContainer from '../../market-content/order-book/OrderBookContainer';
import ClosedOrdersContainer from '../../market-content/closed-orders/ClosedOrdersContainer';
import OpenOrdersContainer from '../../market-content/open-orders/OpenOrdersContainer';
import MarketHistoryContainer from '../../market-content/market-history/MarketHistoryContainer';
import TabbedChartsContainer from '../../market-content/charts/TabbedChartsContainer';
import TradePaneContainer from '../../trade-pane/TradePaneContainer';
import StyledPaper from '../../../../components/common/StyledPaper';
import I18n from '../../../../common/i18n/I18n';

import TradeViewStyle from '../TradeViewStyle';

const TradeViewMobile = props => {
  const {
    classes,
    selectedMarket,
    sliceSize,
    mobileTabType,
    isPreLoginMode,
    tradePaneInitiator
  } = props;

  return (
    <div className={classes.mobileContainer}>
      <div className={classes.mobileTabsContainer}>
        <Tabs
          value={mobileTabType}
          onChange={props.onMobileTabTypeChange}
          fullWidth
          textColor="primary"
          classes={{
            root: classes.mobileTabsRoot,
            indicator: classes.tabIndicator
          }}
        >
          <Tab
            classes={{
              root: classes.mobileTab,
              selected: classes.defaultTabSelected
            }}
            value="tradePane"
            label={I18n.translate('general_trade')}
          />
          <Tab
            classes={{
              root: classes.mobileTab,
              selected: classes.defaultTabSelected
            }}
            value="orderHistory"
            label={I18n.translate('trade_my_orders')}
          />
          <Tab
            classes={{
              root: classes.mobileTab,
              selected: classes.defaultTabSelected
            }}
            value="chart"
            label={I18n.translate('trade_chart')}
          />
          <Tab
            classes={{
              root: classes.mobileTab,
              selected: classes.defaultTabSelected
            }}
            value="book"
            label={I18n.translate('trade_order_book')}
          />
          <Tab
            classes={{
              root: classes.mobileTab,
              selected: classes.defaultTabSelected
            }}
            value="marketHistory"
            label={I18n.translate('trade_last_transactions')}
          />
        </Tabs>
      </div>
      {mobileTabType === 'tradePane' && (
        <TradePaneContainer
          isPreLoginMode={isPreLoginMode}
          PaperProps={{
            classes: {
              paperStyle: classes.tradePaneMobile
            }
          }}
          initiator={tradePaneInitiator}
        />
      )}
      {mobileTabType === 'orderHistory' && (
        <div className={classes.orderHistoryMobileTabContainer}>
          <OpenOrdersContainer
            PaperProps={{
              classes: {
                paperStyle: classNames(
                  classes.paper,
                  classes.orderHistoryMobile
                )
              }
            }}
            TableProps={{
              classes: {
                rowStyle: classes.tableRowStyle,
                tableCellStyle: classes.tableCellStyle
              },
              padding: 'none'
            }}
          />
          <StyledPaper
            className={classNames(classes.paper, classes.orderHistoryMobile)}
            title={I18n.translate('trade_my_order_history')}
          >
            <ClosedOrdersContainer
              marketCode={selectedMarket.market_code}
              TableProps={{
                classes: {
                  rowStyle: classes.tableRowStyle,
                  tableCellStyle: classes.tableCellStyle
                },
                padding: 'none'
              }}
            />
          </StyledPaper>
        </div>
      )}
      {mobileTabType === 'chart' && (
        <StyledPaper
          className={classNames(classes.paper, classes.chartWrapperTablet)}
        >
          <TabbedChartsContainer
            selectedMarket={selectedMarket}
            onChangeMarket={props.onChangeMarket}
            classes={{
              chartContainer: classes.chartContainer
            }}
          />
        </StyledPaper>
      )}
      {mobileTabType === 'book' && (
        <div className={classes.orderBook}>
          <OrderBookContainer
            tradeViewMode={true}
            sliceSize={Math.floor(sliceSize / 2)}
            onRowClick={() => props.onMobileTabTypeChange(null, 'tradePane')}
            tradeViewStyle="vertical"
            classes={{
              orderBookVerticalStyle: classes.orderBookVerticalStyleMobile,
              awaitingBuyOrdersVertical: classes.orderBookVerticalStyleMobile
            }}
            PaperProps={{
              classes: {
                paperStyle: classNames(classes.paper, classes.mobilePaper)
              }
            }}
            TableProps={{
              classes: {
                rowStyle: classes.tableRowStyle,
                tableCellStyle: classes.tableCellStyle,
                tableStyle: classes.tableStyleMobile
              },
              padding: 'none'
            }}
          />
        </div>
      )}
      {mobileTabType === 'marketHistory' && (
        <StyledPaper className={classes.tradePaneMobile}>
          <MarketHistoryContainer
            className={classes.marketHistoryMobile}
            sliceSize={sliceSize}
            omitTotalValue
            TableProps={{
              classes: {
                rowStyle: classes.tableRowStyle,
                tableCellStyle: classes.tableCellStyle,
                tableStyle: classes.tableStyleMobile
              },
              padding: 'none'
            }}
          />
        </StyledPaper>
      )}
    </div>
  );
};

export default withStyles(TradeViewStyle, { withTheme: true })(TradeViewMobile);

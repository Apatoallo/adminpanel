import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Divider from '@material-ui/core/Divider';
import classNames from 'classnames';
import OrderBookContainer from '../../market-content/order-book/OrderBookContainer';
import MarketHistoryContainer from '../../market-content/market-history/MarketHistoryContainer';
import TabbedChartsContainer from '../../market-content/charts/TabbedChartsContainer';
import StyledPaper from '../../../../components/common/StyledPaper';
import I18n from '../../../../common/i18n/I18n';

import TradeViewStyle from '../TradeViewStyle';
import OrderHistoryCombinedContainer from '../../market-content/order-history-combined/OrderHistoryCombinedContainer';

const TradeViewTablet = props => {
  const {
    classes,
    selectedMarket,
    showAllMarkets,
    historyType,
    sliceSize,
    hideCancelled,
    tabletTabType
  } = props;

  return (
    <div className={classes.tabletViewContainer}>
      <div className={classes.tabletViewUpperPanel}>
        <StyledPaper className={classes.paper}>
          <div className={classes.tabContainer}>
            <Tabs
              value={tabletTabType}
              onChange={props.onTabletTabTypeChange}
              textColor="primary"
              classes={{
                root: classes.tabsRoot,
                indicator: classes.tabIndicator
              }}
            >
              <Tab
                classes={{
                  root: classes.tabletTabStyle,
                  selected: classes.defaultTabSelected
                }}
                value="orderBook"
                label={I18n.translate('account_waiting_orders')}
              />
              <Tab
                classes={{
                  root: classes.tabletTabStyle,
                  selected: classes.defaultTabSelected
                }}
                value="marketHistory"
                label={I18n.translate('trade_last_transactions')}
              />
            </Tabs>
          </div>
          <Divider className={classes.dividerStyle} />
          {tabletTabType === 'orderBook' && (
            <OrderBookContainer
              tradeViewMode={true}
              sliceSize={Math.floor(sliceSize / 2)}
              tradeViewStyle="vertical"
              classes={{
                orderBookVerticalStyle: classes.orderBookVerticalStyleTablet,
                awaitingBuyOrdersVertical: classes.orderBookVerticalStyleTablet
              }}
              TableProps={{
                classes: {
                  rowStyle: classes.tableRowStyle,
                  tableCellStyle: classes.tableCellStyle,
                  tableStyle: classes.tableStyleTablet
                },
                padding: 'none'
              }}
            />
          )}
          {tabletTabType === 'marketHistory' && (
            <MarketHistoryContainer
              className={classes.marketHistoryTablet}
              sliceSize={sliceSize}
              omitTotalValue
              TableProps={{
                classes: {
                  rowStyle: classes.tableRowStyle,
                  tableCellStyle: classes.tableCellStyle,
                  tableStyle: classes.tableStyleTablet
                },
                padding: 'none'
              }}
            />
          )}
        </StyledPaper>
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
      </div>
      <div className={classes.tabletViewLowerPanel}>
        <OrderHistoryCombinedContainer
          className={classNames(
            classes.historyPanel,
            classes.historyPanelTablet
          )}
          historyType={historyType}
          openOrdersMarketCode={selectedMarket.market_code}
          closedOrdersMarketCode={selectedMarket.market_code}
          showAllMarkets={showAllMarkets}
          hideCancelled={hideCancelled}
          onHideCancelledChange={props.onHideCancelledChange}
          onMarketFilterChange={props.onMarketFilterChange}
          onHistoryTypeChange={props.onHistoryTypeChange}
          TableProps={{
            classes: {
              rowStyle: classes.tableRowStyle,
              tableCellStyle: classes.tableCellStyle,
              tableStyle: classes.openOrdersTableStyle
            },
            padding: 'none'
          }}
        />
      </div>
    </div>
  );
};

export default withStyles(TradeViewStyle, { withTheme: true })(TradeViewTablet);

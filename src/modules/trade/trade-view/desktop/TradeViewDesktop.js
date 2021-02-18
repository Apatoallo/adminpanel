import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import OrderBookContainer from '../../market-content/order-book/OrderBookContainer';
import MarketHistoryContainer from '../../market-content/market-history/MarketHistoryContainer';
import TabbedChartsContainer from '../../market-content/charts/TabbedChartsContainer';
import StyledPaper from '../../../../components/common/StyledPaper';

import TradeViewStyle from '../TradeViewStyle';
import OrderHistoryCombinedContainer from '../../market-content/order-history-combined/OrderHistoryCombinedContainer';

const TradeViewDesktop = props => {
  const {
    classes,
    selectedMarket,
    showAllMarkets,
    historyType,
    sliceSize,
    hideCancelled
  } = props;

  return (
    <div className={classes.displayRow}>
      <div className={classes.orderBook}>
        <OrderBookContainer
          tradeViewMode={true}
          sliceSize={Math.floor(sliceSize / 2)}
          tradeViewStyle="vertical"
          classes={{
            orderBookVerticalStyle: classes.orderBookVerticalStyle,
            awaitingBuyOrdersVertical: classes.orderBookVerticalStyle
          }}
          PaperProps={{
            classes: {
              paperStyle: classes.paper
            }
          }}
          TableProps={{
            classes: {
              rowStyle: classes.tableRowStyle,
              tableCellStyle: classes.tableCellStyle,
              tableStyle: classes.tableStyle
            },
            padding: 'none'
          }}
        />
      </div>
      <div>
        <StyledPaper className={classes.paper}>
          <MarketHistoryContainer
            className={classes.marketHistory}
            sliceSize={sliceSize}
            omitTotalValue
            TableProps={{
              classes: {
                rowStyle: classes.tableRowStyle,
                tableCellStyle: classes.tableCellStyle,
                tableStyle: classes.tableStyle
              },
              padding: 'none'
            }}
          />
        </StyledPaper>
      </div>
      <div className={classes.midPane}>
        <StyledPaper
          className={classNames(classes.paper, classes.chartWrapper)}
        >
          <TabbedChartsContainer
            selectedMarket={selectedMarket}
            onChangeMarket={props.onChangeMarket}
            classes={{
              chartContainer: classes.chartContainerDesktop
            }}
          />
        </StyledPaper>
        <OrderHistoryCombinedContainer
          className={classes.historyPanel}
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

export default withStyles(TradeViewStyle, { withTheme: true })(
  TradeViewDesktop
);

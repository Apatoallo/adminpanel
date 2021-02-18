import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TradePane from './TradePane';
import { placeLimitOrder, placeMarketOrder } from './TradePaneActions';
import { showSnackbar, showDialog } from '../../../components/page/PageActions';
import { changePreferences } from '../../preferences/PreferencesActions';
import {
  getAccountLines,
  getMarketsInfo,
  changeMarket
} from '../../../components/market-bar/MarketBarActions';
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      placeLimitOrder,
      placeMarketOrder,
      showSnackbar,
      showDialog,
      changePreferences,
      getAccountLines,
      getMarketsInfo,
      changeMarket
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    accountInfo: state.user.accountInfo,
    accountLines: state.market.accountLines,
    markets: state.market.markets,
    selectedMarket: state.market.selectedMarket,
    ticker: state.orderBook.ticker,
    wholeBuyers: state.orderBook.wholeBuyers,
    wholeSellers: state.orderBook.wholeSellers,
    clickedOrderInfo: state.marketContent.clickedOrderInfo,
    preferences: state.preferences,
    tickers: state.market.tickers,

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TradePane);

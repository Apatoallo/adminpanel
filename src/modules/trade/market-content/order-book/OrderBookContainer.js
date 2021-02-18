import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OrderBook from './OrderBook';
import { sendOrderInformation } from '../MarketContentActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      sendOrderInformation
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    buyers: state.orderBook.buyers,
    sellers: state.orderBook.sellers,
    currentTradeViewStyle: state.theme.currentTradeViewStyle,
    selectedMarket: state.market.selectedMarket,
    openOrders: state.orderHistory.openOrders
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderBook);

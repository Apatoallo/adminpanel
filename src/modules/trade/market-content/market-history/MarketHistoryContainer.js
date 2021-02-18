import { connect } from 'react-redux';
import MarketHistory from './MarketHistory';

function mapStateToProps(state) {
  return {
    lastTransactions: state.orderBook.lastTransactions,
    selectedMarket: state.market.selectedMarket
  };
}

export default connect(mapStateToProps, null)(MarketHistory);

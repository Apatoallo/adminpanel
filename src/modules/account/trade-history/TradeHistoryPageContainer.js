import { connect } from 'react-redux';
import TradeHistoryPage from './TradeHistoryPage';

function mapStateToProps(state) {
  return {
    markets: state.market.markets
  };
}

export default connect(mapStateToProps, null)(TradeHistoryPage);

import { connect } from 'react-redux';
import DepthChart from './DepthChart';
import { sendOrderInformation } from '../MarketContentActions';
import { bindActionCreators } from 'redux';

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
    selectedMarket: state.market.selectedMarket,
    ticker: state.orderBook.ticker
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DepthChart);

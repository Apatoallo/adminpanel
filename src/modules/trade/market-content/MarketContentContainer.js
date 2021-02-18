import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MarketContent from './MarketContent';
import { sendOrderInformation } from './MarketContentActions';

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
    currentTradeViewStyle: state.theme.currentTradeViewStyle,
    selectedMarket: state.market.selectedMarket,
    preferences: state.preferences
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketContent);

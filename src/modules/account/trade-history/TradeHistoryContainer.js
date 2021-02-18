import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTradeHistory } from './TradeHistoryActions';
import TradeHistory from './TradeHistory';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getTradeHistory
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    tradeHistoryResult: state.tradeHistory ? state.tradeHistory.result : null
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeHistory);

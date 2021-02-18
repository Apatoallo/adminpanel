import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OrderHistory from './OrderHistory';
import { getOpenOrders, cancelOrder } from './OrderHistoryActions';
import { showDialog } from '../../../../components/page/PageActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getOpenOrders,
      cancelOrder,
      showDialog
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    openOrders: state.orderHistory.openOrders,
    selectedMarket: state.market.selectedMarket,
    preferences: state.preferences
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderHistory);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OrderHistoryCombined from './OrderHistoryCombined';
import { getOpenOrders } from '../order-history/OrderHistoryActions';
import { getClosedOrders } from '../closed-orders/ClosedOrdersActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getOpenOrders,
      getClosedOrders
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    ordersUpdateTimeout: state.orderHistory.ordersUpdateTimeout,
    preferences: state.preferences
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderHistoryCombined);

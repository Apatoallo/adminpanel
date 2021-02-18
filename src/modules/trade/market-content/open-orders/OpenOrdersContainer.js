import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OpenOrders from './OpenOrders';

import { changePreferences } from '../../../preferences/PreferencesActions';
import { getOpenOrders } from '../order-history/OrderHistoryActions';
import { getClosedOrders } from '../closed-orders/ClosedOrdersActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getOpenOrders,
      getClosedOrders,
      changePreferences
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    selectedMarket: state.market.selectedMarket,
    ordersUpdateTimeout: state.orderHistory.ordersUpdateTimeout,
    preferences: state.preferences
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenOrders);

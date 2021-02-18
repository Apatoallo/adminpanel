import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ClosedOrders from './ClosedOrders';
import { getClosedOrders } from './ClosedOrdersActions';
import { showDialog } from '../../../../components/page/PageActions';
import { changePreferences } from '../../../preferences/PreferencesActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getClosedOrders,
      changePreferences,
      showDialog
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    closedOrders: state.orderHistory.closedOrders,
    closedOrdersParams: state.orderHistory.closedOrdersParams,
    accountInfo: state.user.accountInfo,
    markets: state.market.markets,
    preferences: state.preferences
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClosedOrders);

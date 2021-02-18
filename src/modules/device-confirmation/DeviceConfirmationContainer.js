import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import DeviceConfirmation from './DeviceConfirmation';
import { checkConfirmation } from './DeviceConfirmationActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      checkConfirmation
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    tickers: state.market.tickers
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DeviceConfirmation)
);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { forgotPassword } from './ForgotPasswordActions';
import ForgotPassword from './ForgotPassword';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      forgotPassword
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    tickers: state.market.tickers
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

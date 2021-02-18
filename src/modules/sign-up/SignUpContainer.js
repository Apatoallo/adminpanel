import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveEmail, signUp } from './SignUpActions';
import SingUp from './SignUp';

function mapStateToProps(state) {
  return {
    tickers: state.market.tickers
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      saveEmail,
      signUp
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SingUp);

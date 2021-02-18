import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginFirstFactor, loginPrivateSocket } from './LoginActions';
import { getDetail } from '../user/UserActions';
import Login from './Login';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loginFirstFactor,
      loginPrivateSocket,
      getDetail
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    userInfo: state.user.info,
    secondFactorType: state.login.secondFactorType,
    tickers: state.market.tickers
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

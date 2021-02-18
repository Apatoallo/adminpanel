import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  loginSecondFactor,
  loginPrivateSocket,
  resendSms
} from './LoginActions';
import { getDetail } from '../user/UserActions';
import Login2FA from './Login2FA';
import { showSnackbar, showDialog } from '../../components/page/PageActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      showSnackbar,
      showDialog,
      resendSms,
      loginSecondFactor,
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
    fullName: state.login.fullName,
    tickers: state.market.tickers
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login2FA);

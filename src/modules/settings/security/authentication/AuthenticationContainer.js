import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Authentication from './Authentication';
import { getDetail } from '../../../user/UserActions';
import { enableOtp, disableOtp, verifyOtp } from './AuthenticationActions';
import {
  showSnackbar,
  showDialog
} from '../../../../components/page/PageActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getDetail,
      showSnackbar,
      showDialog,
      enableOtp,
      disableOtp,
      verifyOtp
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    userInfo: state.user.info,
    googleSecretKey: state.authentication.googleSecretKey,
    googleUri: state.authentication.googleUri
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);

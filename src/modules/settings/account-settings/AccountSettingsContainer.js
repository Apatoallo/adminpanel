import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AccountSettings from './AccountSettings';
import { sendSms, verify, changeLanguage } from './AccountSettingsActions';
import { showSnackbar, showDialog } from '../../../components/page/PageActions';
import { getDetail } from '../../user/UserActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      sendSms,
      verify,
      changeLanguage,
      showSnackbar,
      showDialog,
      getDetail
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    userInfo: state.user.info
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);

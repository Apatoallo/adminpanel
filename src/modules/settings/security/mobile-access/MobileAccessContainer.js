import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MobileAccess from './MobileAccess';
import {
  createMobileAccess,
  deleteMobileAccess,
  listMobileAccess,
  clearUpdateMobileKeysFlag
} from './MobileAccessActions';
import {
  showSnackbar,
  showDialog
} from '../../../../components/page/PageActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createMobileAccess,
      listMobileAccess,
      deleteMobileAccess,
      clearUpdateMobileKeysFlag,
      showSnackbar,
      showDialog
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    mobileStatus: getMobileStatus(state),
    mobileKeys: getMobileKeys(state),
    updateMobileKeysFlag: state.mobileAccess.updateMobileKeysFlag,
    userInfo: state.user.info
  };
}

const getMobileKeys = state => state.mobileAccess.mobileKeys;

const getMobileStatus = state => state.mobileAccess.mobileStatus;

export default connect(mapStateToProps, mapDispatchToProps)(MobileAccess);

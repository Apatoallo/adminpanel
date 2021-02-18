import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VerificationForm from './VerificationForm';
import { submit, getStatus } from './VerificationActions';
import {
  showSnackbar,
  showDialog,
  showLoading,
  hideLoading
} from '../../components/page/PageActions';
import { getDetail } from '../../modules/user/UserActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      submit,
      getStatus,
      showSnackbar,
      showDialog,
      getDetail,
      showLoading,
      hideLoading
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    idStatus: extractStatus('I')(state),
    addressStatus: extractStatus('A')(state)
  };
}

const extractStatus = type => state => {
  let status = 'N';
  if (state.verification.verificationStatus) {
    state.verification.verificationStatus.forEach(item => {
      if (item.type === type) {
        status = item.status;
      }
    });
    return status;
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(VerificationForm);

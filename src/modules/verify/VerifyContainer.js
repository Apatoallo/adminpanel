import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Verify from './Verify';
import { getVerifyStatus } from './VerifyActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getVerifyStatus
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    verifyResult: state.verify.verifyResult
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Verify));

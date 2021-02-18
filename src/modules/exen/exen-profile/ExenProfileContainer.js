import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ExenProfile from './ExenProfile';
import { showSnackbar, showDialog } from '../../../components/page/PageActions';
import { getProfile, addReferrer } from '../ExenActions';
import { getDetail } from '../../user/UserActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      showSnackbar,
      showDialog,
      getProfile,
      addReferrer,
      getDetail
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    profile: state.exen.profile,
    userInfo: state.user.info
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExenProfile);

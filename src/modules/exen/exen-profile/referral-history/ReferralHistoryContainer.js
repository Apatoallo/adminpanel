import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReferralHistory from './ReferralHistory';
import { getReferralHistory } from '../../ExenActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getReferralHistory }, dispatch);
}

function mapStateToProps(state) {
  return {
    referralHistory: state.exen.referralHistory
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReferralHistory);

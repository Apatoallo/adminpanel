import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Fees from './Fees';
import { getFeesPublic } from '../account/limits/LimitsActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getFeesPublic
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    commissions: state.fees.commissions
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fees);

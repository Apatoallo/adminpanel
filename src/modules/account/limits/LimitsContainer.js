import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Limits from './Limits';
import { getAccountLimits } from './LimitsActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getAccountLimits
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    limits: state.limits.limits,
    commissions: state.limits.commissions
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Limits);

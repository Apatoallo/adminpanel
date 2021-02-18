import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ExenStats from './ExenStats';
import { getExenStats } from '../ExenActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getExenStats
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    exenStats: state.exen.exenStats
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExenStats);

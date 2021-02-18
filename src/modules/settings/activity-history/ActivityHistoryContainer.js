import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getActivityHistory } from './ActivityHistoryActions';
import ActivityHistory from './ActivityHistory';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getActivityHistory
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    activityHistoryResult: state.activityHistory
      ? state.activityHistory.result
      : null
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityHistory);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CompetitionHistory from './CompetitionHistory';
import { getCompetitionHistory } from '../../ExenActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCompetitionHistory }, dispatch);
}

function mapStateToProps(state) {
  return {
    competitionHistory: state.exen.competitionHistory
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionHistory);

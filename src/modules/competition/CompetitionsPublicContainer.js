import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CompetitionsPublic from './CompetitionsPublic';
import { getCompetitionPublic } from '../exen/ExenActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCompetitionPublic
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    competition: state.exen.competitionPublic
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionsPublic);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Competition from './Competition';
import { getCompetition } from './../exen/ExenActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCompetition
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    competition: state.exen.competition,
    userInfo: state.user.info
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Competition);

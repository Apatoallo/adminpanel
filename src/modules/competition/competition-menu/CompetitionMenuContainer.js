import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CompetitionMenu from './CompetitionMenu';

function mapStateToProps(state) {
  return {
    userInfo: state.user.info
  };
}

export default withRouter(connect(mapStateToProps, null)(CompetitionMenu));

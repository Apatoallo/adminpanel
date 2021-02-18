import { connect } from 'react-redux';
import Transfers from './Transfers';
import { withRouter } from 'react-router-dom';

function mapStateToProps(state) {
  return {
    accountLines: state.market.accountLines
  };
}

export default withRouter(connect(mapStateToProps, null)(Transfers));

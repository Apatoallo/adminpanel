import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ConnectionStatus from './ConnectionStatus';

function mapStateToProps(state) {
  return {
    connected: state.connectionStatus.socketConnected
  };
}

export default withRouter(connect(mapStateToProps, null)(ConnectionStatus));

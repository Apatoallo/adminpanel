import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { subscribeToMailList } from './InfoPaneActions';
import InfoPane from './InfoPane';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      subscribeToMailList
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(InfoPane);

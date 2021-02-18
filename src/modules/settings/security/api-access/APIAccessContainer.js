import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import APIAccess from './APIAccess';
import {
  createApiAccess,
  deleteApiAccess,
  listApiAccess,
  deactivateApiAccess,
  activateApiAccess,
  clearUpdateApiKeysFlag
} from './APIAccessActions';
import {
  showSnackbar,
  showDialog
} from '../../../../components/page/PageActions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createApiAccess,
      listApiAccess,
      deleteApiAccess,
      deactivateApiAccess,
      activateApiAccess,
      clearUpdateApiKeysFlag,
      showSnackbar,
      showDialog
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    apiKeys: getApiKeys(state),
    updateApiKeysFlag: state.apiAccess.updateApiKeysFlag
  };
}

const getApiKeys = state => state.apiAccess.apiKeys;

export default connect(mapStateToProps, mapDispatchToProps)(APIAccess);

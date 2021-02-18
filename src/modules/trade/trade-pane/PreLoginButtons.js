import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import I18n from '../../../common/i18n/I18n';

const styles = theme => ({
  container: {
    width: '100%',
    textAlign: 'center'
  },
  button: {
    textTransform: 'none'
  },
  userLink: {
    color: theme.colors.textColor.blue,
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  preloginEntryHint: {
    color: theme.colors.textColor.formText,
    fontSize: '14px',
    margin: '8px'
  },
  dividerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  divider: {
    height: '2px',
    width: '33%',
    backgroundColor: theme.colors.background.divider
  },
  dividerText: {
    color: theme.colors.textColor.formText,
    width: '34%',
    textAlign: 'center',
    fontSize: '12px',
    margin: '8px 0'
  }
});

const PreLoginButtons = props => (
  <div className={props.classes.container}>
    <div className={props.classes.preloginEntryHint}>
      {I18n.translate('prelogin_order_entry_hint')}
    </div>
    <Button
      component={Link}
      to="/sign-up"
      className={props.classes.button}
      variant="contained"
      color="primary"
      fullWidth
    >
      {I18n.translate('login_create_account_label')}
    </Button>
    <div className={props.classes.dividerContainer}>
      <Divider className={props.classes.divider} />
      <div className={props.classes.dividerText}>
        {I18n.translate('landing_or_label')}
      </div>
      <Divider className={props.classes.divider} />
    </div>
    <Link className={props.classes.userLink} to="/login">
      {I18n.translate('login_submit_button')}
    </Link>
  </div>
);

export default withStyles(styles)(PreLoginButtons);

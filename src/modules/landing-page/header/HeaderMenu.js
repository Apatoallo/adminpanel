import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import I18n from '../../../common/i18n/I18n';
import { isUserLoggedIn } from '../../login/loginHelper';

const styles = theme => ({
  container: {
    marginTop: '35px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%'
  },
  navigationLink: {
    marginBottom: '30px',
    color: theme.colors.textColor.white,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center'
  },
  userLink: {
    marginBottom: '30px',
    color: theme.colors.textColor.blue,
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    textTransform: 'none',
    '@media screen and (max-width: 800px)': {
      width: '140px'
    },
    width: '150px',
    boxShadow: 'none',
    marginBottom: '440px'
  },
  divider: {
    opacity: '.5',
    marginBottom: '30px',
    width: '280px',
    marginRight: '16px',
    textAlign: 'center',
    borderBottom: '1px solid #67768f',
    lineHeight: '0.1em'
  }
});

const HeaderMenu = ({ classes }) => (
  <Hidden mdUp>
    <div className={classes.container}>
      <a
        className={classes.navigationLink}
        href="http://docs.bitexen.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {I18n.translate('landing_api_link')}
      </a>
      <Link className={classes.navigationLink} to="/help/fees" target="_top">
        {I18n.translate('landing_fees_link')}
      </Link>
      <a
        className={classes.navigationLink}
        href="https://support.bitexen.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {I18n.translate('landing_page_footer_support')}
      </a>
      <Link
        className={classes.navigationLink}
        to={
          !isUserLoggedIn()
            ? '/exen-coin-information'
            : '/account/exen-coin-information'
        }
      >
        {I18n.translate('general_exen')}
      </Link>
      {/* <Link className={classes.navigationLink} to="/competitions">
        {I18n.translate('header_competitions_title')}
      </Link> */}
      {/* <Link className={classes.navigationLink} to="/bulletin/market_notes/all">
        {I18n.translate('header_bulletin_title')}
      </Link> */}
      <Divider className={classes.divider} />
      {!isUserLoggedIn() && (
        <Link className={classes.userLink} to="/login">
          {I18n.translate('login_submit_button')}
        </Link>
      )}
      {!isUserLoggedIn() && (
        <Button
          component={Link}
          to="/sign-up"
          className={classes.button}
          variant="contained"
          color="primary"
        >
          {I18n.translate('login_create_account_label')}
        </Button>
      )}
    </div>
  </Hidden>
);

export default withStyles(styles)(HeaderMenu);

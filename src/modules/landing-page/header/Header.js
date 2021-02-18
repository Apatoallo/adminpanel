import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import classNames from 'classnames';
import { CloseIcon } from '../../../components/icons/Icons';
import { Link } from 'react-router-dom';
import logo_white from '../../../assets/logos/bitexen_logo_blue_white.png';
import I18n from '../../../common/i18n/I18n';
import HamburgerMenu from '../hamburger-menu/HamburgerMenu';
import { isUserLoggedIn } from '../../login/loginHelper';

const styles = theme => ({
  headerContainerStyle: {
    display: 'flex',
    width: '100%',
    height: '80px',
    top: '0',
    left: '0',
    justifyContent: 'center',
    zIndex: '1000'
  },
  headerStyle: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-between',
    width: '100%',
    marginLeft: '15px',
    marginRight: '15px',
    alignItems: 'center'
  },
  tradeViewMode: {
    '@media screen and (min-width: 1171px)': {
      width: '1170px',
      padding: '12px 0'
    }
  },
  logoStyle: {
    marginLeft: '2px'
  },
  linksContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    '@media screen and (max-width: 800px)': {
      paddingLeft: '20px'
    },
    paddingLeft: '40px'
  },
  navigationLinksContainer: {
    display: 'flex'
  },
  userLinksContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    minWidth: '250px'
  },
  navigationLink: {
    margin: '0 8px',
    '@media screen and (max-width: 800px)': {
      padding: '8px 4px'
    },
    padding: '8px 16px',
    color: theme.colors.textColor.white,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center'
  },
  userLink: {
    margin: '0 8px',
    padding: '8px 16px',
    color: theme.colors.textColor.blue,
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  flip: {
    transform: 'rotate(-180deg)',
    transition: 'transform 150ms'
  },
  fillColor: {
    fill: theme.colors.textColor.red
  },
  button: {
    textTransform: 'none',
    '@media screen and (max-width: 800px)': {
      width: '130px'
    },
    width: '150px',
    boxShadow: 'none'
  }
});

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state = {
      menuOpen: false
    };
  }

  toggleMenu = () => {
    if (this.props.onClick) {
      this.props.onClick(!this.state.menuOpen);
    }
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  render() {
    const { classes, tradeViewMode } = this.props;
    const { menuOpen } = this.state;
    return (
      <div className={classes.headerContainerStyle}>
        <div
          className={classNames(classes.headerStyle, {
            [classes.tradeViewMode]: tradeViewMode
          })}
        >
          <Link to="/">
            <img
              src={logo_white}
              width="150px"
              className={classes.logoStyle}
              alt="Bitexen logo"
            />
          </Link>
          <Hidden smDown>
            <div className={classes.linksContainer}>
              <div className={classes.navigationLinksContainer}>
                <a
                  className={classes.navigationLink}
                  href="http://docs.bitexen.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {I18n.translate('landing_api_link')}
                </a>
                <Link className={classes.navigationLink} to="/help/fees">
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
                {/* <Link
                  className={classes.navigationLink}
                  to="/bulletin/market_notes/all"
                >
                  {I18n.translate('header_bulletin_title')}
                </Link> */}
              </div>
              <div className={classes.userLinksContainer}>
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
            </div>
          </Hidden>
          <Hidden mdUp>
            <div onClick={this.toggleMenu}>
              {menuOpen ? (
                <CloseIcon size={30} fillColor={'#fff'} />
              ) : (
                <HamburgerMenu color={'#fff'} />
              )}
            </div>
          </Hidden>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Header);

import React from 'react';
import { findDOMNode } from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import Popover from '@material-ui/core/Popover';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import logo_white from '../../assets/logos/bitexen_logo_blue_white.png';
import I18n from '../../common/i18n/I18n';
import { isUserLoggedIn } from '../../modules/login/loginHelper';
import { DropdownIcon, AvatarIcon } from '../../components/icons/Icons';
import ConnectionStatusContainer from '../connection-status/ConnectionStatusContainer';

const styles = theme => ({
  headerContainerStyle: {
    display: 'flex',
    backgroundColor: theme.colors.background.header,
    width: '100%',
    height: '60px',
    position: 'fixed',
    top: '0',
    left: '0',
    justifyContent: 'center',
    zIndex: '1000',
    '@media screen and (max-width: 600px)': {
      width: '100vw'
    }
  },
  headerStyle: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-between',
    width: '1170px',
    boxSizing: 'border-box',
    alignItems: 'center',
    '@media screen and (max-width: 600px)': {
      width: '100vw',
      paddingLeft: '16px'
    }
  },
  logoStyle: {
    marginLeft: '2px'
  },
  switchContainerStyle: {
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  navigationLinksContainer: {
    position: 'absolute',
    left: '286px'
  },
  navigationLink: {
    margin: '0 8px',
    padding: '8px 16px',
    borderRadius: '40px',
    color: theme.colors.textColor.white,
    fontWeight: '500',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    '@media screen and (max-width: 1100px)': {
      margin: '0 5px',
      padding: '8px 10px'
    }
  },
  navigationPaddingRight: {
    paddingRight: '20px'
  },
  navigationLinkSelected: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  flip: {
    transform: 'rotate(-180deg)',
    transition: 'transform 150ms'
  },
  headerMenuContent: {
    borderTop: '2px solid rgba(255, 255, 255, 0.05)',
    boxSizing: 'border-box',
    paddingBottom: '16px'
  },
  headerMenuPaper: {
    backgroundColor: theme.colors.textColor.white05,
    borderRadius: '0 0 12px 12px',
    '@media screen and (max-width: 600px)': {
      width: '100vw !important',
      maxWidth: '100vw !important',
      left: '0 !important'
    }
  },
  popoverBaseOpen: {
    backgroundColor: theme.colors.background.headerMenuPopover
  },
  headerMenuPopoverBase: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '210px',
    maxWidth: '350px',
    justifyContent: 'space-between',
    paddingRight: '16px',
    paddingLeft: '16px',
    height: '60px',
    cursor: 'pointer',
    boxSizing: 'border-box',
    '&:hover': {
      backgroundColor: theme.colors.background.headerMenuPopover
    },
    '@media screen and (max-width: 600px)': {
      minWidth: 'auto'
    }
  },
  headerMenuPopoverStyle: {
    backgroundColor: theme.colors.background.headerMenuPopover,
    color: theme.colors.textColor.white,
    boxSizing: 'border-box'
  },
  switchRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '16px',
    paddingLeft: '24px'
  },
  menuLink: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.colors.textColor.white,
    lineHeight: '45px',
    fontSize: '16px',
    padding: '0 16px 0 24px',
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: theme.colors.background.headerMenuHover
    }
  },
  flexRow: {
    flexDirection: 'row'
  },
  welcomeText: {
    color: theme.colors.textColor.white,
    marginLeft: '14px'
  },
  firstName: {
    color: theme.colors.textColor.white,
    fontWeight: '700',
    marginLeft: '4px',
    '@media screen and (max-width: 600px)': {
      display: 'none'
    }
  },
  welcomeTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  dropdownIcon: {
    marginLeft: '24px'
  },
  divider: {
    margin: '0 12px 5px',
    height: '2px',
    backgroundColor: theme.colors.background.headerMenuDivider
  },
  hiddenMenuLinks: {
    '@media screen and (max-width: 920px)': {
      display: 'none'
    }
  },
  hiddenOnMobile: {
    '@media screen and (max-width: 600px)': {
      display: 'none'
    }
  },
  shownOnMobile: {
    '@media screen and (min-width: 601px)': {
      display: 'none'
    }
  },
  connectionStatusStyle: {
    marginRight: '10px'
  },
  newReleaseStyle: {
    fill: theme.colors.textColor.orange,
    width: '18px',
    height: '18px',
    marginLeft: '5px'
  },
  newRelease: {
    fontSize: '11px',
    background: '#ffb130',
    color: 'black',
    padding: '1px 4px',
    position: 'fixed',
    borderRadius: '5px',
    marginTop: '-9px'
  },
  newReleaseMobile: {
    display: 'flex',
    height: '15px',
    alignItems: 'center',
    color: 'black',
    padding: '1px 4px',
    fontSize: '11px',
    background: '#ffb130',
    borderRadius: '5px'
  }
});

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDarkTheme: props.currentThemeName === 'darkTheme',
      isVerticalView: props.currentTradeViewStyle === 'vertical',
      headerMenuNode: this.headerMenuPopoverBase,
      headerMenuAnchor: findDOMNode(this.headerMenuPopoverBase),
      headerMenuOpen: false
    };
  }

  componentWillReceiveProps = nextProps => {
    if (
      this.props.currentThemeName !== nextProps.currentThemeName ||
      this.props.currentTradeViewStyle !== nextProps.currentTradeViewStyle
    ) {
      this.setState({
        isDarkTheme: nextProps.currentThemeName === 'darkTheme',
        isVerticalView: nextProps.currentTradeViewStyle === 'vertical'
      });
    }
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.setState({ headerMenuOpen: false });
    }
  };

  headerMenuPopoverBase = null;

  handleThemeChange = (event, checked) => {
    this.props.changeTheme(checked ? 'darkTheme' : 'lightTheme');
  };

  verticalViewChange = (event, checked) => {
    this.props.changeTradeViewStyle(checked ? 'vertical' : 'horizontal');
  };

  logout = () => {
    this.toggleHeaderPopover();
    this.props.logoutAction();
  };

  toggleHeaderPopover = () => {
    this.setState({ headerMenuOpen: !this.state.headerMenuOpen });
  };

  setAnchor = node => {
    if (node && node !== this.state.headerMenuNode) {
      this.setState({
        headerMenuNode: node,
        headerMenuAnchor: findDOMNode(node)
      });
    }
  };

  render() {
    const { classes, preferences } = this.props;
    const rootUrl =
      preferences && preferences.advancedTradeView ? '/advanced' : '/';
    return (
      <div className={classes.headerContainerStyle}>
        <div className={classes.headerStyle}>
          <Link to={rootUrl}>
            <img
              src={logo_white}
              width="150px"
              className={classes.logoStyle}
              alt="Bitexen logo"
            />
          </Link>
          <div
            className={classNames(
              classes.navigationLinksContainer,
              classes.hiddenMenuLinks
            )}
          >
            <Link
              className={classNames(classes.navigationLink, {
                [classes.navigationLinkSelected]:
                  this.props.location.pathname === '/' ||
                  this.props.location.pathname === '/advanced'
              })}
              to={rootUrl}
            >
              {I18n.translate('general_trade')}
            </Link>

            <Link
              className={classNames(
                classes.navigationLink,
                classes.navigationPaddingRight,
                {
                  [classes.navigationLinkSelected]: this.props.location.pathname.startsWith(
                    '/instant/market'
                  )
                }
              )}
              onClick={() =>
                localStorage.setItem('isHideInstantTradeMenuItem', true)
              }
              to="/instant/market"
            >
              {I18n.translate('instant_trade_title')}

              {!localStorage.getItem('isHideInstantTradeMenuItem') && (
                <span className={classes.newRelease}>
                  {I18n.translate('new_release_label')}
                </span>
              )}
            </Link>

            <Link
              className={classNames(classes.navigationLink, {
                [classes.navigationLinkSelected]: this.props.location.pathname.startsWith(
                  '/account'
                )
              })}
              to="/account"
            >
              {I18n.translate('general_accounts')}
            </Link>
            {/* <Link
              className={classNames(classes.navigationLink, {
                [classes.navigationLinkSelected]: this.props.location.pathname.startsWith(
                  '/competitions'
                )
              })}
              to="/competitions"
            >
              {I18n.translate('header_competitions_title')}
            </Link> */}
            {/* <Link
              className={classes.navigationLink}
              to="/bulletin/market_notes/all"
            >
              {I18n.translate('header_bulletin_title')}
            </Link> */}
          </div>
          {isUserLoggedIn() && this.props.userInfo ? (
            <div>
              <div
                ref={node => this.setAnchor(node)}
                className={classNames(classes.headerMenuPopoverBase, {
                  [classes.popoverBaseOpen]: this.state.headerMenuOpen
                })}
                onClick={this.toggleHeaderPopover}
              >
                <div className={classes.welcomeTextContainer}>
                  <ConnectionStatusContainer
                    className={classes.connectionStatusStyle}
                  />
                  <AvatarIcon size="24" />
                  <div
                    className={classNames(
                      classes.welcomeText,
                      classes.hiddenOnMobile
                    )}
                  >
                    {I18n.translate('general_welcome_text')}
                  </div>
                  <div
                    className={classNames(
                      classes.firstName,
                      classes.hiddenOnMobile
                    )}
                  >
                    {this.props.userInfo.first_name}
                  </div>
                </div>
                <DropdownIcon
                  className={classNames(classes.dropdownIcon, {
                    [classes.flip]: this.state.headerMenuOpen
                  })}
                />
              </div>
              <Popover
                open={this.state.headerMenuOpen}
                anchorEl={this.state.headerMenuAnchor}
                anchorReference="anchorEl"
                onClose={this.toggleHeaderPopover}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                PaperProps={{
                  elevation: 1,
                  classes: { root: classes.headerMenuPaper },
                  style: {
                    width: this.state.headerMenuAnchor
                      ? this.state.headerMenuAnchor.offsetWidth
                      : 0
                  }
                }}
                transitionDuration={150}
              >
                <div className={classes.headerMenuPopoverStyle}>
                  <div className={classes.headerMenuContent}>
                    {/* <Link className={classes.menuLink} to="/exen/profile">
                      {I18n.translate('exen_menu_exen_profile')}
                    </Link> */}
                    <Link
                      className={classNames(
                        classes.menuLink,
                        classes.shownOnMobile
                      )}
                      to={rootUrl}
                    >
                      {I18n.translate('general_trade')}
                    </Link>

                    <Link
                      className={classNames(
                        classes.menuLink,
                        classes.shownOnMobile,
                        classes.flexRow
                      )}
                      onClick={() =>
                        localStorage.setItem('isHideInstantTradeMenuItem', true)
                      }
                      to="/instant/market"
                    >
                      {I18n.translate('instant_trade_title')}
                      {!localStorage.getItem('isHideInstantTradeMenuItem') && (
                        <span className={classes.newReleaseMobile}>
                          {I18n.translate('new_release_label')}
                        </span>
                      )}
                    </Link>

                    <Link
                      className={classNames(
                        classes.menuLink,
                        classes.shownOnMobile
                      )}
                      to="/account"
                    >
                      {I18n.translate('general_accounts')}
                    </Link>
                    <Link
                      className={classNames(
                        classes.menuLink,
                        classes.shownOnMobile
                      )}
                      to="/account/exen-coin-information"
                    >
                      {I18n.translate('general_exen')}
                    </Link>
                    {/* <Link
                      className={classNames(
                        classes.menuLink,
                        classes.shownOnMobile
                      )}
                      to="/competitions"
                    >
                      {I18n.translate('header_competitions_title')}
                    </Link> */}

                    {/* <Link className={classes.menuLink} to="/account/history">
                      {I18n.translate('menu_history_label')}
                    </Link> */}
                    <Link className={classes.menuLink} to="/settings">
                      {I18n.translate('general_settings')}
                    </Link>
                    <Divider className={classes.divider} />
                    {this.props.location.pathname !== '/advanced' && (
                      <div className={classes.switchRow}>
                        <div>{I18n.translate('general_theme_dark')}</div>
                        <Switch
                          disabled={
                            this.props.location.pathname === '/advanced'
                          }
                          color="primary"
                          checked={this.state.isDarkTheme}
                          onChange={this.handleThemeChange}
                          aria-label="darkTheme"
                        />
                      </div>
                    )}

                    {this.props.location.pathname !== '/advanced' && (
                      <div
                        className={classNames(
                          classes.switchRow,
                          classes.hiddenOnMobile
                        )}
                      >
                        <div>
                          {I18n.translate('general_viewstyle_vertical')}
                        </div>
                        <Switch
                          disabled={
                            this.props.location.pathname === '/advanced'
                          }
                          color="primary"
                          checked={this.state.isVerticalView}
                          onChange={this.verticalViewChange}
                          aria-label="verticalView"
                        />
                      </div>
                    )}

                    {this.props.location.pathname !== '/advanced' && (
                      <Divider className={classes.divider} />
                    )}

                    {/* <Link
                      className={classes.menuLink}
                      to="/bulletin/market_notes/all"
                    >
                      {I18n.translate('header_bulletin_title')}
                    </Link> */}
                    <Link
                      className={classes.menuLink}
                      to="/help/fees"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {I18n.translate('landing_fees_link')}
                    </Link>
                    <Link
                      className={classes.menuLink}
                      to="/help/limits"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {I18n.translate('landing_limits_link')}
                    </Link>
                    <a
                      className={classes.menuLink}
                      href="http://docs.bitexen.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {I18n.translate('landing_page_footer_api')}
                    </a>
                    <a
                      className={classes.menuLink}
                      href="https://support.bitexen.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {I18n.translate('landing_page_footer_support')}
                    </a>
                    <Divider className={classes.divider} />
                    <div className={classes.menuLink} onClick={this.logout}>
                      {I18n.translate('menu_logout_label')}
                    </div>
                  </div>
                </div>
              </Popover>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Header);

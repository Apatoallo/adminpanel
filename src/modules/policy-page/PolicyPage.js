import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Header from './../landing-page/header/Header';
import { Link, withRouter } from 'react-router-dom';
import { MenuArrow } from '../../components/icons/Icons';
import socketHelper from '../../api/socketHelper';
import DocumentTitle from 'react-document-title';
import HeaderMenu from './../landing-page/header/HeaderMenu';
import Footer from './../landing-page/footer/Footer';
import I18n from '../../common/i18n/I18n';
import StyledPaper from '../../components/common/StyledPaper';
import classNames from 'classnames';
import FeesContainer from './FeesContainer';
import AboutUs from './AboutUs';
import Limits from './Limits';

const styles = theme => ({
  root: {
    backgroundColor: '#304262',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '@media screen and (max-width: 600px)': {
      paddingLeft: '16px'
    },
    '@media screen and (min-width: 801px)': {
      paddingLeft: '60px'
    },
    '@media screen and (min-width: 1280px)': {
      paddingLeft: '118px'
    },
    padding: '10px 0 10px 16px'
  },
  grid: {
    display: 'flex',
    width: '100%',
    minHeight: '630px',
    flexDirection: 'row',
    '@media screen and (min-width: 1280px)': {
      margin: '0 118px'
    },
    '@media screen and (min-width: 801px) and (max-width: 1279px)': {
      margin: '0 60px'
    },
    '@media screen and (min-width: 601px) and (max-width: 800px)': {
      margin: '0 12px'
    },
    '@media screen and (max-width: 600px)': {
      flexDirection: 'column-reverse'
    }
  },
  leftGrid: {
    '@media screen and (min-width: 1280px)': {
      width: '300px'
    },
    '@media screen and (min-width: 801px) and (max-width: 1279px)': {
      width: '250px'
    },
    '@media screen and (min-width: 601px) and (max-width: 800px)': {
      width: '200px'
    },
    '@media screen and (max-width: 600px)': {
      width: '100%'
    }
  },
  rightGrid: {
    marginLeft: '24px',
    '@media screen and (min-width: 1280px)': {
      width: 'calc(100% - 300px)'
    },
    '@media screen and (min-width: 801px) and (max-width: 1279px)': {
      width: 'calc(100% - 250px)'
    },
    '@media screen and (min-width: 601px) and (max-width: 800px)': {
      width: 'calc(100% - 200px)'
    },
    '@media screen and (max-width: 600px)': {
      display: 'block',
      width: '100%',
      margin: '0 0 24px'
    }
  },
  menuItems: {
    padding: '10px 0'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    boxSizing: 'border-box'
  },
  rightContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    boxSizing: 'border-box',
    padding: '16px',
    color: 'rgba(48, 66, 98, 0.87)'
  },
  divider: {
    height: '2px',
    margin: '9px 0',
    backgroundColor: '#f0f0f0'
  },
  link: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'rgba(48, 66, 98, 0.87)',
    cursor: 'pointer',
    padding: '9px 10.5px 9px 16px',
    boxSizing: 'border-box',
    fontSize: '16px',
    textDecoration: 'none'
  },
  linkSelected: {
    color: '#3ab2ee',
    fontWeight: '500'
  },
  icon: {
    stroke: '#4b5a76'
  },
  iconSelected: {
    stroke: '#3ab2ee'
  },
  content: {
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px 0',
    '@media screen and (max-width: 600px)': {
      paddingLeft: '16px',
      paddingRight: '16px'
    }
  }
});

class PolicyPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggleView = this.toggleView.bind(this);

    this.state = {
      showMenu: false
    };
  }

  help_links = [
    '/help/aml-policy',
    '/help/contact-us',
    '/help/kvk',
    '/help/kyc-policy',
    '/help/user-agreement'
  ];

  default_url = '/help/user-agreement';

  componentDidMount() {
    socketHelper.subscribeToTickers();
  }

  componentWillUnmount() {
    socketHelper.unsubscribeFromTickers();
  }

  toggleView(open) {
    this.setState({ showMenu: open });
  }

  render() {
    const { showMenu } = this.state;
    const { classes, tickers, location } = this.props;

    return (
      <DocumentTitle
        title={
          tickers && tickers.length > 0 && tickers[0]
            ? `(${tickers[0].last_price} ${
                tickers[0].market.counter_currency_code
              }) ${I18n.translate('site_title')}`
            : I18n.translate('site_title')
        }
      >
        <div>
          <div className={classes.root}>
            <Header onClick={this.toggleView} />
            {showMenu && <HeaderMenu />}
          </div>
          <div className={classes.content}>
            <div className={classes.grid}>
              <div className={classes.leftGrid}>
                <StyledPaper className={classes.container}>
                  <div className={classes.menuItems}>
                    <div>
                      <Link
                        onClick={() => window.scrollTo(0, 0)}
                        className={classNames(classes.link, {
                          [classes.linkSelected]:
                            location.pathname === '/help/user-agreement'
                        })}
                        to="/help/user-agreement"
                      >
                        {I18n.translate('landing_page_footer_user_aggr')}
                        <MenuArrow
                          className={classNames(classes.icon, {
                            [classes.iconSelected]:
                              location.pathname === '/help/user-agreement'
                          })}
                        />
                      </Link>
                      <Link
                        onClick={() => window.scrollTo(0, 0)}
                        className={classNames(classes.link, {
                          [classes.linkSelected]:
                            location.pathname === '/help/aml-policy'
                        })}
                        to="/help/aml-policy"
                      >
                        {I18n.translate('landing_page_footer_aml')}
                        <MenuArrow
                          className={classNames(classes.icon, {
                            [classes.iconSelected]:
                              location.pathname === '/help/aml-policy'
                          })}
                        />
                      </Link>
                      <Link
                        onClick={() => window.scrollTo(0, 0)}
                        className={classNames(classes.link, {
                          [classes.linkSelected]:
                            location.pathname === '/help/kyc-policy'
                        })}
                        to="/help/kyc-policy"
                      >
                        {I18n.translate('landing_page_footer_kyc')}
                        <MenuArrow
                          className={classNames(classes.icon, {
                            [classes.iconSelected]:
                              location.pathname === '/help/kyc-policy'
                          })}
                        />
                      </Link>
                      <Link
                        onClick={() => window.scrollTo(0, 0)}
                        className={classNames(classes.link, {
                          [classes.linkSelected]:
                            location.pathname === '/help/kvk'
                        })}
                        to="/help/kvk"
                      >
                        {I18n.translate('landing_page_footer_data_protection')}
                        <MenuArrow
                          className={classNames(classes.icon, {
                            [classes.iconSelected]:
                              location.pathname === '/help/kvk'
                          })}
                        />
                      </Link>
                      <Divider className={classes.divider} />
                      <Link
                        onClick={() => window.scrollTo(0, 0)}
                        className={classNames(classes.link, {
                          [classes.linkSelected]:
                            location.pathname === '/help/about-us'
                        })}
                        to="/help/about-us"
                      >
                        {I18n.translate('landing_page_footer_who_we_are')}
                        <MenuArrow
                          className={classNames(classes.icon, {
                            [classes.iconSelected]:
                              location.pathname === '/help/about-us'
                          })}
                        />
                      </Link>
                      <Link
                        onClick={() => window.scrollTo(0, 0)}
                        className={classNames(classes.link, {
                          [classes.linkSelected]:
                            location.pathname === '/help/fees'
                        })}
                        to="/help/fees"
                      >
                        {I18n.translate('landing_page_footer_fees')}
                        <MenuArrow
                          className={classNames(classes.icon, {
                            [classes.iconSelected]:
                              location.pathname === '/help/fees'
                          })}
                        />
                      </Link>
                      <Link
                        onClick={() => window.scrollTo(0, 0)}
                        className={classNames(classes.link, {
                          [classes.linkSelected]:
                            location.pathname === '/help/limits'
                        })}
                        to="/help/limits"
                      >
                        {I18n.translate('landing_page_footer_limits')}
                        <MenuArrow
                          className={classNames(classes.icon, {
                            [classes.iconSelected]:
                              location.pathname === '/help/limits'
                          })}
                        />
                      </Link>

                      <Divider className={classes.divider} />
                      <a
                        onClick={() => window.scrollTo(0, 0)}
                        className={classes.link}
                        href="http://docs.bitexen.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {I18n.translate('landing_page_footer_api')}
                        <MenuArrow className={classes.icon} />
                      </a>
                      <Divider className={classes.divider} />
                      <Link
                        onClick={() => window.scrollTo(0, 0)}
                        className={classNames(classes.link, {
                          [classes.linkSelected]:
                            location.pathname === '/help/contact-us'
                        })}
                        to="/help/contact-us"
                      >
                        {I18n.translate('landing_page_footer_contact_us')}
                        <MenuArrow
                          className={classNames(classes.icon, {
                            [classes.iconSelected]:
                              location.pathname === '/help/contact-us'
                          })}
                        />
                      </Link>
                      <a
                        onClick={() => window.scrollTo(0, 0)}
                        className={classes.link}
                        href="https://support.bitexen.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {I18n.translate('landing_page_footer_support')}
                        <MenuArrow
                          className={classNames(classes.icon, {
                            [classes.iconSelected]:
                              location.pathname === '/help/support'
                          })}
                        />
                      </a>
                    </div>
                  </div>
                </StyledPaper>
              </div>
              <div className={classes.rightGrid}>
                {location.pathname.startsWith('/help/fees') ? (
                  <FeesContainer />
                ) : location.pathname.startsWith('/help/about-us') ? (
                  <AboutUs />
                ) : location.pathname.startsWith('/help/limits') ? (
                  <Limits />
                ) : (
                  <StyledPaper className={classes.rightContainer}>
                    <iframe
                      title={'content'}
                      src={`${
                        this.help_links.includes(location.pathname)
                          ? location.pathname
                          : this.default_url
                      }.html`}
                      height="700px"
                      style={{
                        border: 'none',
                        fontFamily: 'Roboto',
                        margin: '0'
                      }}
                    />
                  </StyledPaper>
                )}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}

export default withRouter(withStyles(styles)(PolicyPage));

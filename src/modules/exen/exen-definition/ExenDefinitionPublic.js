import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from './../../landing-page/header/Header';
import { Link, withRouter } from 'react-router-dom';
import { MenuArrow } from '../../../components/icons/Icons';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import socketHelper from '../../../api/socketHelper';
import DocumentTitle from 'react-document-title';
import HeaderMenu from '../../landing-page/header/HeaderMenu';
import Footer from '../../landing-page/footer/Footer';
import I18n from '../../../common/i18n/I18n';
import StyledPaper from '../../../components/common/StyledPaper';
import classNames from 'classnames';
import ExenStatsContainer from '../exen-stats/ExenStatsContainer';
import lightTheme from '../../../common/theme/lightTheme';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

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
  rightContainerInfoArea: {
    marginBottom: '24px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    boxSizing: 'border-box',
    color: 'rgba(48, 66, 98, 0.87)'
  },
  hyperLink: {
    color: theme.colors.textColor.blue,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
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

class ExenDefinitionPublic extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggleView = this.toggleView.bind(this);

    this.state = {
      showMenu: false
    };
  }

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
                            location.pathname === '/exen-coin-information'
                        })}
                        to="/exen-coin-information"
                      >
                        {I18n.translate('exen_menu_exen_infographic')}
                        <MenuArrow
                          className={classNames(classes.icon, {
                            [classes.iconSelected]:
                              location.pathname === '/exen-coin-information'
                          })}
                        />
                      </Link>
                      <Link
                        onClick={() => window.scrollTo(0, 0)}
                        className={classNames(classes.link, {
                          [classes.linkSelected]:
                            location.pathname === '/exen-stats'
                        })}
                        to="/exen-stats"
                      >
                        {I18n.translate('exen_menu_exen_stats')}
                        <MenuArrow
                          className={classNames(classes.icon, {
                            [classes.iconSelected]:
                              location.pathname === '/exen-stats'
                          })}
                        />
                      </Link>
                    </div>
                  </div>
                </StyledPaper>
              </div>
              <div className={classes.rightGrid}>
                {location.pathname.startsWith('/exen-stats') ? (
                  <MuiThemeProvider theme={createMuiTheme(lightTheme)}>
                    <ExenStatsContainer />
                  </MuiThemeProvider>
                ) : (
                  <div>
                    <StyledPaper className={classes.rightContainerInfoArea}>
                      <ul className="mt-3">
                        <li>
                          <a
                            className={classes.hyperLink}
                            href="/resources/exen-whitepaper.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            White Paper (PDF)
                          </a>
                        </li>
                      </ul>
                    </StyledPaper>
                  </div>
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

export default withRouter(withStyles(styles)(ExenDefinitionPublic));

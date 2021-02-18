import React from 'react';
import Divider from '@material-ui/core/Divider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withStyles } from '@material-ui/core/styles';
import siteView from '../../assets/images/bg.jpg';
import AttachMoney from '@material-ui/icons/AttachMoney';
import DateRange from '@material-ui/icons/DateRange';
import Header from './../landing-page/header/Header';
import { Link, withRouter } from 'react-router-dom';
import { MenuArrow } from '../../components/icons/Icons';
import HeaderMenu from '../landing-page/header/HeaderMenu';
import Footer from '../landing-page/footer/Footer';
import I18n from '../../common/i18n/I18n';
import StyledPaper from '../../components/common/StyledPaper';
import classNames from 'classnames';
import moment from 'moment/moment';
import Carousel from '../../components/carousel/Carousel';
import Award from '../competition/Award';
import lightTheme from '../../common/theme/lightTheme';
import DocumentTitle from 'react-document-title';
import LeaderboardLine from './LeaderboardLine';
import LeaderboardHeader from './LeaderboardHeader';
import ProgressBar from './ProgressBar';
import FlipMove from 'react-flip-move';

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
  container1: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    boxSizing: 'border-box'
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
  },
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  siteView: {
    backgroundImage: `url(${siteView})`,
    backgroundSize: 'cover',
    height: '232px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  card: {
    backgroundColor: 'white',
    padding: '0 15px 15px 15px',
    textAlign: 'center',
    borderRadius: '0'
  },
  detailArea: {
    backgroundColor: theme.colors.background.white87
  },
  title: {
    color: theme.colors.textColor.blue,
    fontWeight: '700',
    fontSize: '16px',
    marginBottom: '16px',
    marginTop: '24px'
  },
  description: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.87)',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '@media screen and (max-width: 600px)': {
      flexDirection: 'column'
    }
  },
  rules: {
    textAlign: 'justify',
    paddingRight: '24px',
    flexDirection: 'column',
    fontSize: '15px',
    color: '#4b5a76',
    marginBottom: '16px',
    display: 'flex',
    lineHeight: '1.3em'
  },
  totalAwardArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    color: '#4b5a76',
    marginBottom: '16px',
    marginTop: '24px'
  },
  userVolumeArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    fontSize: '13px',
    color: theme.colors.textColor.menuItem,
    margin: '0 178px 16px',
    '@media screen and (max-width: 1500px)': {
      margin: '0 16px 16px',
      padding: '0'
    },
    padding: '0'
  },
  awardsArea: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '20px',
    marginBottom: '24px',
    '@media screen and (max-width: 600px)': {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      justifyContent: 'space-around'
    }
  },
  attachMoneyStyle: {
    fill: '#4b5a76',
    width: '20px',
    height: '20px'
  },
  refreshIconStyle: {
    fill: theme.colors.textColor.blue,
    width: '20px',
    height: '20px',
    cursor: 'pointer'
  },
  dateRangeStyle: {
    fill: 'rgba(255, 255, 255, 0.87)',
    width: '20px',
    height: '20px',
    marginRight: '5px'
  },
  divider: {
    height: '1px',
    backgroundColor: '#f0f0f0',
    margin: '12px 16px'
  },
  table: {
    margin: '0 178px 16px',
    border: 'solid 2px #f0f0f0',
    '@media screen and (max-width: 1500px)': {
      overflowX: 'auto',
      margin: '0 16px 16px'
    }
  },
  progressBar: {
    marginTop: '3px',
    flexGrow: 1,
    width: '100%'
  }
});

class CompetitionsPublic extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggleView = this.toggleView.bind(this);
    this.state = {
      cycle: 0,
      showMenu: false,
      disableAnimations: false
    };
  }

  componentDidMount() {
    this.getCompetitionPublic(-1);
  }

  refresh = () => {
    const { cycle } = this.state;
    this.props.getCompetitionPublic(this.props.competition.current_index);
    this.setState({ cycle: cycle + 1 });
  };

  previousCompetition = () => {
    const index = parseInt(this.props.competition.current_index, 10);
    this.getCompetitionPublic(index - 1);
  };

  nextCompetition = () => {
    const index = parseInt(this.props.competition.current_index, 10);
    this.getCompetitionPublic(index + 1);
  };

  getCompetitionPublic = id => {
    this.setState({ disableAnimations: true });
    this.props
      .getCompetitionPublic(id)
      .then(res => {
        this.setState({ disableAnimations: false });
      })
      .catch(() => {
        this.setState({ disableAnimations: false });
      });
  };

  renderLines() {
    return this.props.competition.leader_board.map(line => (
      <LeaderboardLine key={line.k} {...line} cycle={this.state.cycle} />
    ));
  }

  toggleView(open) {
    this.setState({ showMenu: open });
  }

  render() {
    const { showMenu, disableAnimations } = this.state;
    const { classes, tickers, location, competition } = this.props;
    const awards = competition
      ? competition.awards.layout
        ? competition.awards.layout.awards
        : competition.awards.awards
      : [];
    const descriptions =
      competition && competition.awards.layout
        ? competition.awards.layout.description
        : [];

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
        <MuiThemeProvider theme={createMuiTheme(lightTheme)}>
          <div>
            <div className={classes.root}>
              <Header onClick={this.toggleView} />
              {showMenu && <HeaderMenu />}
            </div>
            <div className={classes.content}>
              <div className={classes.grid}>
                <div className={classes.leftGrid}>
                  <StyledPaper className={classes.container1}>
                    <div className={classes.menuItems}>
                      <div>
                        <Link
                          onClick={() => window.scrollTo(0, 0)}
                          className={classNames(classes.link, {
                            [classes.linkSelected]:
                              location.pathname === '/competitions'
                          })}
                          to="/competitions"
                        >
                          {I18n.translate('header_competitions_title')}
                          <MenuArrow
                            className={classNames(classes.icon, {
                              [classes.iconSelected]:
                                location.pathname === '/competitions'
                            })}
                          />
                        </Link>
                        <a
                          className={classes.link}
                          href="https://destek.bitexen.com/hc/tr/articles/360015871752"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {I18n.translate('competition_rules_link')}
                          <MenuArrow className={classes.icon} />
                        </a>
                      </div>
                    </div>
                  </StyledPaper>
                </div>
                <div className={classes.rightGrid}>
                  {competition ? (
                    <Carousel
                      narrowContent={false}
                      className={classes.container}
                      showLeft={competition.current_index > 0}
                      showRight={competition.has_next}
                      onLeft={() => this.previousCompetition()}
                      onRight={() => this.nextCompetition()}
                    >
                      <div className={classes.siteView}>
                        <div className={classes.title}>
                          {competition.header_text} (
                          {I18n.translate(
                            'competition_status_' + competition.status
                          )}
                          )
                        </div>
                        <div className={classes.description}>
                          <div>{competition.description}</div>
                        </div>
                        <div className={classes.description}>
                          <DateRange className={classes.dateRangeStyle} />
                          <div>
                            {moment(competition.start_date).format(
                              'DD.MM.YYYY HH:mm'
                            )}
                            <span> - </span>
                            {moment(competition.end_date).format(
                              'DD.MM.YYYY HH:mm'
                            )}
                          </div>
                        </div>
                      </div>
                      <StyledPaper className={classes.card}>
                        <div className={classes.totalAwardArea}>
                          <AttachMoney className={classes.attachMoneyStyle} />
                          <div>
                            {I18n.translate('competition_total_award_label') +
                              ' '}
                            {competition.awards.total_award} EXEN
                          </div>
                        </div>
                        <div className={classes.awardsArea}>
                          {awards.map((award, index) => (
                            <Award award={award} index={index} key={index} />
                          ))}
                        </div>
                        <ul className={classes.rules}>
                          {descriptions.map((desc, index) => (
                            <li key={index}>
                              {I18n.language === 'EN' ? desc.en : desc.tr}
                            </li>
                          ))}
                        </ul>
                        <Divider className={classes.divider} />
                        <div className={classes.title}>
                          {I18n.translate('competition_leaderboard_title')}
                        </div>
                        <div className={classes.userVolumeArea}>
                          {competition.status === 'R' && (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  color: '#4b5a76'
                                }}
                              >
                                <div>
                                  {I18n.translate(
                                    'exen_competition_last_update_time'
                                  )}{' '}
                                  {moment(competition.timestamp).format(
                                    'DD-MM-YYYY HH:mm:ss'
                                  )}
                                </div>
                              </div>
                              <div className={classes.progressBar}>
                                <ProgressBar onCompleted={this.refresh} />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className={classes.table}>
                          <LeaderboardHeader />
                          <FlipMove
                            disableAllAnimations={disableAnimations}
                            duration={700}
                            delay={100}
                            easing={`cubic-bezier(${[
                              '0',
                              '0',
                              '1.0',
                              '1.0'
                            ].join(',')})`}
                          >
                            {this.renderLines()}
                          </FlipMove>
                        </div>
                      </StyledPaper>
                    </Carousel>
                  ) : null}
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </MuiThemeProvider>
      </DocumentTitle>
    );
  }
}

export default withRouter(withStyles(styles)(CompetitionsPublic));

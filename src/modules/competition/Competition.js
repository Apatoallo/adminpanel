import React from 'react';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import Carousel from '../../components/carousel/Carousel';
import siteView from '../../assets/images/bg.jpg';
import StyledPaper from '../../components/common/StyledPaper';
import I18n from '../../common/i18n/I18n';
import AttachMoney from '@material-ui/icons/AttachMoney';
import DateRange from '@material-ui/icons/DateRange';
import moment from 'moment/moment';
import Award from './Award';
import FlipMove from 'react-flip-move';
import LeaderboardLine from './LeaderboardLine';
import LeaderboardHeader from './LeaderboardHeader';
import ProgressBar from './ProgressBar';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.unit.margin
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
    background: theme.colors.background.paper,
    padding: '0 15px 15px 15px',
    textAlign: 'center',
    borderRadius: '0'
  },
  detailArea: {
    background: theme.colors.background.white87
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
    color: theme.colors.textColor.menuItem,
    marginBottom: '16px',
    display: 'flex',
    lineHeight: '20px'
  },
  totalAwardArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    color: theme.colors.textColor.menuItem,
    marginBottom: '16px',
    marginTop: '24px'
  },
  userVolumeArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    fontSize: '13px',
    color: theme.colors.textColor.menuItem,
    marginBottom: '6px',
    padding: '0 16px'
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
    fill: theme.colors.textColor.menuItem,
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
    backgroundColor: theme.colors.background.divider,
    margin: '12px 16px'
  },
  table: {
    margin: '0 16px 16px',
    border: theme.colors.borderColor.rowSeperatorBorder,
    '@media screen and (max-width: 600px)': {
      overflowX: 'auto'
    }
  },
  progressBar: {
    marginTop: '3px',
    flexGrow: 1,
    width: '100%'
  }
});

class Competition extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cycle: 0,
      disableAnimations: false
    };
  }

  componentDidMount() {
    this.getCompetition(-1);
  }

  refresh = () => {
    const { cycle } = this.state;
    this.props.getCompetition(this.props.competition.current_index);
    this.setState({ cycle: cycle + 1 });
  };

  previousCompetition = () => {
    const index = parseInt(this.props.competition.current_index, 10);
    this.getCompetition(index - 1);
  };

  nextCompetition = () => {
    const index = parseInt(this.props.competition.current_index, 10);
    this.getCompetition(index + 1);
  };

  getCompetition = id => {
    this.setState({ disableAnimations: true });
    this.props
      .getCompetition(id)
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

  render() {
    const { classes, competition } = this.props;
    const { disableAnimations } = this.state;
    const awards = competition
      ? competition.awards.layout
        ? competition.awards.layout.awards
        : competition.awards.awards
      : [];
    const descriptions =
      competition && competition.awards.layout
        ? competition.awards.layout.description
        : [];
    return competition ? (
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
            {I18n.translate('competition_status_' + competition.status)})
          </div>
          <div className={classes.description}>
            <div>{competition.description}</div>
          </div>
          <div className={classes.description}>
            <DateRange className={classes.dateRangeStyle} />
            <div>
              {moment(competition.start_date).format('DD.MM.YYYY HH:mm')}
              <span> - </span>
              {moment(competition.end_date).format('DD.MM.YYYY HH:mm')}
            </div>
          </div>
        </div>
        <StyledPaper className={classes.card}>
          <div className={classes.totalAwardArea}>
            <AttachMoney className={classes.attachMoneyStyle} />
            <div>
              {I18n.translate('competition_total_award_label') + ' '}
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
              <li key={competition.competition_id + '-' + index}>
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
                    alignItems: 'center'
                  }}
                >
                  <div>
                    {I18n.translate('exen_competition_last_update_time')}{' '}
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
              easing={`cubic-bezier(${['0', '0', '1.0', '1.0'].join(',')})`}
            >
              {this.renderLines()}
            </FlipMove>
          </div>
        </StyledPaper>
      </Carousel>
    ) : null;
  }
}

export default withStyles(styles)(Competition);

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import I18n from '../../common/i18n/I18n';

const styles = theme => ({
  leaderboardLine: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.colors.background.leaderboardLine,
    margin: '8px',
    justifyContent: 'space-between',
    padding: '6px 8px',
    alignItems: 'center',
    color: theme.colors.textColor.menuItem,
    '@media screen and (max-width: 600px)': {
      alignItems: 'flex-start',
      flexDirection: 'column'
    }
  },
  selfLine: {
    paddingLeft: '5px',
    borderLeft: '#3ad09f 3px solid;'
  },
  leftPart: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
    justifyContent: 'flex-start',
    '@media screen and (max-width: 600px)': {
      width: 'auto'
    }
  },
  rightPart: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    justifyContent: 'space-between',
    '@media screen and (max-width: 600px)': {
      width: 'auto',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: '32px',
      marginTop: '7px'
    }
  },
  rankStyle: {
    alignItems: 'center',
    display: 'flex',
    fontSize: '15px',
    fontWeight: '500',
    width: '35px',
    justifyContent: 'space-between',
    '@media screen and (max-width: 600px)': {
      width: '15px'
    }
  },
  usernameStyle: {
    marginLeft: '16px',
    fontSize: '15px'
  },
  awardStyle: {
    width: '140px',
    textAlign: 'end',
    fontSize: '15px',
    '@media screen and (max-width: 600px)': {
      width: 'auto',
      marginBottom: '7px',
      '&:before': {
        content: `'${I18n.translate('competition_award_title')}'`,
        fontWeight: '500'
      }
    }
  },
  volumeStyle: {
    width: '156px',
    textAlign: 'end',
    fontSize: '15px',
    '@media screen and (max-width: 600px)': {
      width: 'auto',
      '&:before': {
        content: `'${I18n.translate('competition_volume_title')}'`,
        fontWeight: '500'
      }
    }
  },
  iconStyle: {
    padding: '0px',
    margin: '0px'
  },
  call_received: {
    color: 'rgb(248, 121, 121)',
    fontSize: '15px',
    fontWeight: '600'
  },
  call_made: {
    color: 'rgb(58, 208, 159)',
    fontSize: '15px',
    fontWeight: '600'
  },
  trending_flat: {
    color: theme.colors.textColor.tableHeader,
    fontSize: '15px',
    fontWeight: '600'
  },
  highlightStyle: {
    animationName: 'whiteGreenWhite',
    animationDuration: '5s'
  }
});
class LeaderBoardLine extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      trending: '',
      highlight: false
    };
  }

  componentWillReceiveProps(nextProps) {
    let oldRank = this.props.rank;
    let newRank = nextProps.rank;

    let trending = '';
    if (oldRank > newRank) trending = 'call_made';
    if (oldRank < newRank) trending = 'call_received';
    if (
      oldRank !== newRank ||
      (this.state.trending !== '' && this.props.cycle !== nextProps.cycle)
    ) {
      this.setState({
        trending,
        highlight:
          this.props.base_currency_volume !== nextProps.base_currency_volume
      });
    } else {
      this.setState({
        highlight:
          this.props.base_currency_volume !== nextProps.base_currency_volume
      });
    }
  }

  render() {
    const {
      rank,
      self,
      masked_username,
      dummy,
      award,
      base_currency_volume,
      base_currency,
      classes
    } = this.props;
    const { trending, highlight } = this.state;
    return (
      <div
        className={classNames(classes.leaderboardLine, {
          [classes.selfLine]: self
        })}
      >
        <div className={classes.leftPart}>
          <div className={classes.rankStyle}>
            <div>{rank}</div>
            {trending &&
              !masked_username.startsWith('--') && (
                <IconButton className={classes.iconStyle}>
                  <Icon className={classes[trending]}>{trending}</Icon>
                </IconButton>
              )}
          </div>
          <div className={classes.usernameStyle}>{masked_username}</div>
        </div>
        <div className={classes.rightPart}>
          <div className={classes.awardStyle}>
            {dummy ? award : award + ' EXEN'}
          </div>
          <div
            className={classNames(classes.volumeStyle, {
              [classes.highlightStyle]: highlight
            })}
          >
            {base_currency_volume + ' ' + base_currency}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LeaderBoardLine);

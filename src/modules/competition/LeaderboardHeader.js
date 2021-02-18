import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import I18n from '../../common/i18n/I18n';

const styles = theme => ({
  leaderboardLine: {
    display: 'flex',
    flexDirection: 'row',
    margin: '8px 8px 10px 8px',
    justifyContent: 'space-between',
    padding: '0px 2px',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: '500',
    color: theme.colors.textColor.menuItem,
    '@media screen and (max-width: 600px)': {
      display: 'none'
    }
  },
  leftPart: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
    justifyContent: 'flex-start'
  },
  rightPart: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    justifyContent: 'space-between'
  },
  rankStyle: {
    width: '56px',
    textAlign: 'start'
  },
  awardStyle: {
    width: '142px',
    textAlign: 'end'
  },
  volumeStyle: {
    width: '156px',
    textAlign: 'end'
  }
});

const LeaderBoardHeader = ({ classes }) => (
  <div className={classes.leaderboardLine}>
    <div className={classes.leftPart}>
      <div className={classes.rankStyle}>
        {I18n.translate('competitions_rank_label')}
      </div>
      <div>{I18n.translate('settings_user_email')}</div>
    </div>
    <div className={classes.rightPart}>
      <div className={classes.awardStyle}>
        {I18n.translate('competition_award_label')}
      </div>
      <div className={classes.volumeStyle}>
        {I18n.translate('competitions_rank_volume')}
      </div>
    </div>
  </div>
);

export default withStyles(styles)(LeaderBoardHeader);

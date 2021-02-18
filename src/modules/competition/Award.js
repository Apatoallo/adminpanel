import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Star from '@material-ui/icons/Star';
import I18n from '../../common/i18n/I18n';

const styles = theme => ({
  circle: {
    backgroundColor: theme.colors.background.contrastRow,
    border: theme.colors.borderColor.dashedBorder,
    height: '110px',
    borderRadius: '30%',
    width: '110px',
    display: 'flex',
    fontSize: '20px',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    '@media screen and (max-width: 600px)': {
      marginBottom: '16px'
    }
  },
  awardRange: {
    color: theme.colors.textColor.blue,
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 10px'
  },
  awardRangeSmall: {
    fontSize: '14px',
    fontWeight: 'normal',
    wordWrap: 'break-word',
    whiteSpace: 'pre-line'
  },
  awardCurrency: {
    color: theme.colors.textColor.blue,
    fontSize: '16px'
  },
  awardAmount: {
    color: theme.colors.textColor.menuItem,
    fontSize: '16px'
  },
  awardRankCondition: {
    color: theme.colors.textColor.blue,
    fontWeight: '600'
  },
  starStyle: {
    fill: theme.colors.textColor.orange,
    width: '18px',
    height: '18px'
  }
});

const Award = ({ award, index, classes }) => {
  return (
    <div className={classes.circle} key={index}>
      <div
        className={classNames(classes.awardRange, {
          [classes.awardRangeSmall]:
            award.type === 'special' || award.type === 'interval'
        })}
      >
        {award.type === 'fixed' && <Star className={classes.starStyle} />}
        <div className={classes.awardRankCondition}>
          {I18n.language === 'EN' ? award.text_en : award.text_tr}
        </div>
      </div>
      <div>
        <div className={classes.awardAmount}>{award.award}</div>
        <div className={classes.awardCurrency}>EXEN</div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Award);

import React from 'react';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
  leaderBoardPaper: {
    width: '250px',
    height: '60px',
    margin: '8px',
    border: theme.colors.borderColor.thinBorder,
    display: 'flex',
    flexDirection: 'row',
    color: theme.colors.textColor.input,
    borderRadius: '5px'
  },
  rank: {
    textAlign: 'center',
    lineHeight: '60px',
    width: '40px',
    fontSize: '32px',
    fontWeight: '700',
    borderRight: theme.colors.borderColor.dashedBorder
  },
  detail: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  name: {
    marginLeft: '12px',
    fontSize: '14px',
    lineHeight: '29px',
    color: theme.colors.textColor.tableHeader
  },
  earning: {
    marginLeft: '12px',
    fontSize: '14px',
    fontWeight: '700',
    lineHeight: '29px'
  },
  divider: {
    height: '2px',
    backgroundColor: theme.colors.background.divider
  },
  blue: {
    color: theme.colors.textColor.blue
  },
  orange: {
    color: theme.colors.textColor.orange
  }
});

const LeaderBoardCard = props => (
  <div className={props.classes.leaderBoardPaper}>
    <div className={classNames(props.classes.rank, props.classes[props.color])}>
      {props.rank}
    </div>
    <div className={props.classes.detail}>
      <div className={props.classes.name}>{props.name}</div>
      <Divider className={props.classes.divider} />
      <div className={props.classes.earning}>{props.earning}</div>
    </div>
  </div>
);

export default withStyles(styles)(LeaderBoardCard);

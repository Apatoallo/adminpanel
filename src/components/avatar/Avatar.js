import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '72px',
    boxSizing: 'border-box',
    padding: '16px',
    backgroundColor: theme.colors.background.avatar
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'middle',
    marginLeft: '12px'
  },
  mainText: {
    fontSize: '16px',
    color: theme.colors.textColor.avatarText
  },
  detailText: {
    fontSize: '14px',
    marginTop: '6px',
    color: theme.colors.textColor.blue
  }
});

const Avatar = props => (
  <div className={props.classes.avatarContainer}>
    {props.avatarIcon}
    <div className={props.classes.textContainer}>
      <div className={props.classes.mainText}>{props.text}</div>
      {props.detailText ? (
        <div className={props.classes.detailText}>{props.detailText}</div>
      ) : null}
    </div>
  </div>
);

export default withStyles(styles)(Avatar);

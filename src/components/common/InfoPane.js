import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
  infoPaneContainer: {
    display: 'flex',
    boxSizing: 'border-box',
    padding: '14px 10px',
    backgroundColor: theme.colors.textColor.grey03
  }
});

const InfoPane = props => (
  <div className={classNames(props.className, props.classes.infoPaneContainer)}>
    {props.children}
  </div>
);

export default withStyles(styles)(InfoPane);

import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  footerContainer: {
    display: 'block',
    boxSizing: 'border-box',
    borderTop: 'dotted 1px rgba(48, 66, 98, 0.12)',
    backgroundColor: theme.colors.textColor.grey03,
    padding: '20px'
  },
  title: {
    marginBottom: '20px',
    fontSize: '14px',
    color: theme.colors.textColor.grey54,
    fontWeight: '500'
  },
  content: {
    fontSize: '14px',
    color: theme.colors.textColor.grey54
  }
});

const DialogFooter = props => (
  <div className={props.classes.footerContainer}>
    {props.title ? (
      <div className={props.classes.title}>{props.title}</div>
    ) : null}
    {props.children ? (
      <div className={props.classes.content}>{props.children}</div>
    ) : null}
  </div>
);

export default withStyles(styles)(DialogFooter);

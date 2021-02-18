import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'inline-block',
    cursor: 'pointer'
  },
  bar: {
    width: '35px',
    height: '5px',
    margin: '6px 0',
    transition: '.4s'
  }
});

const HamburgerMenu = ({ classes, color }) => (
  <div className={classes.container}>
    <div className={classes.bar} style={{ backgroundColor: color }} />
    <div className={classes.bar} style={{ backgroundColor: color }} />
    <div className={classes.bar} style={{ backgroundColor: color }} />
  </div>
);

export default withStyles(styles)(HamburgerMenu);

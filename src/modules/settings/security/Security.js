import React from 'react';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import StyledPaper from '../../../components/common/StyledPaper';
import AuthenticationContainer from './authentication/AuthenticationContainer';
import MobileAccessContainer from './mobile-access/MobileAccessContainer';
import APIAccessContainer from './api-access/APIAccessContainer';
import ChangePasswordContainer from './change-password/ChangePasswordContainer';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.colors.background.paper,
    marginTop: theme.unit.margin,
    boxSizing: 'border-box'
  },
  divider: {
    height: '2px',
    backgroundColor: theme.colors.background.menuDivider
  }
});

class Security extends React.PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <StyledPaper className={classes.container}>
          <ChangePasswordContainer />
          <Divider className={classes.divider} />
          <AuthenticationContainer />
        </StyledPaper>
        <StyledPaper className={classes.container}>
          <MobileAccessContainer />
        </StyledPaper>
        <StyledPaper className={classes.container}>
          <APIAccessContainer />
        </StyledPaper>
      </div>
    );
  }
}

export default withStyles(styles)(Security);

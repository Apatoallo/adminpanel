import React from 'react';
import logo_white from '../../assets/logos/bitexen_logo_blue_black.png';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import StyledPaper from '../../components/common/StyledPaper';
import I18n from '../../common/i18n/I18n';

const styles = theme => ({
  page: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fcfcfc',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 12px',
    boxSizing: 'border-box'
  },
  loginContainer: {
    height: '220px',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: '30px',
    boxSizing: 'border-box',
    width: '370px',
    '@media screen and (max-width: 600px)': {
      width: '100%'
    }
  },
  logo: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logoStyle: {
    marginLeft: '2px',
    maxWidth: '160px',
    maxHeight: '31px'
  },
  title: {
    marginTop: '20px',
    marginBottom: '13px',
    cursor: 'pointer',
    fontSize: '14px',
    color: theme.colors.textColor.blue,
    fontWeight: '500'
  },
  hint: {
    textAlign: 'center',
    height: '32px',
    fontSize: '14px',
    lineHeight: 'normal',
    color: theme.colors.textColor.grey87,
    marginTop: '12px'
  }
});

class ForgotPasswordSuccess extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      recaptchaInstance: null,
      username: ''
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.page}>
        <div className={classes.logo}>
          <Link to="/">
            <img
              src={logo_white}
              className={classes.logoStyle}
              alt="Bitexen logo"
            />
          </Link>
        </div>
        <StyledPaper className={classes.loginContainer}>
          <div className={classes.title}>
            {I18n.translate('forgot_password_completed_title')}
          </div>
          <div className={classes.hint}>
            {I18n.translate('forgot_password_completed_description')}
          </div>
        </StyledPaper>
      </div>
    );
  }
}

export default withStyles(styles)(ForgotPasswordSuccess);

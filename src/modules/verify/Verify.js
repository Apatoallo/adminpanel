import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import I18n from '../../common/i18n/I18n';
import StyledPaper from '../../components/common/StyledPaper';
import lightTheme from '../../common/theme/lightTheme';
import { SuccessIcon } from '../../components/icons/Icons';
import socketHelper from '../../api/socketHelper';
import DocumentTitle from 'react-document-title';
import PreLoginHeader from '../../modules/landing-page/header/Header';
import PreLoginHeaderMenu from '../../modules/landing-page/header/HeaderMenu';
import Footer from '../../modules/landing-page/footer/Footer';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

const styles = theme => ({
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    '@media screen and (min-width: 600px)': {
      height: '100vh'
    }
  },
  root: {
    backgroundColor: '#304262',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '@media screen and (max-width: 600px)': {
      paddingLeft: '16px'
    },
    '@media screen and (min-width: 801px)': {
      paddingLeft: '60px'
    },
    '@media screen and (min-width: 1280px)': {
      paddingLeft: '118px'
    },
    padding: '10px 0 10px 16px',
    boxSizing: 'border-box'
  },
  preloginHeaderContainer: {
    width: '100%'
  },
  successContainer: {
    boxSizing: 'border-box',
    minHeight: '480px',
    height: 'auto',
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcfcfc'
  },
  iconContainer: {
    textAlign: 'center'
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px',
    maxWidth: '600px',
    minWidth: '300px',
    height: '300px',
    padding: '40px',
    boxSizing: 'border-box'
  },
  successTitle: {
    color: theme.colors.textColor.blue,
    fontSize: '24px',
    fontWeight: '500'
  },
  resultText: {
    color: theme.colors.textColor.grey87,
    fontSize: '14px',
    fontWeight: '500',
    margin: '8px 0 24px'
  },
  errorIcon: {
    fill: theme.colors.textColor.red,
    width: '120px',
    height: '96px'
  },
  errorTitle: {
    color: theme.colors.textColor.red,
    fontSize: '24px',
    fontWeight: '500'
  },
  footerContainer: {
    width: '100%'
  }
});

class Verify extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggleView = this.toggleView.bind(this);

    this.state = {
      showMenu: false
    };
  }

  componentDidMount() {
    if (this.props.match.params && this.props.match.params.hash) {
      this.props.getVerifyStatus(this.props.match.params.hash);
    }
    socketHelper.subscribeToTickers();
  }

  componentWillUnmount() {
    socketHelper.unsubscribeFromTickers();
  }

  toggleView(open) {
    this.setState({ showMenu: open });
  }

  render() {
    const { showMenu } = this.state;
    const { classes, tickers, verifyResult } = this.props;

    return (
      <DocumentTitle
        title={
          tickers && tickers.length > 0 && tickers[0]
            ? `(${tickers[0].last_price} ${
                tickers[0].market.counter_currency_code
              }) ${I18n.translate('site_title')}`
            : I18n.translate('site_title')
        }
      >
        <div className={classes.pageContainer}>
          <MuiThemeProvider theme={createMuiTheme(lightTheme)}>
            <div className={classes.root}>
              <div className={classes.preloginHeaderContainer}>
                <PreLoginHeader onClick={this.toggleView} />
                {showMenu && <PreLoginHeaderMenu />}
              </div>
            </div>
            <div className={classes.successContainer}>
              <StyledPaper className={classes.paper}>
                <div className={classes.iconContainer}>
                  {verifyResult ? (
                    verifyResult.status === 'success' ? (
                      <div>
                        <SuccessIcon fillColor="#3ab2ee" />
                        <div className={classes.successTitle}>
                          {I18n.translate('verify_success_title')}
                        </div>
                        <div className={classes.resultText}>
                          {I18n.translate('verify_success_text')}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <ErrorOutline className={classes.errorIcon} />
                        <div className={classes.errorTitle}>
                          {I18n.translate('verify_error_title')}
                        </div>
                        <div className={classes.resultText}>
                          {verifyResult.status_code
                            ? I18n.translate(
                                `verify_error_text_${verifyResult.status_code}`
                              )
                            : I18n.translate(`verify_error_text_general`)}
                        </div>
                      </div>
                    )
                  ) : null}
                </div>
              </StyledPaper>
            </div>
            <div className={classes.footerContainer}>
              <Footer />
            </div>
          </MuiThemeProvider>
        </div>
      </DocumentTitle>
    );
  }
}

export default withStyles(styles)(Verify);

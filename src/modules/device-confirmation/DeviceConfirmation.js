import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import I18n from '../../common/i18n/I18n';
import DocumentTitle from 'react-document-title';
import asyncPoll from 'react-async-poll';
import { Email } from '@material-ui/icons';
import StyledPaper from '../../components/common/StyledPaper';

const onPollInterval = props => {
  if (props.checkConfirmation) {
    props.checkConfirmation();
  }
};

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '160px',
    '@media screen and (max-width: 600px)': {
      paddingTop: '60px'
    }
  },
  iconContainer: {
    textAlign: 'center'
  },
  button: {
    color: theme.colors.textColor.white,
    backgroundColor: theme.colors.textColor.orange,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: theme.colors.textColor.orangeAccent
    }
  },
  text: {
    color: theme.colors.textColor.grey54,
    fontSize: '14px',
    fontWeight: '500',
    margin: '8px 0 16px'
  },
  textBold: {
    color: theme.colors.textColor.grey87,
    fontSize: '14px',
    fontWeight: '500',
    margin: '8px 0 16px'
  },
  descriptionArea: {
    display: 'flex',
    flexDirection: 'column'
  },
  emailIcon: {
    fill: theme.colors.textColor.grey3,
    width: '120px',
    height: '96px'
  },
  emailWarningTitle: {
    color: theme.colors.textColor.grey87,
    fontSize: '24px',
    fontWeight: '500',
    marginBottom: '10px'
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px',
    '@media screen and (max-width: 600px)': {
      maxWidth: '350px',
      minWidth: '350px'
    },
    maxWidth: '450px',
    minWidth: '550px',
    padding: '40px',
    boxSizing: 'border-box'
  }
});

class DeviceConfirmation extends React.PureComponent {
  render() {
    const { classes, tickers } = this.props;

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
        <div className={classes.container}>
          <StyledPaper className={classes.paper}>
            <div className={classes.iconContainer}>
              <div>
                <Email className={classes.emailIcon} />
                <div className={classes.emailWarningTitle}>
                  {I18n.translate('new_device_confirmation_title')}
                </div>
              </div>
              <div className={classes.descriptionArea}>
                <div className={classes.text}>
                  {I18n.translate('new_device_confirmation_message1')}
                </div>
                <div className={classes.text}>
                  {I18n.translate('new_device_confirmation_message2')}
                </div>
              </div>
            </div>
          </StyledPaper>
        </div>
      </DocumentTitle>
    );
  }
}

export default withStyles(styles)(
  asyncPoll(3 * 1000, onPollInterval)(DeviceConfirmation)
);

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { SuccessIcon } from '../../../components/icons/Icons';
import Email from '@material-ui/icons/Email';
import I18n from '../../../common/i18n/I18n';
import history from '../../../common/history';

const styles = theme => ({
  successContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
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
  successTitle: {
    color: theme.colors.textColor.orange,
    fontSize: '24px',
    fontWeight: '500'
  },
  successText: {
    color: theme.colors.textColor.grey87,
    fontSize: '14px',
    fontWeight: '500',
    margin: '8px 0 24px'
  },
  emailIcon: {
    fill: theme.colors.textColor.grey3,
    width: '120px',
    height: '96px'
  },
  emailWarningTitle: {
    color: theme.colors.textColor.grey54,
    fontSize: '24px',
    fontWeight: '500'
  }
});

const WithdrawSuccess = props => (
  <div className={props.classes.successContainer}>
    <div className={props.classes.iconContainer}>
      {props.result && props.result.resultCode === 'WFU' ? (
        <div>
          <Email className={props.classes.emailIcon} />
          <div className={props.classes.emailWarningTitle}>
            {I18n.translate('transfer_email_warning_title')}
          </div>
        </div>
      ) : (
        <div>
          <SuccessIcon />
          <div className={props.classes.successTitle}>
            {I18n.translate('transfer_success_title')}
          </div>
        </div>
      )}

      <div className={props.classes.successText}>
        {props.result && props.result.message}
      </div>
      <Button
        variant="contained"
        className={props.classes.button}
        onClick={() => history.push('/account/assets')}
      >
        {I18n.translate('transfer_back_to_assets')}
      </Button>
    </div>
  </div>
);

export default withStyles(styles)(WithdrawSuccess);

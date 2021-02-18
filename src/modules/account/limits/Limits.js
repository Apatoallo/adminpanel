import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import I18n from '../../../common/i18n/I18n';
import LimitBar from './LimitBar';
import StyledPaper from '../../../components/common/StyledPaper';

const styles = theme => ({
  pageContainer: {
    marginTop: theme.unit.margin
  },
  topPanel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '@media screen and (max-width: 600px)': {
      flexDirection: 'column',
      width: '100%'
    }
  },
  bottomPanel: {
    marginTop: '30px'
  },
  commissionArea: {
    minWidth: '44.5%',
    padding: '16px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  commissionLabel: {
    fontSize: '14px',
    color: theme.colors.textColor.paperHeader
  },
  commissionRatio: {
    fontSize: '18px',
    fontWeight: '900',
    color: theme.colors.textColor.spreadValue
  },
  awaitingTransfers: {
    marginBottom: theme.unit.margin
  },
  limitsContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 32px 36px 16px'
  },
  limitRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: '24px'
  },
  title: {
    minWidth: '175px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: theme.colors.textColor.menuItem,
    '@media screen and (max-width: 600px)': {
      minWidth: '85px',
      fontSize: '13px'
    }
  }
});

class Limits extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };
  }

  componentWillMount() {
    this.props.getAccountLimits();
  }

  render() {
    const { classes, limits, commissions } = this.props;
    return (
      <div className={classes.pageContainer}>
        <div className={classes.topPanel}>
          <StyledPaper className={classes.commissionArea}>
            <div className={classes.commissionLabel}>
              {I18n.translate('account_limits_maker_commission_label')}
            </div>
            <div className={classes.commissionRatio}>
              {commissions ? commissions.maker_fee_ratio : ''}
            </div>
          </StyledPaper>
          <StyledPaper className={classes.commissionArea}>
            <div className={classes.commissionLabel}>
              {I18n.translate('account_limits_taker_commission_label')}
            </div>
            <div className={classes.commissionRatio}>
              {commissions ? commissions.taker_fee_ratio : ''}
            </div>
          </StyledPaper>
        </div>
        <div className={classes.bottomPanel}>
          <StyledPaper title={I18n.translate('account_limits_title')}>
            {limits && (
              <div className={classes.limitsContainer}>
                <div className={classes.limitRow}>
                  <div className={classes.title}>
                    {I18n.translate('account_limits_daily_deposit_label')}
                  </div>
                  <LimitBar
                    total={limits.deposit.daily}
                    remaining={limits.deposit.daily_remaining}
                  />
                </div>
                <div className={classes.limitRow}>
                  <div className={classes.title}>
                    {I18n.translate('account_limits_monthly_deposit_label')}
                  </div>
                  <LimitBar
                    total={limits.deposit.monthly}
                    remaining={limits.deposit.monthly_remaining}
                  />
                </div>
                <div className={classes.limitRow}>
                  <div className={classes.title}>
                    {I18n.translate('account_limits_daily_withdraw_label')}
                  </div>
                  <LimitBar
                    total={limits.withdraw.daily}
                    remaining={limits.withdraw.daily_remaining}
                  />
                </div>
                <div className={classes.limitRow}>
                  <div className={classes.title}>
                    {I18n.translate('account_limits_monthly_withdraw_label')}
                  </div>
                  <LimitBar
                    total={limits.withdraw.monthly}
                    remaining={limits.withdraw.monthly_remaining}
                  />
                </div>
              </div>
            )}
          </StyledPaper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Limits);

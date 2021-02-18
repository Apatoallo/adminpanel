import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Linkify from 'react-linkify';
import I18n from '../../common/i18n/I18n';
import StyledPaper from '../../components/common/StyledPaper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  pageContainer: {},
  topPanel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    alignItems: 'center',
    backgroundColor: 'white'
  },
  commissionLabel: {
    fontSize: '16px',
    color: 'rgba(48, 66, 98, 0.87)'
  },
  descriptionLine: {
    lineHeight: '30px'
  },
  commissionRatio: {
    fontSize: '18px',
    fontWeight: '900',
    color: 'rgba(48, 66, 98, 0.87)'
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
    fontWeight: '500',
    marginBottom: '20px',
    fontSize: '16px',
    color: '#3ab2ee'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    color: 'rgba(48, 66, 98, 0.87)'
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '8px',
    width: '292px'
  },
  label: {
    fontSize: '15px',
    width: '94px'
  },
  text: {
    fontSize: '15px',
    fontWeight: '500',
    width: '94px'
  }
});

class Fees extends React.PureComponent {
  componentWillMount() {
    this.props.getFeesPublic();
  }
  render() {
    const { classes, commissions } = this.props;

    return (
      <div className={classes.pageContainer}>
        <Grid container spacing={3} className={classes.grid}>
          <Grid xs={12} sm={6} item className={classes.leftGrid}>
            <StyledPaper className={classes.commissionArea}>
              <div className={classes.commissionLabel}>
                {I18n.translate('account_limits_maker_commission_label')}
              </div>
              <div className={classes.commissionRatio}>
                {commissions ? commissions.maker_fee_ratio : ''}
              </div>
            </StyledPaper>
          </Grid>
          <Grid xs={12} sm={6} item className={classes.leftGrid}>
            <StyledPaper className={classes.commissionArea}>
              <div className={classes.commissionLabel}>
                {I18n.translate('account_limits_taker_commission_label')}
              </div>
              <div className={classes.commissionRatio}>
                {commissions ? commissions.taker_fee_ratio : ''}
              </div>
            </StyledPaper>
          </Grid>
          <Grid xs={12} item className={classes.leftGrid}>
            <StyledPaper className={classes.commissionArea}>
              <div className={classes.container}>
                <div className={classes.title}>
                  {I18n.translate('landing_page_fees_title')} *
                </div>
                <div className={classes.line}>
                  <div className={classes.text}>
                    {I18n.translate('landing_page_fees_currency')}
                  </div>
                  <div className={classes.text}>
                    {I18n.translate('landing_page_fees_deposit_title')}
                  </div>
                  <div className={classes.text}>
                    {I18n.translate('landing_page_fees_withdrawal_title')}
                  </div>
                </div>
                <div className={classes.line}>
                  <div className={classes.label}>Bitcoin</div>
                  <div className={classes.label}>0 BTC</div>
                  <div className={classes.label}>0.0005 BTC</div>
                </div>
                <div className={classes.line}>
                  <div className={classes.label}>XRP</div>
                  <div className={classes.label}>0 XRP</div>
                  <div className={classes.label}>0.5 XRP</div>
                </div>
                <div className={classes.line}>
                  <div className={classes.label}>XLM</div>
                  <div className={classes.label}>0 XLM</div>
                  <div className={classes.label}>0.5 XLM</div>
                </div>
                <div className={classes.line}>
                  <div className={classes.label}>ETH</div>
                  <div className={classes.label}>0 ETH</div>
                  <div className={classes.label}>0.005 ETH</div>
                </div>
                <div className={classes.line}>
                  <div className={classes.label}>EXEN</div>
                  <div className={classes.label}>0 EXEN</div>
                  <div className={classes.label}>5 EXEN *</div>
                </div>
                <div className={classes.line}>
                  <div className={classes.label}>
                    {I18n.translate('landing_page_fees_try_title')}
                  </div>
                  <div className={classes.label}>0 TL</div>
                  <div className={classes.label}>3 TL</div>
                </div>
              </div>
            </StyledPaper>
          </Grid>
          <Grid xs={12} item className={classes.leftGrid}>
            <StyledPaper className={classes.commissionArea}>
              <div className={classes.container}>
                <div className={classes.descriptionLine}>
                  {I18n.translate('landing_page_fees_vat_title')}
                </div>
                <div className={classes.descriptionLine}>
                  <Linkify
                    properties={{
                      target: '_blank',
                      style: { color: '#3ab2ee', fontWeight: '500' }
                    }}
                  >
                    {I18n.translate('landing_page_fees_rebate_description')}
                  </Linkify>
                </div>
                <div className={classes.descriptionLine}>
                  {I18n.translate('landing_page_fees_exen_description')}
                </div>
              </div>
            </StyledPaper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Fees);

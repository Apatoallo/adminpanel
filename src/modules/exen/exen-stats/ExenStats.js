import React from 'react';
import I18n from '../../../common/i18n/I18n';
import StyledPaper from '../../../components/common/StyledPaper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles/index';
import ContrastTable from '../../../components/common/ContrastTable';
import { isUserLoggedIn } from '../../login/loginHelper';
import Linkify from 'react-linkify';
import './ExenStats.scss';

const styles = theme => ({
  pageContainer: {
    marginTop: isUserLoggedIn() ? theme.unit.margin : '0'
  },
  scrollOnMobile: {
    '@media screen and (max-width: 600px)': {
      overflowX: 'auto'
    }
  },
  topPanel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottomPanel: {
    marginTop: '30px'
  },
  rules: {
    textAlign: 'justify',
    paddingRight: '24px',
    flexDirection: 'column',
    fontSize: '13px',
    color: isUserLoggedIn() ? theme.colors.textColor.menuItem : '#4b5a76',
    marginBottom: '16px',
    display: 'flex',
    lineHeight: '1.5em'
  },
  paperContainer: {
    display: 'flex',
    flexContainer: 'column',
    margin: '16px 32px 36px 16px'
  },
  commissionArea: {
    minWidth: '44.5%',
    padding: '16px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.background.paper
  },
  buybackArea: {
    marginBottom: '24px',
    minWidth: '44.5%',
    padding: '12px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.background.paper
  },
  buybackDate: {
    color: theme.colors.textColor.tableCell,
    fontSize: '13px',
    fontWeight: '600'
  },
  commissionLabel: {
    fontSize: '15px',
    color: theme.colors.textColor.formText
  },
  commissionRatio: {
    fontSize: '13px',
    color: theme.colors.textColor.formText,
    fontWeight: '500'
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
    color: theme.colors.textColor.formText
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

class ExenStats extends React.PureComponent {
  componentWillMount() {
    this.props.getExenStats();
  }

  headerItems = [
    { value: I18n.translate('general_currency'), numeric: false },
    { value: I18n.translate('exen_stats_revenue'), numeric: true },
    { value: I18n.translate('exen_stats_burn_amount'), numeric: true }
  ];

  getTableData = data => {
    return data
      ? data.map(line => ({
          key: line.currency,
          values: [
            {
              value: line.currency,
              numeric: false
            },
            {
              value: line.revenue,
              numeric: true
            },
            {
              value: line.burnt,
              numeric: true
            }
          ]
        }))
      : null;
  };

  getStatisticsTableData = data => {
    return data
      ? data
          .map(d =>
            Object.keys(d).map(key => ({
              key: key,
              value: d[key]
            }))
          )
          .map(line => ({
            key: line[0].key,
            values: [
              {
                value: I18n.translate(line[0].key),
                numeric: false
              },
              {
                value: line[0].value,
                numeric: true
              }
            ]
          }))
      : null;
  };

  render() {
    const { exenStats, classes } = this.props;
    return (
      <div className={classes.pageContainer}>
        <Grid container spacing={3} className={classes.grid}>
          <Grid md={12} lg={5} item className={classes.leftGrid}>
            <StyledPaper className={classes.buybackArea}>
              <div className={classes.commissionRatio}>
                {I18n.translate('exen_stats_next_buyback')}&nbsp;
                <span className={classes.buybackDate}>
                  {exenStats ? exenStats.next_buyback : ' - '}
                </span>
              </div>
            </StyledPaper>
            <StyledPaper
              title={I18n.translate(
                'exen_stats_revenue_table_title',
                exenStats && exenStats.start_date
                  ? I18n.language === 'EN'
                    ? exenStats.start_date.en
                    : exenStats.start_date.tr
                  : ' - '
              )}
            >
              <div className={classes.scrollOnMobile}>
                <ContrastTable
                  headerItems={this.headerItems}
                  padding="dense"
                  data={this.getTableData(exenStats ? exenStats.revenue : [])}
                />
              </div>
            </StyledPaper>
          </Grid>
          <Grid md={12} lg={7} item className={classes.leftGrid}>
            <StyledPaper
              title={I18n.translate('exen_stats_distribution_table_title')}
            >
              <div className={classes.scrollOnMobile}>
                <ContrastTable
                  padding="dense"
                  data={this.getStatisticsTableData(
                    exenStats ? exenStats.distribution : []
                  )}
                />
              </div>
            </StyledPaper>
          </Grid>
          <Grid md={12} item className={classes.leftGrid}>
            <StyledPaper>
              <div className={`${classes.scrollOnMobile} mt-3`}>
                <Linkify
                  properties={{
                    target: '_blank',
                    style: { color: '#3ab2ee', fontWeight: '500' }
                  }}
                >
                  <ul className={classes.rules}>
                    {exenStats &&
                      exenStats.notes.map((n, index) => (
                        <li key={index}>
                          {I18n.language === 'EN' ? n.en : n.tr}
                        </li>
                      ))}
                  </ul>
                </Linkify>
              </div>
            </StyledPaper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(ExenStats);

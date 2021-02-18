import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LeaderBoardCard from '../leader-board-card/LeaderBoardCard';
import ContrastTable from '../../../../components/common/ContrastTable';
import I18n from '../../../../common/i18n/I18n';
import moment from 'moment/moment';

const ROWS_PER_PAGE = 20;

const styles = theme => ({
  referralHistoryContainer: {
    width: '100%'
  },
  leaderBoardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: '16px'
  },
  title: {
    color: theme.colors.textColor.blue,
    fontWeight: '700',
    fontSize: '16px',
    margin: '24px 24px 16px'
  },
  table: {
    margin: '0 24px 24px',
    border: theme.colors.borderColor.rowSeperatorBorder,
    '@media screen and (max-width: 600px)': {
      overflowX: 'auto'
    }
  }
});

class ReferralHistory extends React.PureComponent {
  pageNumber = 0;

  componentDidMount() {
    this.props.getReferralHistory(this.pageNumber + 1);
  }

  onChangePage = (event, pageNumber) => {
    this.pageNumber = pageNumber;
    this.props.getReferralHistory(pageNumber + 1);
  };

  headerItems = [
    {
      value: `  ${I18n.translate('general_date_time')}`,
      numeric: false,
      style: { whiteSpace: 'pre' }
    },
    { value: I18n.translate('settings_user_email'), numeric: false },
    { value: I18n.translate('exen_earning'), numeric: true },
    { value: I18n.translate('general_status'), numeric: false }
  ];

  getFormattedActivities = () => {
    return this.props.referralHistory && this.props.referralHistory.activities
      ? this.props.referralHistory.activities.map(item => ({
          key: item.id,
          values: [
            {
              value: moment(item.add_date).format('DD.MM.YYYY HH:mm:ss'),
              numeric: false,
              style: { whiteSpace: 'pre' }
            },
            {
              value: item.masked_username,
              numeric: false
            },
            { value: item.amount, numeric: true },
            {
              value: I18n.translate(`referral_status_${item.status}`),
              numeric: false
            }
          ]
        }))
      : null;
  };

  render() {
    const { classes, referralHistory } = this.props;
    return (
      <div className={classes.referralHistoryContainer}>
        <div className={classes.title}>
          {I18n.translate('referral_leaderboard_title')}
        </div>
        <div className={classes.leaderBoardContainer}>
          {referralHistory &&
            referralHistory.leader_board.map((card, index) => (
              <LeaderBoardCard
                key={index}
                rank={card.rank}
                name={card.masked_username}
                earning={card.award}
                color="blue"
              />
            ))}
        </div>
        <div className={classes.title}>
          {I18n.translate('referral_activity_title')}
        </div>
        <div className={classes.table}>
          <ContrastTable
            hover={true}
            headerItems={this.headerItems}
            padding="dense"
            data={this.getFormattedActivities()}
            paginationProps={{
              colSpan: this.headerItems.length,
              count: referralHistory ? referralHistory.total_count : 0,
              rowsPerPage: ROWS_PER_PAGE,
              page: this.pageNumber,
              onChangePage: this.onChangePage,
              rowsPerPageOptions: [ROWS_PER_PAGE]
            }}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ReferralHistory);

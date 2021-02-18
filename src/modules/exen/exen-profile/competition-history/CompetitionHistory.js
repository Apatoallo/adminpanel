import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LeaderBoardCard from '../leader-board-card/LeaderBoardCard';
import ContrastTable from '../../../../components/common/ContrastTable';
import I18n from '../../../../common/i18n/I18n';
import moment from 'moment/moment';

const ROWS_PER_PAGE = 20;

const styles = theme => ({
  competitionHistoryContainer: {
    width: '100%'
  },
  leaderBoardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: '16px'
  },
  title: {
    color: theme.colors.textColor.orange,
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

class CompetitionHistory extends React.PureComponent {
  pageNumber = 0;

  componentDidMount() {
    this.props.getCompetitionHistory(this.pageNumber + 1);
  }

  onChangePage = (event, pageNumber) => {
    this.pageNumber = pageNumber;
    this.props.getCompetitionHistory(pageNumber + 1);
  };

  headerItems = [
    {
      value: `  ${I18n.translate('general_date_time')}`,
      numeric: false,
      style: { whiteSpace: 'pre' }
    },
    { value: I18n.translate('competition_title'), numeric: false },
    { value: I18n.translate('competitions_rank_label'), numeric: true },
    { value: I18n.translate('exen_earning'), numeric: true },
    { value: I18n.translate('volume_label'), numeric: true }
  ];

  getFormattedActivities = () => {
    return this.props.competitionHistory &&
      this.props.competitionHistory.competitions
      ? this.props.competitionHistory.competitions.map(item => ({
          key: item.id,
          values: [
            {
              value: moment(item.add_date).format('DD.MM.YYYY HH:mm'),
              numeric: false,
              style: { whiteSpace: 'pre' }
            },
            {
              value: item.competition_name,
              numeric: false
            },
            { value: item.rank, numeric: true },
            { value: item.award, numeric: true },
            {
              value: item.base_currency_volume,
              numeric: true
            }
          ]
        }))
      : null;
  };

  render() {
    const { classes, competitionHistory } = this.props;
    return (
      <div className={classes.competitionHistoryContainer}>
        <div className={classes.title}>
          {I18n.translate('competition_leaderboard_title')}
        </div>
        <div className={classes.leaderBoardContainer}>
          {competitionHistory &&
            competitionHistory.leader_board.map((card, index) => (
              <LeaderBoardCard
                key={index}
                rank={card.rank}
                name={card.masked_username}
                earning={card.total_award}
                color="orange"
              />
            ))}
        </div>
        <div className={classes.title}>
          {I18n.translate('competition_activity_title')}
        </div>
        <div className={classes.table}>
          <ContrastTable
            hover={true}
            headerItems={this.headerItems}
            padding="dense"
            data={this.getFormattedActivities()}
            paginationProps={{
              colSpan: this.headerItems.length,
              count: competitionHistory ? competitionHistory.total_count : 0,
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

export default withStyles(styles)(CompetitionHistory);

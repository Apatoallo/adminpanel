import React from 'react';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import ContrastTable from '../../../components/common/ContrastTable';
import I18n from '../../../common/i18n/I18n';
import StyledPaper from '../../../components/common/StyledPaper';

const ROWS_PER_PAGE = 20;

const styles = theme => ({
  table: {
    marginLeft: '10px'
  },
  scrollOnMobile: {
    '@media screen and (max-width: 600px)': {
      overflowX: 'auto'
    }
  }
});

class ActivityHistory extends React.PureComponent {
  componentWillMount() {
    this.getHistory(this.props, this.pageNumber);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.activityType !== nextProps.activityType ||
      this.props.channelCode !== nextProps.channelCode ||
      this.props.dateRange !== nextProps.dateRange
    ) {
      this.pageNumber = 0;
      this.getHistory(nextProps, this.pageNumber);
    }
  }

  pageNumber = 0;

  onChangePage = (event, pageNumber) => {
    this.pageNumber = pageNumber;
    this.getHistory(this.props, this.pageNumber);
  };

  getHistory = (props, pageNumber) => {
    props
      .getActivityHistory(
        props.activityType,
        props.channelCode,
        props.dateRange,
        pageNumber + 1
      )
      .then(() => {});
  };

  headerItems = [
    {
      value: `  ${I18n.translate('general_date_time')}`,
      numeric: false,
      style: { whiteSpace: 'pre' }
    },
    { value: I18n.translate('general_channel'), numeric: false },
    { value: I18n.translate('general_ip'), numeric: false },
    { value: I18n.translate('activity_type'), numeric: false },
    {
      value: I18n.translate('activity_info'),
      numeric: false,
      style: { minWidth: '200px' }
    },
    { value: I18n.translate('activity_device_type'), numeric: false }
  ];

  getFormattedActivities = () => {
    return this.props.activityHistoryResult &&
      this.props.activityHistoryResult.activities
      ? this.props.activityHistoryResult.activities.map(item => ({
          key: item.id,
          values: [
            {
              value: moment(item.add_date).format('  DD.MM.YYYY HH:mm:ss'),
              numeric: false,
              style: { whiteSpace: 'pre' }
            },
            {
              value: I18n.translate(`activity_channel_${item.channel_code}`),
              numeric: false
            },
            { value: item.client_ip, numeric: false },
            {
              value: I18n.translate(`activity_type_${item.activity_type}`),
              numeric: false
            },
            {
              value: item.action_info,
              numeric: false,
              style: {
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                wordBreak: 'break-word'
              }
            },
            {
              value: item.client_device,
              numeric: false,
              style: {
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                wordBreak: 'break-word',
                fontSize: '11px'
              }
            }
          ],
          style: {
            height: 'auto'
          }
        }))
      : null;
  };

  render() {
    const { activityHistoryResult } = this.props;
    return activityHistoryResult &&
      activityHistoryResult.activities &&
      activityHistoryResult.activities.length > 0 ? (
      <StyledPaper title={this.props.title} className={this.props.className}>
        <div className={this.props.classes.scrollOnMobile}>
          <ContrastTable
            hover={true}
            headerItems={this.headerItems}
            padding="dense"
            data={this.getFormattedActivities()}
            paginationProps={{
              colSpan: this.headerItems.length,
              count: activityHistoryResult.total_count,
              rowsPerPage: ROWS_PER_PAGE,
              page: this.pageNumber,
              onChangePage: this.onChangePage,
              rowsPerPageOptions: [ROWS_PER_PAGE]
            }}
          />
        </div>
      </StyledPaper>
    ) : null;
  }
}

export default withStyles(styles, { withTheme: true })(ActivityHistory);

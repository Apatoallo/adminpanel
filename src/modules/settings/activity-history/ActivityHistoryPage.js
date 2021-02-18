import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import StyledPaper from '../../../components/common/StyledPaper';
import I18n from '../../../common/i18n/I18n';
import ActivityHistoryContainer from './ActivityHistoryContainer';

const styles = theme => ({
  container: {
    marginTop: theme.unit.margin
  },
  filtersContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.unit.margin,
    marginBottom: '15px',
    justifyContent: 'flex-start',
    '@media screen and (max-width: 600px)': {
      flexDirection: 'column',
      marginBottom: '12px'
    }
  },
  paper: {
    marginLeft: '12px',
    '@media screen and (max-width: 600px)': {
      margin: '12px 0 0'
    }
  },
  select: {
    color: theme.colors.textColor.input
  },
  selectRoot: {
    paddingLeft: '12px'
  },
  input: {
    color: theme.colors.textColor.input,
    fontSize: '14px',
    fontWeight: '500'
  },
  menuItem: {
    background: theme.colors.background.paper,
    color: theme.colors.textColor.input,
    fontSize: '14px',
    lineHeight: '18px',
    height: '18px'
  },
  menu: {
    background: theme.colors.background.paper
  }
});

//TODO: Create Constants for this
const dateRanges = [
  { value: 'ALL', label: I18n.translate('activity_filter_all_date_ranges') },
  { value: 'DAY', label: I18n.translate('activity_filter_day') },
  { value: 'WEEK', label: I18n.translate('activity_filter_week') },
  { value: 'MONTH', label: I18n.translate('activity_filter_month') }
];

//TODO: Create Constants for this
const activityTypes = [
  { value: 'ALL', label: I18n.translate('activity_filter_all_types') },
  { value: 'L', label: I18n.translate('activity_type_L') },
  { value: 'O', label: I18n.translate('activity_type_O') },
  { value: 'T', label: I18n.translate('activity_type_T') },
  { value: 'S', label: I18n.translate('activity_type_S') },
  { value: 'V', label: I18n.translate('activity_type_V') }
];

const channels = [
  { value: 'ALL', label: I18n.translate('activity_filter_all_channels') },
  { value: 'W', label: I18n.translate('activity_channel_W') },
  { value: 'M', label: I18n.translate('activity_channel_M') },
  { value: 'A', label: I18n.translate('activity_channel_A') }
];

class ActivityHistoryPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedChannel: 'ALL',
      selectedType: 'ALL',
      selectedDateRange: 'WEEK'
    };
  }

  handleChange = name => evt => {
    this.setState({ [name]: evt.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.filtersContainer}>
          <StyledPaper>
            <TextField
              id="select-type"
              select
              value={this.state.selectedType}
              className={classes.select}
              onChange={this.handleChange('selectedType')}
              SelectProps={{
                MenuProps: {
                  classes: { paper: classes.menu }
                },
                classes: {
                  selectMenu: classes.selectRoot
                }
              }}
              margin="none"
              InputProps={{
                disableUnderline: true,
                classes: {
                  root: classes.input
                }
              }}
            >
              {activityTypes.map(option => (
                <MenuItem
                  classes={{ root: classes.menuItem }}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </StyledPaper>
          <StyledPaper className={classes.paper}>
            <TextField
              id="select-channel"
              select
              value={this.state.selectedChannel}
              className={classes.select}
              onChange={this.handleChange('selectedChannel')}
              SelectProps={{
                MenuProps: {
                  classes: { paper: classes.menu }
                },
                classes: {
                  selectMenu: classes.selectRoot
                }
              }}
              margin="none"
              InputProps={{
                disableUnderline: true,
                classes: {
                  root: classes.input
                }
              }}
            >
              {channels.map(option => (
                <MenuItem
                  classes={{ root: classes.menuItem }}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </StyledPaper>
          <StyledPaper className={classes.paper}>
            <TextField
              id="select-date-range"
              select
              value={this.state.selectedDateRange}
              className={classes.select}
              onChange={this.handleChange('selectedDateRange')}
              SelectProps={{
                MenuProps: {
                  classes: { paper: classes.menu }
                },
                classes: {
                  selectMenu: classes.selectRoot
                }
              }}
              margin="none"
              InputProps={{
                disableUnderline: true,
                classes: {
                  root: classes.input
                }
              }}
            >
              {dateRanges.map(option => (
                <MenuItem
                  classes={{ root: classes.menuItem }}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </StyledPaper>
        </div>
        <ActivityHistoryContainer
          title={I18n.translate('settings_menu_activity_history')}
          activityType={
            this.state.selectedType === 'ALL'
              ? undefined
              : this.state.selectedType
          }
          channelCode={
            this.state.selectedChannel === 'ALL'
              ? undefined
              : this.state.selectedChannel
          }
          dateRange={
            this.state.selectedDateRange === 'ALL'
              ? undefined
              : this.state.selectedDateRange
          }
        />
      </div>
    );
  }
}

export default withStyles(styles)(ActivityHistoryPage);

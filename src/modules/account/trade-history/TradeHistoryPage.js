import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import StyledPaper from '../../../components/common/StyledPaper';
import I18n from '../../../common/i18n/I18n';
import TradeHistoryContainer from './TradeHistoryContainer';

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
  { value: 'ALL', label: I18n.translate('trade_filter_all_date_ranges') },
  { value: 'DAY', label: I18n.translate('trade_filter_day') },
  { value: 'WEEK', label: I18n.translate('trade_filter_week') },
  { value: 'MONTH', label: I18n.translate('trade_filter_month') }
];

//TODO: Create Constants for this
const tradeTypes = [
  { value: 'ALL', label: I18n.translate('trade_filter_all_directions') },
  { value: 'B', label: I18n.translate('trade_buy') },
  { value: 'S', label: I18n.translate('trade_sell') }
];

class TradeHistoryPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedMarket: 'ALL',
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
              {tradeTypes.map(option => (
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
              id="select-market"
              select
              value={this.state.selectedMarket}
              className={classes.select}
              onChange={this.handleChange('selectedMarket')}
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
              <MenuItem
                classes={{ root: classes.menuItem }}
                key="ALL"
                value="ALL"
              >
                {I18n.translate('trade_filter_all_markets')}
              </MenuItem>
              {this.props.markets.map(option => (
                <MenuItem
                  classes={{ root: classes.menuItem }}
                  key={option.market_code}
                  value={option.market_code}
                >
                  {option.market_code}
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
        <StyledPaper title={I18n.translate('account_menu_my_history')}>
          <TradeHistoryContainer
            title={I18n.translate('account_menu_my_history')}
            tradeType={
              this.state.selectedType === 'ALL'
                ? undefined
                : this.state.selectedType
            }
            marketCode={
              this.state.selectedMarket === 'ALL'
                ? undefined
                : this.state.selectedMarket
            }
            dateRange={
              this.state.selectedDateRange === 'ALL'
                ? undefined
                : this.state.selectedDateRange
            }
          />
        </StyledPaper>
      </div>
    );
  }
}

export default withStyles(styles)(TradeHistoryPage);

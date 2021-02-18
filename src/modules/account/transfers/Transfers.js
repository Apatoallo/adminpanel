import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import StyledPaper from '../../../components/common/StyledPaper';
import I18n from '../../../common/i18n/I18n';
import TransferHistoryContainer from './transfer-history/TransferHistoryContainer';

const styles = theme => ({
  container: {
    marginTop: theme.unit.margin
  },
  filtersContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: '24px 0px 12px',
    justifyContent: 'flex-end',
    '@media screen and (max-width: 600px)': {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      margin: '12px 0 0'
    }
  },
  paper: {
    marginLeft: '12px',
    '@media screen and (max-width: 600px)': {
      margin: '12px 0'
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
const currencies = [
  { value: 'ALL', label: I18n.translate('transfer_all_currencies') },
  { value: 'TRY', label: 'TRY' },
  { value: 'EXEN', label: 'EXEN' },
  { value: 'BTC', label: 'BTC' },
  { value: 'XRP', label: 'XRP' },
  { value: 'XLM', label: 'XLM' },
  { value: 'ETH', label: 'ETH' }
];

//TODO: Create Constants for this
const transferTypes = [
  { value: 'ALL', label: I18n.translate('transfer_all_types') },
  { value: 'W', label: I18n.translate('transfer_transfer_types_W') },
  { value: 'D', label: I18n.translate('transfer_transfer_types_D') }
];

class Transfers extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedCurrency: 'ALL',
      selectedType: 'ALL'
    };
  }

  getCurrencies = () => {
    if (this.props.accountLines) {
      const currencies = this.props.accountLines.map(line => {
        return { value: line.currency, label: line.currency };
      });
      currencies.unshift({
        value: 'ALL',
        label: I18n.translate('transfer_all_currencies')
      });
      return currencies;
    } else {
      return currencies;
    }
  };

  handleTypeChange = event => {
    this.setState({ selectedType: event.target.value });
  };

  handleCurrencyChange = event => {
    this.setState({ selectedCurrency: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <TransferHistoryContainer
          title={I18n.translate('transfers_awaiting_transfers')}
          transferType="ALL"
          currencyCode="ALL"
          transferStatus="O"
        />
        <div className={classes.filtersContainer}>
          <StyledPaper className={classes.paper}>
            <TextField
              id="select-currency"
              select
              value={this.state.selectedType}
              className={classes.select}
              onChange={this.handleTypeChange}
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
              {transferTypes.map(option => (
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
              id="select-currency-native"
              select
              value={this.state.selectedCurrency}
              className={classes.select}
              onChange={this.handleCurrencyChange}
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
              {this.getCurrencies().map(option => (
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
        <TransferHistoryContainer
          title={I18n.translate('transfers_transfer_history')}
          transferType={this.state.selectedType}
          currencyCode={this.state.selectedCurrency}
          transferStatus="C"
        />
      </div>
    );
  }
}

export default withStyles(styles)(Transfers);

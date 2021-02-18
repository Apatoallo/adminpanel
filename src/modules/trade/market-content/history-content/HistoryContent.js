import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import StyledPaper from '../../../../components/common/StyledPaper';
import ClosedOrdersContainer from './../closed-orders/ClosedOrdersContainer';
import MarketHistoryContainer from './../market-history/MarketHistoryContainer';
import I18n from '../../../../common/i18n/I18n';
import { isUserLoggedIn } from '../../../login/loginHelper';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  pageStyle: {
    display: 'flex',
    flexDirection: 'column'
  },
  historyTypeTabStyle: {
    textTransform: 'none',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: '400',
    color: theme.colors.textColor.inactiveTab
  },
  historyTypeTabSelected: {
    color: theme.colors.textColor.activeTab,
    fontWeight: '500'
  },
  historyContainerStyle: {
    marginTop: theme.unit.margin,
    '@media screen and (max-width: 600px)': {
      overflowX: 'hidden'
    }
  },
  historyStyle: {},
  dividerStyle: {
    height: '2px',
    marginTop: '-2px',
    backgroundColor: theme.colors.background.divider
  },
  tabIndicator: {
    backgroundColor: theme.colors.textColor.blue
  },
  marketFilterContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  switchLabel: {
    color: theme.colors.textColor.paperHeader,
    fontSize: '13px',
    cursor: 'pointer',
    marginRight: '-8px',
    textAlign: 'right'
  },
  checkbox: {
    color: theme.colors.background.checkboxBorder,
    '&$checked': {
      color: theme.colors.textColor.blue
    },
    padding: '2px 12px'
  },
  checked: {},
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: '40px'
  }
});

class HistoryContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bottomTabsDisabled: false
    };
  }

  changePreference = (preference, value) => {
    this.props.changePreferences(preference, value);
  };

  isVertical = () => {
    return this.props.tradeViewStyle
      ? this.props.tradeViewStyle === 'vertical'
      : this.props.currentTradeViewStyle === 'vertical';
  };

  render() {
    const { classes, preferences } = this.props;
    const { hideCancelled, historyType } = preferences;

    return (
      <div className={classes.historyContainerStyle}>
        <StyledPaper className={classes.historyStyle}>
          <div className={classes.tabContainer}>
            <Tabs
              value={this.isVertical() ? 'userHistory' : historyType}
              onChange={(evt, value) =>
                this.changePreference('historyType', value)
              }
              textColor="primary"
              classes={{
                indicator: classes.tabIndicator
              }}
            >
              {this.isVertical() ? null : (
                <Tab
                  classes={{
                    root: classes.historyTypeTabStyle,
                    selected: classes.historyTypeTabSelected
                  }}
                  value="marketHistory"
                  label={I18n.translate('trade_last_transactions')}
                />
              )}
              <Tab
                classes={{
                  root: classes.historyTypeTabStyle,
                  selected: classes.historyTypeTabSelected
                }}
                value="userHistory"
                label={I18n.translate('trade_my_order_history')}
              />
            </Tabs>
            {historyType === 'userHistory' && (
              <div className={classes.marketFilterContainer}>
                <div
                  className={classes.switchLabel}
                  onClick={() =>
                    this.changePreference('hideCancelled', !hideCancelled)
                  }
                >
                  {I18n.translate('hide_canceled_orders')}
                </div>
                <Checkbox
                  checked={hideCancelled}
                  disabled={!isUserLoggedIn()}
                  classes={{
                    root: classes.checkbox,
                    checked: classes.checked
                  }}
                  onChange={() =>
                    this.changePreference('hideCancelled', !hideCancelled)
                  }
                  aria-label="verticalView"
                />
              </div>
            )}
          </div>
          <Divider className={classes.dividerStyle} />
          {this.isVertical() || historyType === 'userHistory' ? (
            <ClosedOrdersContainer
              hideCancelled={hideCancelled}
              marketCode={this.props.selectedMarket.market_code}
            />
          ) : (
            <MarketHistoryContainer />
          )}
        </StyledPaper>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(HistoryContent);

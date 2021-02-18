import React from 'react';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AnimateHeight from 'react-animate-height';
import StyledPaper from '../../../../components/common/StyledPaper';
import { DropdownIcon } from '../../../../components/icons/Icons';
import I18n from '../../../../common/i18n/I18n';
import OrderHistoryContainer from '../order-history/OrderHistoryContainer';
import { isUserLoggedIn } from '../../../login/loginHelper';
import { CLOSED_ORDERS_PARAMS } from '../marketContentConstants';

const styles = theme => ({
  openOrdersContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.unit.margin,
    width: '100%'
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: '0 16px',
    height: '38px'
  },
  title: {
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    color: theme.colors.textColor.paperHeader
  },
  divider: {
    height: '2px',
    backgroundColor: theme.colors.background.divider
  },
  animateHeightContainer: {
    '@media screen and (max-width: 600px)': {
      overflowX: 'auto !important'
    }
  },
  openOrdersFooterStyle: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    alignItems: 'center',
    padding: '6px 16px',
    fontSize: '12px',
    fontWeight: '500',
    fontFamily: 'Roboto'
  },
  openOrdersFooterInfoStyle: {
    color: theme.colors.textColor.inputLabel
  },
  openOrdersFooterShowMoreStyle: {
    color: '#3ab2ee',
    display: 'flex',
    alignItems: 'center'
  },
  flip: {
    transform: 'rotate(-180deg)',
    transition: 'transform 300ms'
  },
  dropdownIcon: {
    cursor: 'pointer',
    marginLeft: '12px'
  },
  dropdownIconPath: {
    stroke: theme.colors.textColor.paperHeader
  },
  rightPart: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  switchLabel: {
    color: theme.colors.textColor.paperHeader,
    fontSize: '13px',
    cursor: 'pointer',
    marginRight: '-8px'
  },
  checkbox: {
    color: theme.colors.background.checkboxBorder,
    '&$checked': {
      color: theme.colors.textColor.blue
    }
  },
  checked: {}
});

const ROW_HEIGHT = 30;
const DEFAULT_SHOWN_ITEM_COUNT = 3;

class OpenOrders extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      shownOrdersCount: 0,
      orderCount: 0
    };

    this.ordersTimeoutFunc = null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.props.ordersUpdateTimeout > 0) {
      if (this.ordersTimeoutFunc) {
        window.clearTimeout(this.ordersTimeoutFunc);
      }
      this.ordersTimeoutFunc = window.setTimeout(
        this.getHistory,
        this.props.ordersUpdateTimeout
      );
    }
  }

  getHistory = () => {
    const { showAllMarkets } = this.state;
    const {
      selectedMarket,
      getOpenOrders,
      getClosedOrders,
      preferences
    } = this.props;
    getOpenOrders(showAllMarkets ? '' : selectedMarket.market_code).then(() => {
      getClosedOrders({
        market_code: selectedMarket.market_code,
        hide_cancelled: preferences.hideCancelled,
        page_number: preferences.closedOrdersPageNumber + 1,
        page_size: CLOSED_ORDERS_PARAMS.DEFAULT_PAGE_SIZE
      });
    });
  };

  getDefaultOrderCount = count => {
    return count < DEFAULT_SHOWN_ITEM_COUNT ? count : DEFAULT_SHOWN_ITEM_COUNT;
  };

  setOrderCount = count => {
    this.setState({
      orderCount: count,
      shownOrdersCount: this.getDefaultOrderCount(count)
    });
  };

  getCalculatedHeight = () => {
    return this.props.preferences.collapseOpenOrders
      ? 0
      : this.state.orderCount
      ? (this.state.shownOrdersCount + 1) * ROW_HEIGHT
      : 0;
  };

  togglePreference = preference => {
    this.props.changePreferences(
      preference,
      !this.props.preferences[preference]
    );
  };

  render() {
    const { classes, PaperProps, TableProps, preferences } = this.props;

    const {
      showAllMarkets,
      showAllOpenOrders,
      collapseOpenOrders
    } = preferences;

    return (
      <StyledPaper className={classes.openOrdersContainer} {...PaperProps}>
        <div className={classes.titleContainer}>
          <div
            className={classes.title}
            onClick={() => this.togglePreference('collapseOpenOrders')}
          >
            {`${I18n.translate('trade_open_orders')} (${
              this.state.orderCount
            })`}
          </div>
          <div className={classes.rightPart}>
            <div
              className={classes.switchLabel}
              onClick={() => this.togglePreference('showAllMarkets')}
            >
              {I18n.translate('trade_show_all_markets')}
            </div>
            <Checkbox
              checked={showAllMarkets}
              disabled={!isUserLoggedIn()}
              classes={{
                root: classes.checkbox,
                checked: classes.checked
              }}
              onChange={() => this.togglePreference('showAllMarkets')}
              aria-label="verticalView"
            />
            <DropdownIcon
              className={classNames(classes.dropdownIcon, {
                [classes.flip]: !collapseOpenOrders
              })}
              pathClassName={classes.dropdownIconPath}
              onClick={() => this.togglePreference('collapseOpenOrders')}
            />
          </div>
        </div>
        {!collapseOpenOrders && this.state.orderCount > 0 && (
          <Divider className={classes.divider} />
        )}
        <AnimateHeight
          duration={300}
          className={classes.animateHeightContainer}
          height={
            !collapseOpenOrders && showAllOpenOrders
              ? 'auto'
              : this.getCalculatedHeight()
          }
        >
          <OrderHistoryContainer
            orderStatus="O"
            marketCode={
              showAllMarkets ? '' : this.props.selectedMarket.market_code
            }
            onMount={this.setOrderCount}
            TableProps={TableProps}
          />
        </AnimateHeight>
        {!collapseOpenOrders &&
          this.state.orderCount > DEFAULT_SHOWN_ITEM_COUNT && (
            <div
              className={classes.openOrdersFooterStyle}
              onClick={() => this.togglePreference('showAllOpenOrders')}
            >
              <div className={classes.openOrdersFooterInfoStyle}>
                {I18n.translate(
                  'trade_showing_orders',
                  `${
                    showAllOpenOrders
                      ? this.state.orderCount
                      : this.state.shownOrdersCount
                  } / ${this.state.orderCount || 0}`
                )}
              </div>
              <div className={classes.openOrdersFooterShowMoreStyle}>
                {I18n.translate(
                  showAllOpenOrders ? 'trade_show_less' : 'trade_show_all'
                )}
                <Icon style={{ fontSize: '20px', height: '20px' }}>
                  {showAllOpenOrders ? 'arrow_drop_up' : 'arrow_drop_down'}
                </Icon>
              </div>
            </div>
          )}
      </StyledPaper>
    );
  }
}

export default withStyles(styles)(OpenOrders);

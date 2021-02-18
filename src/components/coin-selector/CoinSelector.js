import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import Tooltip from '@material-ui/core/Tooltip';
import ListItem from '@material-ui/core/ListItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ListItemText from '@material-ui/core/ListItemText';
import Clear from '@material-ui/icons/Clear';
import Search from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import NumberFormat from 'react-number-format';
import classNames from 'classnames';
import StyledPaper from '../common/StyledPaper';

import { roundDown } from '../../common/utils/numberUtil';

import I18n from '../../common/i18n/I18n';
import CoinIcon from '../coin-icon/CoinIcon';
import InputBase from '@material-ui/core/InputBase/index';
import { findDOMNode } from 'react-dom';

const styles = theme => ({
  outerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '16px',
    boxSizing: 'border-box'
  },
  coinIconContainer: {
    width: '24px',
    marginRight: '12px'
  },
  coinIcon: {
    height: '24px'
  },
  icon: {
    color: theme.colors.textColor.input,
    marginLeft: '12px'
  },
  popoverButton: {
    backgroundColor: theme.colors.background.searchBarHover,
    color: theme.colors.textColor.input,
    height: '54px',
    fontSize: '16px',
    paddingLeft: '12px'
  },
  popoverButtonText: {
    width: '72px',
    fontSize: '16px',
    textAlign: 'left',
    paddingLeft: '12px'
  },
  textField: {
    color: theme.colors.textColor.input,
    fontSize: '1.25rem'
  },
  textFieldInput: {
    padding: '8px 0 0'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    color: theme.colors.textColor.inputLabel,
    fontSize: '13px',
    fontWeight: '500'
  },
  coinListPaper: {
    backgroundColor: theme.colors.background.paper,
    borderRadius: '0 0 4px 4px',
    color: theme.colors.textColor.input,
    '@media screen and (max-width: 600px)': {
      width: '100vw !important',
      maxWidth: '100vw !important',
      left: '0 !important'
    }
  },
  list: {
    boxSizing: 'border-box',
    outline: 'none',
    padding: '0',
    maxHeight: '360px',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '16px',
      backgroundColor: theme.colors.background.paper
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '12px',
      backgroundColor: theme.colors.textColor.inputLabel,
      '&:hover': {
        backgroundColor: theme.colors.textColor.tableHeader
      },
      border: `solid 4px ${theme.colors.background.paper}`
    },
    '&::-webkit-scrollbar-track': {
      width: '10px',
      borderRadius: '12px',
      backgroundColor: theme.colors.background.paper
    }
  },
  coinListPaperPopoverOpen: {
    borderRadius: '4px 4px 0 0'
  },
  listItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.colors.textColor.input,
    backgroundColor: 'transparent'
  },
  iconAndCodeContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  searchBar: {
    height: '60px',
    borderBottom: theme.colors.borderColor.rowSeperatorBorder
  },
  searchIcon: {
    color: theme.colors.textColor.input,
    margin: '0 12px 0 16px'
  },
  clearIcon: {
    color: theme.colors.textColor.input
  },
  currencyCode: {
    fontWeight: '700'
  },
  subHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: theme.colors.textColor.inputLabel,
    fontSize: '14px',
    fontWeight: '400',
    padding: '12px',
    boxSizing: 'border-box',
    height: '48px'
  },
  subHeaderAll: {
    borderTop: theme.colors.borderColor.thinnerBorder
  },
  gutters: {
    paddingRight: '8px',
    borderTop: theme.colors.borderColor.thinnerBorder,
    borderCollapse: 'collapse',
    '&:last-child': {
      borderBottom: theme.colors.borderColor.thinnerBorder
    }
  },
  dashedBorderTop: {
    borderTop: theme.colors.borderColor.dashedBorder,
    marginTop: '8px',
    paddingTop: '8px'
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  balanceLabel: {
    color: theme.colors.textColor.tableHeader,
    fontSize: '14px'
  },
  balanceValue: {
    color: theme.colors.textColor.tableHeader,
    fontSize: '14px',
    fontWeight: '400'
  },
  useAllBalanceButton: {
    color: theme.colors.textColor.blue,
    cursor: 'pointer',
    fontWeight: '700',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  tooltip: {
    fontSize: '13px'
  },
  error: {
    color: theme.colors.textColor.red
  },
  popper: {
    zIndex: '100000'
  },
  disabled: {
    color: theme.colors.textColor.inputLabel
  },
  listBalanceArea: {
    fontSize: '12px',
    textAlign: 'right'
  },
  listBalanceLabel: {
    color: theme.colors.textColor.inputLabel
  },
  listBalanceValue: {
    color: theme.colors.textColor.input,
    fontWeight: '500'
  }
});

class CoinSelector extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      filteredItems: {
        all: [],
        popular: []
      },
      inputValue: '',
      coinListNode: this.coinListPopperBase,
      coinListAnchor: findDOMNode(this.coinListPopperBase),
      coinListOpen: false
    };
  }

  coinListPopperBase = null;
  popularCoinsFirstNode = null;
  searchBarInput = null;

  componentDidMount() {
    const { currencyList } = this.props;
    this.setState({
      filteredItems: currencyList
    });
  }

  componentDidUpdate(prevProps) {
    if (
      this.isCurrencyListEmpty(prevProps.currencyList) &&
      !this.isCurrencyListEmpty(this.props.currencyList)
    ) {
      this.applyFilter(this.state.inputValue);
    }
  }

  setAnchor = node => {
    if (node && node !== this.state.coinListNode) {
      this.setState({
        coinListNode: node,
        coinListAnchor: findDOMNode(node)
      });
    }
  };

  isCurrencyListEmpty = list => {
    return !(
      list &&
      list.all &&
      list.popular &&
      list.popular.length > 0 &&
      list.all.length > 0
    );
  };

  handleCoinInputChange = evt => {
    this.applyFilter(evt.target.value);
  };

  applyFilter = inputValue => {
    this.setState({
      filteredItems: {
        popular: this.props.currencyList.popular.filter(
          item =>
            item.currency_code
              .toLowerCase()
              .startsWith(inputValue.toLowerCase()) ||
            item.name.toLowerCase().startsWith(inputValue.toLowerCase())
        ),
        all: this.props.currencyList.all.filter(
          item =>
            item.currency_code
              .toLowerCase()
              .startsWith(inputValue.toLowerCase()) ||
            item.name.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      },
      inputValue
    });
  };

  handleCoinSelectionChange = item => {
    this.closePopper();
    if (this.props.onSelectedCoinChange) {
      this.props.onSelectedCoinChange(item);
    }
  };

  closePopper = () => {
    this.setState({ inputValue: '', filteredItems: this.props.currencyList });
    this.toggleCoinListPopper();
  };

  toggleCoinListPopper = () => {
    this.setState({ coinListOpen: !this.state.coinListOpen });
  };

  handleAmountChange = evt => {
    this.onAmountChange(evt.target.value);
  };

  onAmountChange = value => {
    if (this.props.onAmountChange) {
      this.props.onAmountChange(value);
    }
  };

  handleListItemKeyDown = ev => {
    const { inputValue } = this.state;
    if (ev.key.length === 1 && /[a-zA-Z0-9-_ ]/.test(ev.key)) {
      ev.preventDefault();
      const newEntry = inputValue + ev.key;
      this.applyFilter(newEntry);
      this.searchBarInput.focus();
    }
    if (inputValue && ev.key === 'Backspace') {
      const newEntry = inputValue.substring(0, inputValue.length - 1);
      this.applyFilter(newEntry);
    }
  };

  useAllBalance = () => {
    const { selectedCoin, decimalScale } = this.props;

    this.onAmountChange(
      roundDown(
        this.getAvailableBalance(selectedCoin.currency_code),
        decimalScale
      )
    );
  };

  getAvailableBalance = currency_code => {
    const { accountLines } = this.props;
    if (accountLines && accountLines.length > 0) {
      const filteredLine = accountLines.filter(
        item => item.currency === currency_code
      );
      if (filteredLine && filteredLine.length > 0) {
        return filteredLine[0].available_balance;
      }
    }
    return 0;
  };

  render() {
    const {
      classes,
      label,
      selectedCoin,
      amountDisabled,
      amount,
      decimalScale,
      error,
      errorText
    } = this.props;
    const { filteredItems, inputValue, coinListOpen } = this.state;
    const availableBalance = this.getAvailableBalance(
      selectedCoin.currency_code
    );

    return (
      <div>
        <div ref={node => this.setAnchor(node)} />
        <StyledPaper
          className={classNames(classes.outerContainer, {
            [classes.coinListPaperPopoverOpen]: coinListOpen
          })}
        >
          <div className={classes.row}>
            <div className={classes.column}>
              <div
                className={classNames(classes.label, {
                  [classes.error]: error
                })}
              >
                {label}
              </div>
              <NumberFormat
                customInput={InputBase}
                decimalSeparator="."
                decimalScale={decimalScale}
                error={error}
                fixedDecimalScale
                id="amount"
                className={classes.textField}
                classes={{
                  error: classes.error,
                  disabled: classes.disabled,
                  input: classes.textFieldInput
                }}
                disabled={amountDisabled}
                value={amount}
                onChange={this.handleAmountChange}
              />
            </div>
            <Button
              className={classes.popoverButton}
              onClick={this.toggleCoinListPopper}
              disableRipple
              disableTouchRipple
            >
              <CoinIcon
                currency={selectedCoin.currency_code}
                color="color"
                classes={{
                  container: classes.coinIconContainer,
                  image: classes.coinIcon
                }}
              />
              <div className={classes.popoverButtonText}>
                {selectedCoin.currency_code}
              </div>
              <ArrowDropDownIcon className={classes.icon} />
            </Button>
          </div>
          <div
            className={classNames(
              classes.row,
              classes.dashedBorderTop,
              classes.spaceBetween
            )}
          >
            <div
              className={classNames(classes.balanceLabel, {
                [classes.error]: error
              })}
            >
              {error
                ? errorText
                : `${I18n.translate('account_available_balance')}:`}
            </div>
            <div className={classes.balanceValue}>
              {amountDisabled ? (
                `${availableBalance} ${selectedCoin.currency_code}`
              ) : (
                <Tooltip
                  title={I18n.translate('general_use_all_balance')}
                  classes={{ tooltip: classes.tooltip }}
                >
                  <div
                    className={classes.useAllBalanceButton}
                    onClick={this.useAllBalance}
                  >
                    {`${availableBalance} ${selectedCoin.currency_code}`}
                  </div>
                </Tooltip>
              )}
            </div>
          </div>
        </StyledPaper>
        <Popper
          open={this.state.coinListOpen}
          anchorEl={this.state.coinListAnchor}
          onClose={this.toggleCoinListPopper}
          className={classes.popper}
        >
          <ClickAwayListener onClickAway={this.closePopper}>
            <Paper
              elevation={1}
              classes={{ root: classes.coinListPaper }}
              style={{
                width: this.state.coinListAnchor
                  ? this.state.coinListAnchor.offsetWidth
                  : 0
              }}
            >
              <div className={classNames(classes.row, classes.searchBar)}>
                <div className={classes.row}>
                  <Search className={classes.searchIcon} />
                  <InputBase
                    inputRef={node => {
                      this.searchBarInput = node;
                    }}
                    autoFocus
                    className={classes.textField}
                    value={inputValue}
                    placeholder={I18n.translate('general_search')}
                    onChange={this.handleCoinInputChange}
                    onKeyDown={ev => {
                      if (ev.key === 'ArrowDown') {
                        ev.preventDefault();
                        if (
                          filteredItems.popular.length > 0 &&
                          this.popularCoinsFirstNode
                        ) {
                          this.popularCoinsFirstNode.focus();
                        } else if (
                          filteredItems.all.length > 0 &&
                          this.allCoinsFirstNode
                        ) {
                          this.allCoinsFirstNode.focus();
                        }
                      }
                    }}
                  />
                </div>
                <IconButton
                  classes={{ root: classes.clearIcon }}
                  onClick={this.closePopper}
                >
                  <Clear />
                </IconButton>
              </div>
              <MenuList classes={{ root: classes.list }}>
                {filteredItems.popular.length > 0 && (
                  <div className={classes.subHeader}>
                    {I18n.translate('currency_list_popular')}
                  </div>
                )}
                {filteredItems.popular.map((item, index) => (
                  <ListItem
                    key={item.currency_code}
                    classes={{ gutters: classes.gutters }}
                    button
                    ref={node => {
                      if (index === 0) {
                        this.popularCoinsFirstNode = node;
                      }
                    }}
                    onKeyDown={this.handleListItemKeyDown}
                    onClick={() => this.handleCoinSelectionChange(item)}
                  >
                    <ListItemText
                      primary={
                        <div className={classes.listItemContainer}>
                          <div className={classes.iconAndCodeContainer}>
                            <CoinIcon
                              currency={item.currency_code}
                              color="color"
                              classes={{
                                container: classes.coinIconContainer,
                                image: classes.coinIcon
                              }}
                            />
                            <div>{`${item.name} (${item.currency_code})`}</div>
                          </div>
                          <div className={classes.listBalanceArea}>
                            <div className={classes.listBalanceLabel}>
                              {I18n.translate(
                                'market_bar_available',
                                ''
                              ).trim()}
                            </div>
                            <div className={classes.listBalanceValue}>
                              {`${this.getAvailableBalance(
                                item.currency_code
                              )} ${item.currency_code}`}
                            </div>
                          </div>
                        </div>
                      }
                    />
                  </ListItem>
                ))}
                {filteredItems.all.length > 0 && (
                  <div
                    className={classNames(
                      classes.subHeader,
                      classes.subHeaderAll
                    )}
                  >
                    {I18n.translate('currency_list_all')}
                  </div>
                )}
                {filteredItems.all.map((item, index) => (
                  <ListItem
                    key={item.currency_code}
                    classes={{ gutters: classes.gutters }}
                    button
                    onClick={() => this.handleCoinSelectionChange(item)}
                    ref={node => {
                      if (index === 0) {
                        this.allCoinsFirstNode = node;
                      }
                    }}
                    onKeyDown={this.handleListItemKeyDown}
                  >
                    <ListItemText
                      primary={
                        <div className={classes.listItemContainer}>
                          <div className={classes.iconAndCodeContainer}>
                            <CoinIcon
                              currency={item.currency_code}
                              color="color"
                              classes={{
                                container: classes.coinIconContainer,
                                image: classes.coinIcon
                              }}
                            />
                            <div>{`${item.name} (${item.currency_code})`}</div>
                          </div>
                          <div className={classes.listBalanceArea}>
                            <div className={classes.listBalanceLabel}>
                              {I18n.translate(
                                'market_bar_available',
                                ''
                              ).trim()}
                            </div>
                            <div className={classes.listBalanceValue}>
                              {`${this.getAvailableBalance(
                                item.currency_code
                              )} ${item.currency_code}`}
                            </div>
                          </div>
                        </div>
                      }
                    />
                  </ListItem>
                ))}
              </MenuList>
            </Paper>
          </ClickAwayListener>
        </Popper>
      </div>
    );
  }
}

export default withStyles(styles)(CoinSelector);

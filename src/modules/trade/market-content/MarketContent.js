import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import history from '../../../common/history';
import OpenOrdersContainer from './open-orders/OpenOrdersContainer';
import OrderBookContainer from './order-book/OrderBookContainer';
import HistoryContentContainer from './history-content/HistoryContentContainer';

const styles = theme => ({
  pageStyle: {
    display: 'flex',
    flexDirection: 'column'
  }
});

class MarketContent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      historyType: this.isVertical() ? 'userHistory' : 'marketHistory'
    };
  }

  componentDidMount() {
    const isAdvancedTradeView =
      this.props.preferences && this.props.preferences.advancedTradeView;
    if (isAdvancedTradeView) {
      history.push('/advanced');
    }
  }

  isVertical = () => {
    return this.props.tradeViewStyle
      ? this.props.tradeViewStyle === 'vertical'
      : this.props.currentTradeViewStyle === 'vertical';
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.pageStyle}>
        <OpenOrdersContainer />
        <OrderBookContainer />
        <HistoryContentContainer />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(MarketContent);

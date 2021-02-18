import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from './header/Header';
import InfoPaneContainer from './info-pane/InfoPaneContainer';
import MarketPane from './market-pane/MarketPane';
import MobileInfo from './mobile-info/MobileInfo';
import bg from '../../assets/images/bg.jpg';
import socketHelper from '../../api/socketHelper';
import DocumentTitle from 'react-document-title';
import FeaturesPane from './features-pane/FeaturesPane';
import Footer from './footer/Footer';
import HeaderMenu from './header/HeaderMenu';
import I18n from '../../common/i18n/I18n';
import SessionStorage from '../../common/utils/SessionStorage';
import queryString from 'query-string';

const styles = theme => ({
  root: {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover'
  }
});

class LandingPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggleView = this.toggleView.bind(this);

    this.state = {
      showMenu: false
    };
  }

  componentWillMount() {
    let params = queryString.parse(this.props.location.search);
    if (params && params.ref) {
      SessionStorage.setItem('REF_ID', params.ref);
    }
  }

  componentDidMount() {
    socketHelper.subscribeToTickers();
  }

  componentWillUnmount() {
    socketHelper.unsubscribeFromTickers();
  }

  toggleView(open) {
    this.setState({ showMenu: open });
  }

  render() {
    const { showMenu } = this.state;
    const { classes, tickers } = this.props;

    return (
      <DocumentTitle
        title={
          tickers && tickers.length > 0 && tickers[0]
            ? `(${tickers[0].last_price} ${
                tickers[0].market.counter_currency_code
              }) ${I18n.translate('site_title')}`
            : I18n.translate('site_title')
        }
      >
        <div>
          <div className={classes.root}>
            <div className="container">
              <Header onClick={this.toggleView} />
              {showMenu ? <HeaderMenu /> : <InfoPaneContainer />}
            </div>
          </div>
          <MarketPane tickers={tickers} />
          <MobileInfo />
          <FeaturesPane />
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}

export default withStyles(styles)(LandingPage);

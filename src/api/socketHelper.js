import Socket from './socket';
import ReduxStore from '../common/redux/ReduxStore';
import { updateOrderBook } from './../modules/order-book/orderBookActions';
import { updateTickers } from '../components/market-bar/MarketBarActions';


import { showSnackbar } from '../components/page/PageActions';
import { logout } from '../modules/login/LoginActions';
import LocalStorage from '../common/utils/LocalStorage';
import signRequest from '../common/utils/signRequest';
import { pushAnnouncementIfNeeded } from '../common/utils/announcementHelper';
import { isUserLoggedIn } from '../modules/login/loginHelper';
import { PRIVATE_SOCKET_ACTIONS } from './PrivateSocketActions';
import { getAnnouncements } from '../modules/user/UserActions';
import { updateGroupedTickers } from '../modules/instant-trade/GroupedTickersActions';

const socketHelper = {
  subscribeToOrderBook,
  subscribeToTickers,
  unsubscribeFromTickers,
  subscribeToGroupedTickers,
  unsubscribeFromGroupedTickers,
  loginPrivateSocket,
  logoutPrivateSocket
};

function subscribeToOrderBook() {
  const state = ReduxStore.store.getState();
  if (
    state.market &&
    state.market.selectedMarket &&
    state.market.selectedMarket.market_code
  ) {
    if (typeof subscribeToOrderBook.currentMarketCode === 'undefined') {
      subscribeToOrderBook.currentMarketCode =
        state.market.selectedMarket.market_code;
      subscribeToMarket();
    } else if (
      subscribeToOrderBook.currentMarketCode !==
      state.market.selectedMarket.market_code
    ) {
      Socket.emit('unsubscribe', subscribeToOrderBook.currentMarketCode);
      subscribeToOrderBook.currentMarketCode =
        state.market.selectedMarket.market_code;
      subscribeToMarket();
    }
  } else if (typeof subscribeToOrderBook.currentMarketCode === 'undefined') {
    subscribeToOrderBook.currentMarketCode = 'BTCTRY';
    subscribeToMarket();
  }
}

function subscribeToMarket() {
  if (!Socket.socket || !Socket.socket.id) {
    Socket.connect();
  }
  Socket.emit('subscribe', subscribeToOrderBook.currentMarketCode);
  Socket.on('update_market', resp => {
    if (resp) {
      try {
        ReduxStore.store.dispatch(updateOrderBook(resp));
      } catch (exp) {}
    }
  });

  if (Socket.listeners('reconnect').indexOf(reconnectToMarket) === -1) {
    Socket.on('reconnect', reconnectToMarket);
  }

  if (isUserLoggedIn()) {
    loginPrivateSocket();
  }
}

function reconnectToMarket() {
  Socket.emit('subscribe', subscribeToOrderBook.currentMarketCode);
}

function subscribeToTickers() {
  if (!subscribeToOrderBook.subscribeCount) {
    subscribeToOrderBook.subscribeCount = 1;
    Socket.emit('subscribe', 'TICKER');

    if (!Socket.hasListeners('update_ticker')) {
      Socket.on('update_ticker', resp => {
        if (resp) {
          try {
            ReduxStore.store.dispatch(updateTickers(resp));
          } catch (exp) {}
        }
      });
    }

    if (Socket.listeners('reconnect').indexOf(reconnectToTicker) === -1) {
      Socket.on('reconnect', reconnectToTicker);
    }
  } else {
    subscribeToOrderBook.subscribeCount++;
  }
}

function reconnectToTicker() {
  Socket.emit('subscribe', 'TICKER');
}

function unsubscribeFromTickers() {
  if (subscribeToOrderBook.subscribeCount) {
    subscribeToOrderBook.subscribeCount--;
    if (subscribeToOrderBook.subscribeCount === 0) {
      Socket.emit('unsubscribe', 'TICKER');
      Socket.off('reconnect', reconnectToTicker);
    }
  }
}

function loginPrivateSocket(reconnect = false) {
  const token = LocalStorage.getItem('TOKEN');
  const username = LocalStorage.getItem('USER_NAME');
  const channel = 'web';
  const timestamp = new Date().getTime();
  const data = { username, timestamp, channel };
  const signature = signRequest('', '', token, data);

  if (isUserLoggedIn()) {
    Socket.emit('login', data, signature, (status, data) => {
      if (status === 401) {
        LocalStorage.removeItem('TOKEN');
        LocalStorage.removeItem('USER_NAME');

        subscribeToOrderBook.loggedIn = false;

        logout();
      } else {
        subscribeToOrderBook.loggedIn = true;
        login();

        ReduxStore.store.dispatch({
          type: PRIVATE_SOCKET_ACTIONS.CONNECT,
          payload: {}
        });
        if (reconnect) {
          ReduxStore.store.dispatch({
            type: PRIVATE_SOCKET_ACTIONS.RECONNECT,
            payload: {}
          });
        }
        ReduxStore.store.dispatch(getAnnouncements());
      }
    });
  }
}

function login() {
  if (subscribeToOrderBook.loggedIn) {
    if (!Socket.hasListeners('message')) {
      Socket.on('message', data => {
        if (data && data.trx_code) {
          const action = {
            type: data.trx_code,
            payload: { ...data, highlight: true }
          };

          if (data.message) {
            ReduxStore.store.dispatch(showSnackbar(data));
          }
          if (data.trx_code === PRIVATE_SOCKET_ACTIONS.ANNOUNCEMENT) {
            pushAnnouncementIfNeeded(data);
          } else {
            ReduxStore.store.dispatch(action);
          }
        }
      });
    }

    if (!Socket.hasListeners('logout')) {
      Socket.on('logout', () => {
        LocalStorage.removeItem('TOKEN');
        LocalStorage.removeItem('USER_NAME');

        logout();
      });
    }

    if (Socket.listeners('reconnect').indexOf(reconnectPrivateSocket) === -1) {
      Socket.on('reconnect', reconnectPrivateSocket);
    }

    if (!Socket.hasListeners('disconnect')) {
      Socket.on('disconnect', () => {
        ReduxStore.store.dispatch({
          type: PRIVATE_SOCKET_ACTIONS.DISCONNECT,
          payload: {}
        });
      });
    }
  }
}

function reconnectPrivateSocket() {
  if (isUserLoggedIn()) {
    loginPrivateSocket(true);
  }
}

function logoutPrivateSocket() {
  const token = LocalStorage.getItem('TOKEN');
  const username = LocalStorage.getItem('USER_NAME');
  if (isUserLoggedIn()) {
    const channel = 'web';
    const timestamp = new Date().getTime();
    const data = { username, timestamp, channel };
    const signature = signRequest('', '', token, data);

    Socket.emit('logout', data, signature, status => {
      Socket.off('reconnect', reconnectPrivateSocket);
      subscribeToOrderBook.loggedIn = false;
    });
  }
}

function subscribeToGroupedTickers(marketGroupCode) {
  Socket.emit('subscribe', `${marketGroupCode}_TICKERS`);
  if (!Socket.hasListeners('update_tickers')) {
    Socket.on('update_tickers', resp => {
      if (resp) {
        try {
          const counterCurrencyCode = resp.counter_currency_code;
          delete resp.counter_currency_code;
          ReduxStore.store.dispatch(
            updateGroupedTickers(counterCurrencyCode, resp)
          );
        } catch (exp) {}
      }
    });
  }

  const reconnectToGroupedTickers = () => {
    Socket.emit('subscribe', `${marketGroupCode}_TICKERS`);
  };
  Socket.on('reconnect', reconnectToGroupedTickers);
}

function unsubscribeFromGroupedTickers(marketGroupCode) {
  Socket.emit('unsubscribe', `${marketGroupCode}_TICKERS`);

  //Find the related reconnect callback and remove it
  Socket.socket._callbacks['$reconnect'].forEach(cb => {
    if (cb && cb.name === 'reconnectToGroupedTickers') {
      Socket.off('reconnect', cb);
    }
  });
}

export default socketHelper;

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import storage from 'redux-persist/lib/storage';

import orderBook from '../../modules/order-book/orderBookReducer';
import login from '../../modules/login/LoginReducer';
import user from '../../modules/user/UserReducer';
import preferencesReducer from '../../modules/preferences/PreferencesReducer';
import theme from './../theme/themeReducer';
import marketContent from '../../modules/trade/market-content/MarketContentReducer';
import orderHistory from '../../modules/trade/market-content/order-history/OrderHistoryReducer';
import page from '../../components/page/PageReducer';
import market from '../../components/market-bar/MarketBarReducer';
import withdrawal from '../../modules/account/withdraw/withdraw-dialog/WithdrawDialogReducer';
import deposit from '../../modules/account/deposit/deposit-dialog/DepositDialogReducer';
import transferHistory from '../../modules/account/transfers/transfer-history/TransferHistoryReducer';
import tradeHistory from '../../modules/account/trade-history/TradeHistoryReducer';
import activityHistory from '../../modules/settings/activity-history/ActivityHistoryReducer';
import mobileAccess from '../../modules/settings/security/mobile-access/MobileAccessReducer';
import apiAccess from '../../modules/settings/security/api-access/APIAccessReducer';
import authentication from '../../modules/settings/security/authentication/AuthenticationReducer';
import verification from '../../components/verification-form/VerificationReducer';
import fees from '../../modules/policy-page/FeesReducer';
import limits from '../../modules/account/limits/LimitsReducer.js';
import verify from '../../modules/verify/VerifyReducer';
import exen from '../../modules/exen/ExenReducer';
import bulletin from '../../modules/bulletin/BulletinReducer';
import connectionStatus from '../../components/connection-status/ConnectionStatusReducer';
import groupedTickers from '../../modules/instant-trade/GroupedTickersReducer';
import instantTradePane from '../../modules/instant-trade/instant-trade-pane/InstantTradePaneReducer';

const preferencesConfig = {
  key: 'preferences',
  storage: storage,
  stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers({
  preferences: persistReducer(preferencesConfig, preferencesReducer),
  orderBook,
  login,
  user,
  marketContent,
  orderHistory,
  page,
  market,
  withdrawal,
  deposit,
  transferHistory,
  tradeHistory,
  activityHistory,
  theme,
  mobileAccess,
  apiAccess,
  authentication,
  verification,
  verify,
  limits,
  exen,
  connectionStatus,
  fees,
  groupedTickers,
  instantTradePane,
  bulletin
});

export default rootReducer;

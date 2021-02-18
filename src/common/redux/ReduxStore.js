import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import { multiClientMiddleware } from 'redux-axios-middleware';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './rootReducer';
import { endpoints } from '../config/config';
import apiInterceptor from './../apiInterceptor';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: [
    'login',
    'orderBook',
    'orderHistory',
    'transferHistory',
    'marketContent',
    'page',
    'withdrawal',
    'deposit',
    'mobileAccess',
    'apiAccess',
    'authentication',
    'verification',
    'verify',
    'limits',
    'tradeHistory',
    'activityHistory',
    'exen',
    'connectionStatus',
    'preferences',
    'fees'
  ]
};

const defaultAxiosclient = axios.create({
  baseURL: endpoints.api,
  responseType: 'json'
});

const bulletinAxiosClient = axios.create({
  baseURL: 'https://sascyiknn0.execute-api.eu-west-1.amazonaws.com/default',
  responseType: 'json'
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

class ReduxStore {
  constructor() {
    this.store = createStore(
      persistedReducer,
      composeWithDevTools(
        applyMiddleware(
          multiClientMiddleware(
            {
              default: {
                client: defaultAxiosclient
              },
              bulletin: {
                client: bulletinAxiosClient
              }
            },
            {
              interceptors: apiInterceptor,
              returnRejectedPromiseOnError: true
            }
          )
        )
      )
    );

    this.persistor = persistStore(this.store);
  }
}

export default new ReduxStore();

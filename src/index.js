import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import TagManager from 'react-gtm-module';
import App from './App';
import './index.scss';

const tagManagerArgs = {
  gtmId: 'GTM-KK2T564'
};

TagManager.initialize(tagManagerArgs);

ReactDOM.render(<App />, document.getElementById('root'));

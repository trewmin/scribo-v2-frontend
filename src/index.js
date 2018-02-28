import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import authReducer from './reducers/authReducer'

import { BrowserRouter } from 'react-router-dom'


const allReducers = combineReducers({
  auth: authReducer
})

const store = createStore(
  allReducers,
  {
    auth: {
            user: "",
            userIsLoggedIn: false
          }
  },
  window.devToolsExtension && window.devToolsExtension()
);

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ), document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import authReducer from './reducers/authReducer';

import { BrowserRouter } from 'react-router-dom';

import thunk from "redux-thunk";


const allReducers = combineReducers({
  auth: authReducer
})

const allStoreEnhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension && window.devToolsExtension()
)

const store = createStore(
  allReducers,
  {
    auth: {
            user: "",
            userIsLoggedIn: false
          }
  },
  allStoreEnhancers
);

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ), document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import authReducer from './reducers/authReducer';
import curLectReducer from './reducers/curLectReducer';
import curNbReducer from './reducers/curNbReducer';

import { BrowserRouter } from 'react-router-dom';

import thunk from "redux-thunk";


const allReducers = combineReducers({
  auth: authReducer,
  currentLect: curLectReducer,
  currentNb: curNbReducer
})

const allStoreEnhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension && window.devToolsExtension()
)

const store = createStore(
  allReducers,
  {
    auth: {
      user: {},
      userIsLoggedIn: false
    },
    currentLect: {
      id: null,
      title: "",
      date_time: "",
      admin: {},
      users: [],
      notebooks: []
    },
    currentNb: {
      id: null,
      lecture_id: null,
      user_id: null,
      content: "",
      updated_at: "",
      user: {},
      lecture: {}
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

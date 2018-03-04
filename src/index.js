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
import allUsersReducer from './reducers/allUsersReducer';

import { BrowserRouter } from 'react-router-dom';

import thunk from "redux-thunk";

import { ActionCableProvider } from 'react-actioncable-provider';


const allReducers = combineReducers({
  auth: authReducer,
  curLect: curLectReducer,
  curNb: curNbReducer,
  allUsers: allUsersReducer
})

const allStoreEnhancers = compose(
  applyMiddleware(thunk),
  // window.devToolsExtension && window.devToolsExtension()
)

const store = createStore(
  allReducers,
  {
    auth: {
      user: {},
      userIsLoggedIn: false
    },
    curLect: {
      id: null,
      title: "",
      date_time: "",
      admin: {},
      users: [],
      notebooks: []
    },
    curNb: {
      id: null,
      lecture_id: null,
      user_id: null,
      content: "",
      updated_at: "",
      user: {},
      lecture: {}
    },
    allUsers: []
  },
  allStoreEnhancers
);

const wsBaseURL = 'ws://localhost:3001/cable'

ReactDOM.render((
  <ActionCableProvider url={wsBaseURL}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ ActionCableProvider>
  ), document.getElementById('root'));
registerServiceWorker();

import React, { Component } from 'react';

import { connect } from 'react-redux';

import { updateAuth } from './actions/authActions';

import { Route, Switch, Redirect, withRouter, Link } from 'react-router-dom'

import LoggedOutContainer from './components/loggedout/LoggedOutContainer';
import HomeContainer from './components/home/HomeContainer';

class App extends Component {

  render() {
    console.log(this.props);

    return (
      <div className="App">
        <img src='https://i.pinimg.com/originals/be/a8/a5/bea8a582a7376eee317c7a17f2f793ea.jpg' alt='WORKS'/>
        <Switch>
          <Route exact path='/' render={()=>
            {
              return this.props.auth.userIsLoggedIn ? <Redirect to="/home"/> : <LoggedOutContainer />
            }
            } />

         <Route exact path='/home' render={()=>
            {
              return this.props.auth.userIsLoggedIn ? <HomeContainer /> : <LoggedOutContainer />
            }
            } />
            
        </Switch>
      </div>
    );
  }
}

export default connect((state) => ({ auth: state.auth }), { updateAuth })(withRouter(App));

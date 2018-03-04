import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Route, Switch, Redirect, withRouter, Link } from 'react-router-dom'

import LoggedOutContainer from './components/loggedout/LoggedOutContainer';
import HomeContainer from './components/home/HomeContainer';
import LectureContainer from './components/lecture/LectureContainer';
import NewLectureContainer from './components/newlecture/NewLectureContainer';

import { curUser, logOut } from './actions/authActions';


class App extends Component {

  componentDidMount = () => {
    this.props.curUser()
  }

  componentDidUpdate = () => {

  }

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <h1> Screebo </h1>
        <img src='https://shoeuntied.files.wordpress.com/2016/09/sealion.jpg' alt='WORKS'/>

        <Switch>
          <Route exact path='/' render={( )=>
            {
              return this.props.auth.userIsLoggedIn ? <Redirect to="/home"/> : <LoggedOutContainer />
            }
            } />

         <Route exact path='/home' render={( )=>
            {
              return this.props.auth.userIsLoggedIn ? <HomeContainer /> : <LoggedOutContainer />
            }
            } />

        <Route exact path='/lecture/new' render={( )=>
            {
              return this.props.auth.userIsLoggedIn ? <NewLectureContainer  /> : <LoggedOutContainer />
            }
            } />

        <Route exact path='/lecture/:id' render={(routerProps)=>
           {
             return this.props.auth.userIsLoggedIn ? <LectureContainer id={routerProps.match.params.id}  /> : <LoggedOutContainer />
           }
           } />

        </Switch>

        <div>
          {this.renderMenuButtons()}
        </div>

      </div>
    );
  }

  renderMenuButtons = () => {
    if (this.props.auth.userIsLoggedIn) {
      return (
        <div>
        <br/>
          <Link to='/home'><button> Home </button></Link>
          <Link to='/lecture/new'><button> New Lecture </button></Link>
          <button onClick={ this.props.logOut }> Log Out </button>
        </div>
      )
    }
  }

}

export default withRouter(connect((state) => ({ auth: state.auth }), { curUser, logOut })(App));

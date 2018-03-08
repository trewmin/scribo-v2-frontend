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

  render() {
    return (
      <div id="App">
        <div id="Menu">
          {this.renderMenuButtons()}
        </div>

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

        <Route exact path='/note/new' render={( )=>
            {
              return this.props.auth.userIsLoggedIn ? <NewLectureContainer  /> : <LoggedOutContainer />
            }
            } />

        <Route exact path='/note/:id' render={(routerProps)=>
           {
             return this.props.auth.userIsLoggedIn ? <LectureContainer id={routerProps.match.params.id}  /> : <LoggedOutContainer />
           }
           } />

        </Switch>

      </div>
    );
  }

  renderMenuButtons = () => {
    if (this.props.auth.userIsLoggedIn) {
      return (
        <div>
        <br/>
          <Link to='/home' alt={"Home"}><button className="MenuButton" alt={"Home"}> <i class="material-icons">home</i> </button></Link>
          <Link to='/note/new' alt={"New Note"}><button className="MenuButton" alt={"New Note"}> <i class="material-icons">note_add</i> </button></Link>
          <Link to='/' alt={"Sign Out"}><button onClick={ this.props.logOut } className="MenuButton" alt={"Sign Out"}> <i class="material-icons">exit_to_app</i> </button></Link>
        </div>
      )
    }
  }

}

export default withRouter(connect((state) => ({ auth: state.auth }), { curUser, logOut })(App));

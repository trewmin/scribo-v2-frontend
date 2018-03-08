import React, { Component } from 'react';

import { connect } from 'react-redux';

import { login, signUp } from '../../actions/authActions';

class LoggedOutContainer extends Component {

  handleLogin = (e) => {
    e.preventDefault();
    let user_name = e.target.children[0].value
    let password = e.target.children[2].value
    this.props.login(user_name, password)
  }

  handleSignUp = (e) => {
    e.preventDefault();
    console.log(e.target.children);
    let first_name = e.target.children[0].value
    let last_name = e.target.children[2].value
    let user_name = e.target.children[5].value
    let password = e.target.children[8].value
    let password_confirmation = e.target.children[10].value
    this.props.signUp(user_name, first_name, last_name, password, password_confirmation)
  }

  render() {
    return (
      <div className="Main">

        <div className="Left">
        <h1>Logged Out</h1>
        <form onSubmit={this.handleLogin}>
          <input type='text' placeholder='Username'/> <br/>
          <input type='password' placeholder='Password'/> <br/><br/>
          <input type='submit' value='Log In'/>
        </form>
        </div>

        <div className="Right">
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSignUp}>
          <input type='text' placeholder='First Name'/> <br/>
          <input type='text' placeholder='Last Name'/> <br/><br/>
          <input type='text' placeholder='Username'/> <br/><br/>
          <input type='password' placeholder='Password'/> <br/>
          <input type='password' placeholder='Confirm Password'/> <br/><br/>
          <input type='submit' value='Sign Up'/>
        </form>
        </div>
      </div>
    )
  }

}

export default connect((state) => ({ auth: state.auth }), { login, signUp })(LoggedOutContainer);

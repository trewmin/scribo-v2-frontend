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
        <div id="LeftLoggedOut">
        <div className="Logo">stamp</div>
        <div className="Slogan">
          take notes with<br/>
          video timestamps
        </div>
        <form onSubmit={this.handleLogin}>
          <input type='text' placeholder='Username' className="LoggedOutInput"/> <br/>
          <input type='password' placeholder='Password' className="LoggedOutInput"/> <br/><br/>
          <input type='submit' value='Sign In' className="LoggedOutButton"/>
        </form>
        </div>
        </div>

        <div className="Right">
        <div id="RightLoggedOut">
          <div className="SignUpMsg">Don’t have a<br/>
          Stamp Account?</div>
          <form onSubmit={this.handleSignUp}>
            <input type='text' placeholder='First Name'className="LoggedOutInput"/> <br/>
            <input type='text' placeholder='Last Name'className="LoggedOutInput"/> <br/><br/>
            <input type='text' placeholder='Username'className="LoggedOutInput"/> <br/><br/>
            <input type='password' placeholder='Password'className="LoggedOutInput"/> <br/>
            <input type='password' placeholder='Confirm Password'className="LoggedOutInput"/> <br/><br/>
            <input type='submit' value='Sign Up'className="LoggedOutButton"/>
          </form>
        </div>
        </div>
      </div>
    )
  }

}

export default connect((state) => ({ auth: state.auth }), { login, signUp })(LoggedOutContainer);

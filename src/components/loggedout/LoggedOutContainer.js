import React, { Component } from 'react';

import { connect } from 'react-redux';

import { login } from '../../actions/authActions';

class LoggedOutContainer extends Component {

  handleLogin = (e) => {
    e.preventDefault();
    let user_name = e.target.children[0].value
    let password = e.target.children[2].value
    this.props.login(user_name, password)
  }

  render() {
    return (
      <div>
        <h1>Logged Out</h1>
        <form onSubmit={this.handleLogin}>
          <input type='text' placeholder='Username'/> <br/>
          <input type='password' placeholder='Password'/> <br/>
          <input type='submit' value='Log In'/>
        </form>
      </div>
    )
  }

}

export default connect((state) => ({ auth: state.auth }), { login })(LoggedOutContainer);

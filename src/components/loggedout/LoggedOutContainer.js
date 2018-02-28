import React, { Component } from 'react';

import { connect } from 'react-redux';

import { updateAuth } from '../../actions/authActions';

class LoggedOutContainer extends Component {

  render() {
    return (
      <div>
        <h1>Logged Out</h1>
          <input type='text' placeholder='Username'/><br/>
          <input type='password' placeholder='Password'/><br/>
          <button>Sign In</button>
      </div>
    )
  }

}

export default connect((state) => ({ auth: state.auth }), { updateAuth })(LoggedOutContainer);

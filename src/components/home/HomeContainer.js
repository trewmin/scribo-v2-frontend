import React, { Component } from 'react';

import { connect } from 'react-redux';

import { fetchCurUser } from '../../actions/curUserActions';

class HomeContainer extends Component {

  componentWillMount = () => {
    this.props.fetchCurUser(this.props.auth.user.id)
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h2>Welcome, {this.props.currentUser.first_name}</h2>
      </div>
    )
  }

}

export default connect((state) => ({ auth: state.auth, currentUser: state.currentUser }), { fetchCurUser })(HomeContainer);

import React, { Component } from 'react';

import { connect } from 'react-redux';

import { fetchCurLect } from '../../actions/curLectActions';

import UserListing from './userListing';

class LectureContainer extends Component {

  componentWillMount = () => {
    this.props.fetchCurLect(this.props.id)
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>{this.props.currentLect.title}</h1>
        <h3>Host: {this.props.currentLect.admin.first_name} {this.props.currentLect.admin.last_name}</h3>
        <div>
        <h3>Users:</h3>
        {this.renderUsers()}
        </div>
      </div>
    )
  }

  renderUsers = () => {
    return this.props.currentLect.users.map( user => {
      return(<UserListing user={user} key={user.id}/>)
    })
  }

}

export default connect((state) => ({ currentUser: state.currentUser, currentLect: state.currentLect}), { fetchCurLect })(LectureContainer);

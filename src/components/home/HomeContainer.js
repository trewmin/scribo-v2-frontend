import React, { Component } from 'react';

import { connect } from 'react-redux';

import { fetchCurUser } from '../../actions/curUserActions';

import LectureListing from './lectureListing';

class HomeContainer extends Component {

  componentWillMount = () => {
    this.props.fetchCurUser(this.props.auth.user.id)
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h2>Welcome, {this.props.currentUser.first_name}</h2>
        {this.renderLectures()}
      </div>
    )
  }

  renderLectures = () => {
    return this.props.currentUser.lectures.map( lecture => {
      return(<LectureListing lecture={lecture} key={lecture.id}/>)
    })
  }

}

export default connect((state) => ({ auth: state.auth, currentUser: state.currentUser }), { fetchCurUser })(HomeContainer);

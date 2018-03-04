import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class HomeContainer extends Component {

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h2>Welcome, {this.props.auth.user.first_name}</h2>
        <ul>{this.renderLectureLinks()}</ul>
      </div>
    )
  }

  renderLectureLinks = () => {

    return this.props.auth.user.lectures.map( lecture => {
      const path = `/lecture/${lecture.id}`
      return(<li key={lecture.id}><Link to={path} key={lecture.id}>{lecture.title}</Link></li>)
    })
  }

}

export default connect((state) => ({ auth: state.auth }), { })(HomeContainer);

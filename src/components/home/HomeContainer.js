import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { curUser } from '../../actions/authActions';

class HomeContainer extends Component {

  render() {
    return (
      <div className="Main">
        <div className="Left">
          <h1>Home</h1>
          <h2>Welcome, {this.props.auth.user.first_name}</h2>
          <ul>{this.renderLectureLinks()}</ul>
        </div>
      </div>
    )
  }

  componentDidMount = () => {
    this.props.curUser()
  }

  renderLectureLinks = () => {

    return this.props.auth.user.lectures.map( lecture => {
      const path = `/note/${lecture.id}`
      return(<li key={lecture.id}><Link to={path} key={lecture.id}>{lecture.title}</Link></li>)
    })
  }

}

export default connect((state) => ({ auth: state.auth }), { curUser })(HomeContainer);

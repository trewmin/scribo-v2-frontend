import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { curUser } from '../../actions/authActions';

class HomeContainer extends Component {

  render() {
    return (
      <div className="Main">
        <div className="Left">
        <div id="LeftHome">
          <span className="Welcome">Welcome,</span><br />
          <span className="Name">{this.props.auth.user.first_name}</span><br />
          Your Notes:
          {this.renderLectureLinks()}
        </div>
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
      return(<p key={lecture.id}><Link to={path} key={lecture.id} className="HomeListing">{lecture.title}</Link></p>)
    })
  }

}

export default connect((state) => ({ auth: state.auth }), { curUser })(HomeContainer);

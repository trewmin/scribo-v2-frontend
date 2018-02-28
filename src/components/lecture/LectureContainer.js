import React, { Component } from 'react';

import { connect } from 'react-redux';

import { fetchCurLect } from '../../actions/curLectActions';

class LectureContainer extends Component {

  componentWillMount = () => {
    this.props.fetchCurLect(this.props.id)
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>{this.props.currentLect.title}</h1>
      </div>
    )
  }

}

export default connect((state) => ({ currentUser: state.currentUser, currentLect: state.currentLect}), { fetchCurLect })(LectureContainer);

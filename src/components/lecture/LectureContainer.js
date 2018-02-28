import React, { Component } from 'react';

import { connect } from 'react-redux';

import { fetchCurLect } from '../../actions/curLectActions';
import { fetchCurNb } from '../../actions/curNbActions';

import NotebookContainer from './NotebookContainer';
import CurUserNotebookContainer from './CurUserNotebookContainer';

class LectureContainer extends Component {

  componentDidMount = () => {
    this.props.fetchCurLect(this.props.id)
  }

  componentDidUpdate = () => {
    if (this.props.currentLect.notebooks.length > 0 && this.props.currentNb.id === null) {
      const currentUserNb = this.props.currentLect.notebooks.find( notebook => notebook.user_id === this.props.auth.user.id)
      this.props.fetchCurNb(currentUserNb.id)
    }
  }

  render() {
    console.log(this.props);
    console.log("TEST");
    return (
      <div>
        <h1>{this.props.currentLect.title}</h1>
        <h3>Host: {this.props.currentLect.admin.first_name} {this.props.currentLect.admin.last_name}</h3>

        <div>
          <h3>Users:</h3>
          {this.renderUsers()}
        </div>

        <div>
          <h3>Notebook:</h3>
          {this.props.currentNb.user_id === this.props.auth.user.id ? <CurUserNotebookContainer /> : <NotebookContainer />}
        </div>

      </div>
    )
  }

  renderUsers = () => {
    return this.props.currentLect.users.map( user => {
      return(<button value={user.id} onClick={this.fetchSelectedUsersNb} key={user.id}>{user.first_name} {user.last_name}</button>)
    })
  }

  fetchSelectedUsersNb = (e) => {
    const selectedUserNb = this.props.currentLect.notebooks.find( notebook => notebook.user_id === parseInt(e.target.value, 10))
    this.props.fetchCurNb(selectedUserNb.id)
  }


}

export default connect((state) => ({ auth: state.auth, currentLect: state.currentLect, currentNb: state.currentNb}), { fetchCurLect, fetchCurNb })(LectureContainer);

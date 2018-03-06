import React, { Component } from 'react';

import { connect } from 'react-redux';

import { fetchCurLect } from '../../actions/curLectActions';
import { fetchCurNb } from '../../actions/curNbActions';

import NotebookContainer from './NotebookContainer';
import CurUserNotebookContainer from './CurUserNotebookContainer';

class LectureContainer extends Component {

  state = {
    curUserInLect: null
  }

  componentDidMount = () => {
    this.props.fetchCurLect(this.props.id)
  }

  componentDidUpdate = () => {
    if (this.props.curLect.notebooks.length > 0 && this.state.curUserInLect === null) {
      this.setState({curUserInLect: this.props.curLect.users.map(user => user.id).includes(this.props.auth.user.id)})
    } else if (this.state.curUserInLect && !this.props.curLect.users.map(user => user.id).includes(this.props.auth.user.id)) {
      this.setState({curUserInLect: this.props.curLect.users.map(user => user.id).includes(this.props.auth.user.id)})
    }

    if (this.props.curLect.notebooks.length > 0 && this.props.curNb.id === null) {
      if (this.state.curUserInLect) {
        const curUserNb = this.props.curLect.notebooks.find( notebook => notebook.user_id === this.props.auth.user.id)
        this.props.fetchCurNb(curUserNb.id)
      } else {
        const currentAdminNb = this.props.curLect.notebooks.find( notebook => notebook.user_id === this.props.curLect.admin.id)
        this.props.fetchCurNb(currentAdminNb.id)
      }
    } else {
      if (this.props.curNb.lecture_id !== this.props.curLect.id ) {
        if (this.state.curUserInLect) {
          const curUserNb = this.props.curLect.notebooks.find( notebook => notebook.user_id === this.props.auth.user.id)
          this.props.fetchCurNb(curUserNb.id)
        } else {
          const currentAdminNb = this.props.curLect.notebooks.find( notebook => notebook.user_id === this.props.curLect.admin.id)
          this.props.fetchCurNb(currentAdminNb.id)
        }
      }
    }
  }

  render() {
    return (
      <div>
        <h1>{this.props.curLect.title}</h1>
        <h3>Host: {this.props.curLect.admin.user_name}</h3>
        {  this.state.curUserInLect ? (
          <div>
          <div>
            <h3>Users:</h3>
            {this.renderUsers()}
          </div>
          <div>
            <h3>Notebook:</h3>
            {this.props.curNb.user_id === this.props.auth.user.id ? <CurUserNotebookContainer /> : <NotebookContainer />}
          </div>
          </div>
           ) : ( "You are not a member of this lecture" )
          }


      </div>
    )
  }

  renderUsers = () => {
    return this.props.curLect.users.map( user => {
      if ((user.id === this.props.auth.user.id) && (user.id === this.props.curLect.admin.id))
        {return <button value={user.id} onClick={this.fetchSelectedUsersNb} key={user.id}>{"* A "+user.user_name+" A *"}</button>}
      if (user.id === this.props.auth.user.id)
        {return <button value={user.id} onClick={this.fetchSelectedUsersNb} key={user.id}>{"* "+user.user_name+" *"}</button>}
      else if (user.id === this.props.curLect.admin.id)
        {return <button value={user.id} onClick={this.fetchSelectedUsersNb} key={user.id}>{"A "+user.user_name+" A"}</button>}
      else
        {return <button value={user.id} onClick={this.fetchSelectedUsersNb} key={user.id}>{user.user_name}</button>}
    })
  }

  fetchSelectedUsersNb = (e) => {
    const selectedUserNb = this.props.curLect.notebooks.find( notebook => notebook.user_id === parseInt(e.target.value, 10))
    this.props.fetchCurNb(selectedUserNb.id)
  }


}

export default connect((state) => ({ auth: state.auth, curLect: state.curLect, curNb: state.curNb}), { fetchCurLect, fetchCurNb })(LectureContainer);

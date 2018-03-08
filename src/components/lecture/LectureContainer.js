import React, { Component } from 'react';

import { connect } from 'react-redux';

import { fetchCurLect } from '../../actions/curLectActions';
import { fetchCurNb, setCurNb } from '../../actions/curNbActions';

import OtherNbContainer from '../notebook/OtherNbContainer';
import CurUserNbContainer from '../notebook/CurUserNbContainer';

class LectureContainer extends Component {

  state = {
    curUserInLect: null,
    curNb: null
  }

  componentDidMount = () => {
    this.props.fetchCurLect(this.props.id)
  }

  componentDidUpdate = () => {
    if (this.props.curLect.id !== null && this.props.curNb.id === null) {
      this.props.fetchCurNb(this.props.curLect.notebooks[0].id)
    } else if (this.props.curLect.id !== null) {
      if (this.props.curNb.lecture_id !== this.props.curLect.id){
        this.props.fetchCurNb(this.props.curLect.notebooks[0].id)
      }
    }
  }

  render() {
    return (
      <div className="Main">
        {this.props.curNb.id !== null ? <CurUserNbContainer /> : ""}
      </div>
    )
  }

  fetchSelectedUsersNb = (e) => {
    const selectedUserNb = this.props.curLect.notebooks.find( notebook => notebook.user_id === parseInt(e.target.value, 10))
    this.props.fetchCurNb(selectedUserNb.id)
  }


}

export default connect((state) => ({ auth: state.auth, curLect: state.curLect, curNb: state.curNb}), { fetchCurLect, fetchCurNb, setCurNb })(LectureContainer);

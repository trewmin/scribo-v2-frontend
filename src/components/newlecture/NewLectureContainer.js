import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import moment from 'moment';
import { PowerSelectMultiple } from 'react-power-select';
import 'react-power-select/dist/react-power-select.css'

import { fetchAllUsers } from '../../actions/allUsersActions';
import { createLect } from '../../actions/curLectActions';

class NewLectureContainer extends Component {

  state = {
    title: "Title",
    admin: this.props.auth.user,
    usersToInvite: []
  }

  componentDidMount = () => {
    // this.props.fetchAllUsers()
  }

  render() {
    return (
      <div className="Main">
        <div className="Left">
          <div className="NewLectLeft">
          <input type='text' name={'title'} value={this.state.title} onChange={this.handleChange} className="NewNoteTitleInput"/><br />
          <Link to={'/home'} ><button onClick={this.handleCreateLect} className="NewNoteSubmit">Create</button></Link>
          </div>
        </div>
      </div>
    )
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSelectChange = ({ options }) => {
    this.setState({ usersToInvite: options });
  };

  allUsersNoCurUser = () => {
    return this.props.allUsers.filter( user => user.id !== this.props.auth.user.id)
  }

  handleCreateLect = () => {
    this.props.createLect(this.state.admin.id, this.state.title, this.state.usersToInvite)
  }


  }

export default connect((state) => ({ auth: state.auth, allUsers: state.allUsers }), { fetchAllUsers, createLect })(NewLectureContainer);

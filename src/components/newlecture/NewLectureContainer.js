import React, { Component } from 'react';

import { connect } from 'react-redux';

// import { Link } from 'react-router-dom';

import moment from 'moment';
import { PowerSelectMultiple } from 'react-power-select';
import 'react-power-select/dist/react-power-select.css'

import { fetchAllUsers } from '../../actions/allUsersActions';
import { createLect } from '../../actions/curLectActions';

class NewLectureContainer extends Component {

  state = {
    title: "Title",
    dateTime: moment().format().slice(0, -9),
    admin: this.props.auth.user,
    usersToInvite: []
  }

  componentDidMount = () => {
    this.props.fetchAllUsers()
  }

  render() {
    return (
      <div>
      <h1>{this.state.title}</h1>
      <h2>{new Date(this.state.dateTime).toUTCString()}</h2>
      <h2>{this.state.admin.first_name}</h2>
      <p>{this.state.usersToInvite.map( user => user.user_name + " ")}</p>
      <br />
      <input type='text' name={'title'} value={this.state.title} onChange={this.handleChange}/><br />
      <input type='datetime-local' name={'dateTime'} value={this.state.dateTime} onChange={this.handleChange}/>

      <PowerSelectMultiple
        options={this.allUsersNoCurUser()}
        selected={this.state.usersToInvite}
        optionLabelPath="user_name"
        onChange={this.handleSelectChange}
        placeholder="Select other users to invite"
      />
      <br/>
      <button onClick={this.handleCreateLect}>Submit</button>
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
    this.props.createLect(this.state.admin.id, this.state.title, this.state.dateTime, this.state.usersToInvite)
  }


  }

export default connect((state) => ({ auth: state.auth, allUsers: state.allUsers }), { fetchAllUsers, createLect })(NewLectureContainer);

import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { updateCurUserNb } from '../../actions/curNbActions';

class NotebookContainer extends Component {

  state = {
    lastSave: new Date(),
    status: "Saved"
  }

  render() {
  return (
    <div>
      <div>{this.state.status} <button onClick={this.handleUpdateCurUserNb}>Save</button></div>
      <textarea id={ "notebook" } defaultValue={ this.props.currentNb.content } onChange={this.handleAutoUpdateCurUserNb}/>
    </div>
  )}

  handleAutoUpdateCurUserNb = (e) => {
    this.setState({status: "Unsaved"})
    let now = new Date()
    if ((now - this.state.lastSave) > 5000){
      this.props.currentNb.content = e.target.value
      this.props.updateCurUserNb(this.props.currentNb)
      this.setState({lastSave: now, status: "Saved"})
    }
  }

  handleUpdateCurUserNb = (e) => {
    let now = new Date()
    this.setState({lastSave: now, status: "Saved"})
    let notebook = document.getElementById("notebook")
    this.props.currentNb.content = notebook.value
    this.props.updateCurUserNb(this.props.currentNb)
  }

}

export default connect((state) => ({ auth: state.auth, currentNb: state.currentNb}), { updateCurUserNb })(NotebookContainer);

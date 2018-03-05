import React, { Component } from 'react';

import { connect } from 'react-redux';

import { ActionCable } from 'react-actioncable-provider';

import ContentEditable from 'react-contenteditable';

import { setCurNb, updateCurUserNb } from '../../actions/curNbActions';

// import { Link } from 'react-router-dom';

class NotebookContainer extends Component {

  state = {
    noteToAdd: ""
  }

  render() {
  return (
    <div>
      <ActionCable
        channel={{
           channel: 'NotebooksChannel',
           notebook_id: this.props.curNb.id
         }}
         onReceived= { notebook => {
           console.log("CABLE WORKING?");
           this.props.setCurNb(notebook)
         }}/>

     <ContentEditable
             ref={(input) => { this.notebook = input }}
             html={this.props.curNb.content} // innerHTML of the editable div
             disabled={true}       // use true to disable edition
           />

     {this.state.noteToAdd !== "" ? <ContentEditable html={this.formatedNoteToAdd(this.state.noteToAdd)} disabled={true} /> : <br />}

     {new Date(this.props.curNb.updated_at).toString()}

     <ContentEditable
             html={this.state.noteToAdd}
             disabled={false}
             onChange={this.handleNoteToAddChange}
           />

    <button onClick={this.handleAddNote}>Add Note</button>
    </div>
  )}

  handleNoteToAddChange = (e) => {
    this.setState({
      noteToAdd: e.target.value
    })
  }

  handleAddNote = e => {
    this.props.curNb.content += this.formatedNoteToAdd(this.state.noteToAdd)
    this.props.updateCurUserNb(this.props.curNb)
    this.setState({noteToAdd: ""})
  }

  formatedNoteToAdd = (noteToAdd) => {
    return `<p>[ (Note from ${this.props.auth.user.user_name}): ${noteToAdd} ]</p>`
  }
}



export default connect((state) => ({ auth: state.auth, curNb: state.curNb}), { setCurNb, updateCurUserNb })(NotebookContainer);

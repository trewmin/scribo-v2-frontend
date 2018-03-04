import React, { Component } from 'react';

import { connect } from 'react-redux';

import { ActionCable } from 'react-actioncable-provider';

import ContentEditable from 'react-contenteditable';

import { setCurNb } from '../../actions/curNbActions';

// import { Link } from 'react-router-dom';

class NotebookContainer extends Component {

  state = {
    noteToAddToNotebook: ''
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
     <ContentEditable
             ref={(input) => { this.noteToAddToNotebook = input }}
             html={this.props.curNb.content}
             disabled={false}
             onChange={this.handleAutoUpdateCurUserNb}
             onBlur={this.handleUpdateCurUserNb}
           />
    </div>
  )}
}

export default connect((state) => ({ auth: state.auth, curNb: state.curNb}), { setCurNb })(NotebookContainer);

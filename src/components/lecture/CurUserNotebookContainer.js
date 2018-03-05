import React, { Component } from 'react';

import { connect } from 'react-redux';

import { ActionCable } from 'react-actioncable-provider';

// import { Link } from 'react-router-dom';

import ContentEditable from 'react-contenteditable';

import { setCurNb, updateCurUserNb } from '../../actions/curNbActions';

class NotebookContainer extends Component {

  state = {
    lastSave: new Date(),
    status: "Saved"
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
         let now = new Date()
         this.setState({lastSave: now, status: "Saved"})
       }}/>

      <ContentEditable
              ref={(input) => { this.notebook = input }}
              html={this.props.curNb.content}
              disabled={false}
              onChange={this.handleAutoUpdateCurUserNb}
              onBlur={this.handleUpdateCurUserNb}
            />
     <div>{this.state.status} <button onClick={this.handleUpdateCurUserNb}>Save</button></div>
    </div>
  )
}

  // <textarea id={ "notebook" } defaultValue={ this.props.curNb.content } onChange={this.handleAutoUpdateCurUserNb}/>

  handleAutoUpdateCurUserNb = (e) => {
    this.setState({status: "Unsaved"})
    let now = new Date()
    if ((now - this.state.lastSave) > 2000){
      this.props.curNb.content = e.target.value
      this.props.updateCurUserNb(this.props.curNb)
      this.setState({lastSave: now, status: "Saved"})
    }
  }

  handleUpdateCurUserNb = (e) => {
    let now = new Date()
    this.setState({lastSave: now, status: "Saved"})
    if (this.notebook.lastHtml){
      this.props.curNb.content = this.notebook.lastHtml
      this.props.updateCurUserNb(this.props.curNb)
    }else{
      this.props.curNb.content = this.notebook.props.html
      this.props.updateCurUserNb(this.props.curNb)
    }
  }

}

export default connect((state) => ({ auth: state.auth, curNb: state.curNb}), { setCurNb, updateCurUserNb })(NotebookContainer);

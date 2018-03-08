import React, { Component } from 'react';

import { connect } from 'react-redux';

import { ActionCable } from 'react-actioncable-provider';

import { setCurNb, updateCurUserNb } from '../../actions/curNbActions';

// import { Link } from 'react-router-dom';

class NotebookContainer extends Component {

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
    </div>
  )}
}



export default connect((state) => ({ auth: state.auth, curNb: state.curNb}), { setCurNb, updateCurUserNb })(NotebookContainer);

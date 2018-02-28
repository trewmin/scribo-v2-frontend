import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

class NotebookContainer extends Component {

  render() {
  return (
    <div>
      {this.props.currentNb.content}
    </div>
  )}
}

export default connect((state) => ({ auth: state.auth, currentNb: state.currentNb}), { })(NotebookContainer);

import React, { Component } from 'react';

import { connect } from 'react-redux';

// import { ActionCable } from 'react-actioncable-provider';

// import { Link } from 'react-router-dom';

import {Editor, EditorState, SelectionState, RichUtils, convertFromRaw, convertToRaw, CompositeDecorator, Modifier, getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';

import YouTube from 'react-youtube';

import { setCurNb, updateCurUserNb, updateNbContent } from '../../actions/curNbActions';

import { fetchCurNb } from '../../actions/curNbActions';

class NotebookContainer extends Component {

  state = {
    player: null,
    editorState: EditorState.createEmpty(this.decorator),
    startTime: 0,
    videoId: this.props.curNb.video_id
  }

  myKeyBindingFn = (e) =>  {
    if (e.keyCode === 84 /* `T` key */ && this.isOptionKeyCommand(e)) {
      return 'myeditor-save';
    }
    return getDefaultKeyBinding(e);
  }

  isOptionKeyCommand = (e) => KeyBindingUtil.isOptionKeyCommand(e)

  decorator = () => new CompositeDecorator([
    {
      strategy: this.findLinkEntities,
      component: this.Link,
    },
  ]);

  componentDidMount = () => {
    if (this.props.curNb.content !== null) {
      this.setState({
        editorState: EditorState.createWithContent(convertFromRaw(this.props.curNb.content), this.decorator())
      })
    }
  }

  render() {
    const editorState = this.state.editorState
    let className = 'RichEditor-editor';
    let contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div>

        <YouTube
           ref={(youtube) => { this.youtube = youtube }}
           videoId={this.state.videoId}
           onReady={this.onYouTubeReady}
           opts={{
            height: '390',
            width: '640',
            playerVars: {
              start: this.state.startTime,
              autoplay: 0,
              rel:0,
              modestbranding: 1
            }
           }}
        />
        <input value={this.props.curNb.video_id} onChange={this.handleVideoIdChange} />

        <button onClick={this.toggleTimeStamp}>Stamp</button>

        <Editor
          ref={(editor) => { this.notebook = editor }}
          editorState={this.state.editorState}
          onChange={this.onEditorChange}
          handleKeyCommand={this.handleKeyCommand}
          keyBindingFn={this.myKeyBindingFn}
          readOnly={false} />

      </div>
    )
  }

  handleVideoIdChange = (e) => {
    this.setState({
      videoId: e.target.value
    })
    this.props.curNb.video_id = e.target.value
    this.props.updateCurUserNb(this.props.curNb)
  }

  handleKeyCommand = (command) => {
    if (command === 'myeditor-save') {
      this.toggleTimeStamp()
      return 'handled';
    }
    return 'not-handled';
  }

  onYouTubeReady = (e) => {
    this.setState({
      player: e.target,
    })
  }

  onTimeStampClick = (ts) => {
    this.state.player.seekTo(ts, true)
  }

  onEditorChange = (editorState) => {
    this.setState({
      editorState
    })
    const contentState = editorState.getCurrentContent()
    this.props.updateNbContent(convertToRaw(contentState), this.props.curNb)
  }

  toggleTimeStamp = ( ) => {
    console.log("toggle")
    const editorState = this.state.editorState
    const now = Math.floor(this.state.player.getCurrentTime())
    const contentState = editorState.getCurrentContent()
    const selectionState = editorState.getSelection()
    let contentStateWithEntity

    if (selectionState.isCollapsed()) {
      contentStateWithEntity = contentState.createEntity(
        'LINK',
        'MUTABLE',
        {ts: now,
         className: "small-stamp"}
      )
    } else {
      contentStateWithEntity = contentState.createEntity(
        'LINK',
        'MUTABLE',
        {ts: now,
         className: "select-stamp"}
       )
    }

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })

    let newEditorStateWithLink
    let newContentState

    if (selectionState.isCollapsed()) {
      console.log("CLOSED")
      newContentState = newEditorState.getCurrentContent()
      newContentState = Modifier.insertText(
        newContentState,
        selectionState,
        `${now}`,
        null,
        entityKey
      )
      newEditorStateWithLink = EditorState.createWithContent(newContentState, this.decorator())
    } else {
      console.log("OPEN")
      newEditorStateWithLink = RichUtils.toggleLink(
        newEditorState,
        selectionState,
        entityKey
      )
      newContentState = newEditorStateWithLink.getCurrentContent()
    }

    const newEditorStateWithLinkAndSelection = EditorState.forceSelection(newEditorStateWithLink, selectionState)
    const newContentStateWithLinkAndSelection = newEditorStateWithLinkAndSelection.getCurrentContent()

    this.setState({
      editorState: newEditorStateWithLinkAndSelection
    })
    this.props.updateNbContent(convertToRaw(newContentStateWithLinkAndSelection), this.props.curNb)
  }

  findLinkEntities = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'LINK'
        );
      },
      callback
    );
  }

  Link = (props) => {
    const {ts, className} = props.contentState.getEntity(props.entityKey).getData();
    return (
      <a onClick={() => this.onTimeStampClick(ts)} className={className}>
        {props.children}
      </a>
    );
  };



}

export default connect((state) => ({ auth: state.auth, curNb: state.curNb}), { setCurNb, updateCurUserNb, updateNbContent, fetchCurNb })(NotebookContainer);

//
//     <div ref={(input) => { this.notebook = input }}
//           onKeyUp={this.handleOnChange}
//           contentEditable={true}
//           dangerouslySetInnerHTML={{__html: this.state.content}}></div>
//
// <ActionCable
//   channel={{
//      channel: 'NotebooksChannel',
//      notebook_id: this.props.curNb.id
//    }}
//    onReceived= { notebook => {
//      console.log("CABLE WORKING?");
//      this.props.setCurNb(notebook)
//      let now = new Date()
//      this.setState({lastSave: now, status: "Saved"})
//    }}/>
//
//   onChange={this.handleAutoUpdateCurUserNb}
//   onBlur={this.handleUpdateCurUserNb}
//
// <textarea id={ "notebook" } defaultValue={ this.props.curNb.content } onChange={this.handleAutoUpdateCurUserNb}/>
//
// handleOnKeyUp = e => {
//   console.log(e.target.innerHTML);
//   let update = e.target.innerHTML
//   if (e.key === 'Enter') {
//     let indexOfDiv = e.target.innerHTML.indexOf('<div>');
//     update = [e.target.innerHTML.slice(0, indexOfDiv+4), ` title='${this.state.currentTime}'`, e.target.innerHTML.slice(indexOfDiv+4)].join('')
//   }
//   this.setState({
//     content: update
//   })
//   this.props.curNb.content = update
//   this.props.updateCurUserNb(this.props.curNb)
// }
//
// **<ContentEditable
//         ref={(input) => { this.notebook = input }}
//         html={this.state.content}
//         disabled={false}
//         onChange={this.handleOnChange}
//       />
//** handleOnChange = e => {
//   console.log(e.nativeEvent)
//   debugger
//   let update = e.target.value
//   if (update.includes('<div>')) {
//     console.log("WORKED");
//     const currentTime = Math.floor(this.state.player.getCurrentTime())
//     update = update.replace('<div>', `<div title=${currentTime}>`)
//   }
//   console.log("UPDATE AFTER IF: " + update);
//   // e.target.innerHTML = update
//   this.props.updateCurNbContent(update, this.props.curNb)
//   console.log("NOTEBOOK HTML: " + e.target.value);
// }
//
// handleAutoUpdateCurUserNb = (e) => {
//   this.setState({status: "Unsaved"})
//   let now = new Date()
//   if ((now - this.state.lastSave) > 2000){
//     this.props.curNb.content = e.target.value
//     this.props.updateCurUserNb(this.props.curNb)
//     this.setState({lastSave: now, status: "Saved"})
//   }
// }
//
// handleUpdateCurUserNb = (e) => {
//   let now = new Date()
//   this.setState({lastSave: now, status: "Saved"})
//   if (this.notebook.lastHtml){
//     this.props.curNb.content = this.notebook.lastHtml
//     this.props.updateCurUserNb(this.props.curNb)
//   }else{
//     this.props.curNb.content = this.notebook.props.html
//     this.props.updateCurUserNb(this.props.curNb)
//   }
// }

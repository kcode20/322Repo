import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';
import { Button, ButtonGroup } from 'reactstrap';

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  _onBoldClick = () => {
     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
   }

   _onItalicsClick = () => {
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
    }

    _onUnderlineClick = () => {
       this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
     }



  render() {
    return (
      <div>
      <ButtonGroup size="sm">
      <Button outline color="info" onClick={this._onBoldClick}>Bold</Button>
      <Button outline color="info" onClick={this._onItalicsClick}>Italics</Button>
      <Button outline color="info" onClick={this._onUnderlineClick}>Underline</Button>
      </ButtonGroup>
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
        </div>
    );
  }
}

export default MyEditor;

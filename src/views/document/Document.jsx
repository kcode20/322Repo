import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { Button, ButtonGroup, Container, Row, Col } from 'reactstrap';
import './Document.css';

class Document extends React.Component {
	constructor(props) {
		super(props);
		this.state = { editorState: EditorState.createEmpty() };
		this.onChange = editorState => this.setState({ editorState });
	}

	_onBoldClick = () => {
		this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
	};

	_onItalicsClick = () => {
		this.onChange(
			RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC')
		);
	};

	_onUnderlineClick = () => {
		this.onChange(
			RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE')
		);
	};

	render() {
		return (
			<div className="document">
				<Container>
					<Row>
						<Col sm="12">
							<ButtonGroup className="tools" size="sm">
								<Button color="primary" onClick={this._onBoldClick}>
									Bold
								</Button>
								<Button color="primary" onClick={this._onItalicsClick}>
									Italics
								</Button>
								<Button color="primary" onClick={this._onUnderlineClick}>
									Underline
								</Button>
							</ButtonGroup>
							<div className="editor">
								<Editor
									editorState={this.state.editorState}
									onChange={this.onChange}
								/>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default Document;

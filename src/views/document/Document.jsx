import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { Button, ButtonGroup, Container, Row, Col } from 'reactstrap';
import './Document.css';

class Document extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editorState: EditorState.createEmpty(),
			title: 'Untitled',
		};
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

	onSubmit = () => {
		const content = this.state.editorState.getCurrentContent();
		const data = {
			title: this.state.title,
			content: content.getPlainText(),
			owner: 1,
			locked: 0,
		};
		fetch('http://localhost:8080/document', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify(data),
		})
			.then(function(response) {
				if (response.status >= 400) {
					throw new Error('Bad response from server');
				}
				if (response.status === 200) {
					alert('Your document has been saved!');
				}
			})
			.catch(function(err) {
				console.log(err);
			});
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
							<Button color="primary" onClick={this.onSubmit}>
								Submit
							</Button>
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

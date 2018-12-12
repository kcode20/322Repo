import React from 'react';
import { Editor, EditorState, RichUtils, ContentState } from 'draft-js';
import { Redirect } from 'react-router-dom'
import { Button, ButtonGroup, Container, Row, Col } from 'reactstrap';
import { TiLockOpen, TiLockClosed } from 'react-icons/ti';
import {Link, withRouter} from 'react-router-dom';
import Complain from '../complaints/complain';
import Invite from '../docInvitation/docInvitation'
import './Document.css';

class Document extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editorState: EditorState.createEmpty(),
			title: 'Untitled',
			locked: false,
			toggle: false,
			toggleInv: false,
		};
		this.onChange = editorState => this.setState({ editorState });
	}

	componentDidMount = () => {
		const { id } = this.props.match.params;
		fetch(`http://localhost:8080/document/${id}`)
			.then(response => {
				if (response.status >= 400) {
					throw new Error('Bad response from server');
				}
				return response.json();
			})
			.then(data => {
				const draft = data[0];
				this.setState({
					editorState: EditorState.createWithContent(
						ContentState.createFromText(draft.content)
					),
					title: draft.title,
					locked: draft.locked,
				});
			})
			.catch(function(err) {
				console.log(err);
			});
	};

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
			locked: 'unlocked',
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

	toggleComplaint = () => {
		this.setState({
			toggle: !this.state.toggle,
		})};

	toggleInv = () => {
		this.setState({
			toggleInv: !this.state.toggleInv,
		});
	}

	toggleLock = () => {
		const { id } = this.props.match.params;
		const data = {
			docID: id,
			locked: this.state.locked === 'locked' ? 'unlocked' : 'locked',
		};
		fetch('http://localhost:8080/toggleLock', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify(data),
		})
			.then(response => {
				if (response.status >= 400) {
					throw new Error('Bad response from server');
				}
				if (response.status === 200) {
					return response.json();
				}
			})
			.then(data => {
				const lockedValue = data[0].locked;
				this.setState({ locked: lockedValue });
				alert(`Your document has been ${lockedValue}!`);
			})
			.catch(function(err) {
				console.log(err);
			});
	};

	state = {
    redirect: false,
		redirect2: false,
  }
  setRedirect = () => {
    this.setState({
      redirect: true,
			redirect2: true

    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/docInvitation' />
    }
		if (this.state.redirect2) {
			return <Redirect to='/1/documents' />
		}
  }

	state = {
		redirect2: false,
  }
  setRedirect1 = () => {
    this.setState({
			redirect2: true

    })
  }
  renderRedirect1 = () => {
		if (this.state.redirect2) {
			return <Redirect to='/1/documents'/>
		}
  }

	render() {
		return (
			<div className="document">
			{this.renderRedirect1()}
			<Button color="primary" id="back_button" onClick={this.setRedirect1}>
				Back
			</Button>
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
							<Button color="primary" size="sm" onClick={this.onSubmit}>
								Save
							</Button>
								{this.renderRedirect()}
							<Button color="primary" size="sm" onClick={this.setRedirect}>
								Share
							</Button>
							<Button onClick= {this.toggleComplaint} color="primary" size="sm">
								File Complain
							</Button>
							<Link to="/tabooword">
								<Button color="primary" size="sm">
									Taboo Word
								</Button>
							</Link>
							<Button color="primary" size="sm" onClick={this.toggleLock}>
								{this.state.locked === 'locked' ? (
									<TiLockClosed />
								) : (
									<TiLockOpen />
								)}
							</Button>
							<Button onClick={this.toggleInv} color="primary" size="sm">
								Invite
							</Button>
							{this.state.toggle && (
								<Complain docID={this.props.match.params} />
							)}
							{this.state.toggleInv && (
								<Invite docID={this.props.match.params} />
							)}
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

export default withRouter(Document);

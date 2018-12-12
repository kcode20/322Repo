import React from 'react';
import {
	Container,
	Row,
	Col,
	Card,
	CardBody,
	CardTitle,
	Button,
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { TiPlus } from 'react-icons/ti';
import './Documents.css';
import SuperUserConsole from '../superuser/SuperUserConsole';

class Documents extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			documents: [],
			user: {}
		};
	}

	componentDidMount = () => {
		const {id} = this.props.match.params;
		console.log(id);
		fetch('http://localhost:8080/documents', {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		})
			.then(response => {
				if (response.status >= 400) {
					throw new Error('Bad response from server');
				}
				return response.json();
			})
			.then(data => {
				this.setState({ documents: data });
				console.log('in the then', id);
				fetch(`http://localhost:8080/users/${id}`, {
					method: 'GET',
					mode: 'cors',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
						'Access-Control-Allow-Origin': '*',
					},
				})
				.then(response => {
						if (response.status >= 400) {
							throw new Error('Bad response from server');
						}
						return response.json();
				})
				.then(data => {
					console.log(data);
					this.setState({user: data[0]})
				})
			})
			.catch(function(err) {
				console.log(err);
			});
	};

	createNewDocument = () => {
		const { history } = this.props;
		const data = {
			title: 'Untitled',
			content: '',
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
					return response.json();
				}
			})
			.then(data => {
				const id = data[0].docID;
				history.push(`document/${id}`);
			})
			.catch(function(err) {
				console.log(err);
			});
	};

	render() {
		const isSuperUser = this.state.user.type === 'SU';
		return (
			<div className="documents">
				<Container>
					<Row>
						<Col sm={{ size: 'auto', offset: 1 }}>
							<h1 className="title"> My Documents </h1>
						</Col>
						<Col sm={{ size: 'auto', offset: 1 }}>
							<Button onClick={this.createNewDocument} color="primary">
								<TiPlus />
								Create Document
							</Button>
						</Col>
					</Row>
					<Row>
						{this.state.documents.map((doc, key) => {
							const link = `/document/${doc.docID}`;
							return (
								<Col key={key} sm={{ size: 'auto', offset: 1 }}>
									<Card className="document-cards">
										<CardBody>
											<CardTitle>{doc.title}</CardTitle>
											<Link to={link}>
												<Button>View</Button>
											</Link>
										</CardBody>
									</Card>
								</Col>
							);
						})}
					</Row>
					{isSuperUser && <SuperUserConsole />}
				</Container>
			</div>
		);
	}
}

export default withRouter(Documents);

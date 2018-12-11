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

class Documents extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			documents: [],
		};
	}

	componentDidMount = () => {
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
					console.log(response);
					//history.push('document/');
				}
			})
			.catch(function(err) {
				console.log(err);
			});
	};

	render() {
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
												<Button onClick={this.onClick}>View</Button>
											</Link>
										</CardBody>
									</Card>
								</Col>
							);
						})}
					</Row>
				</Container>
			</div>
		);
	}
}

export default withRouter(Documents);

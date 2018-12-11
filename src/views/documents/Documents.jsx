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

	render() {
		return (
			<div className="documents">
				<Container>
					<Row>
						<Col sm={{ size: 'auto', offset: 1 }}>
							<h1 className="title"> My Documents </h1>
						</Col>
					</Row>
					<Row>
						{this.state.documents.map((doc, key) => {
							return (
								<Col key={key} sm={{ size: 'auto', offset: 1 }}>
									<Card className="document-cards">
										<CardBody>
											<CardTitle>{doc.title}</CardTitle>
											<Button>View</Button>
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

export default Documents;

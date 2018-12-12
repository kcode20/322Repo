import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'reactstrap';
import { TiLockOpen, TiLockClosed } from 'react-icons/ti';
import { Twitter } from 'react-social-sharing';

import './Documents.css';

class Memberships extends Component {
	constructor() {
		super();
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

	toggleLock = (id, locked) => {
		const data = {
			docID: id,
			locked: locked === 'locked' ? 'unlocked' : 'locked',
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
				let toggledDocs = this.state.documents;
				toggledDocs[id - 1].locked = lockedValue;
				this.setState({ documents: toggledDocs });

				alert(`Successfully ${lockedValue} the  document`);
			})
			.catch(function(err) {
				console.log(err);
			});
	};

	render() {
		console.log(this.state.documents);
		return (
			<div className="memberships">
				<h1> All Documents </h1>
				<Table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Title</th>
							<th>View Document</th>
							<th>Toggle Lock</th>
						</tr>
					</thead>
					<tbody>
						{this.state.documents.map((doc, key) => {
							const link = `/document/${doc.docID}`;
							return (
								<tr key={key}>
									<th scope="row">{doc.docID}</th>
									<td>{doc.title}</td>
									<td>
										<Link to={link}>
											<Button color="primary" size="sm">
												View
											</Button>
										</Link>
									</td>
									<td>
										<Button
											color="primary"
											size="sm"
											onClick={() => this.toggleLock(doc.docID, doc.locked)}
										>
											{doc.locked === 'locked' ? (
												<TiLockClosed />
											) : (
												<TiLockOpen />
											)}
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		);
	}
}

export default Memberships;

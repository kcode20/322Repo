import React, { Component } from 'react';
import './Memberships.css';
import { Table, Button } from 'reactstrap';

class Memberships extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
		};
	}

	componentDidMount = () => {
		fetch('http://localhost:8080/users', {
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
				this.setState({ users: data });
			})
			.catch(function(err) {
				console.log(err);
			});
	};

	getUserType = type => {
		if (type === 'G') return 'Guest';
		if (type === 'SU') return 'Super User';
		if (type === 'OU') return 'Ordinary User';
	};
	render() {
		console.log(this.state.users);
		return (
			<div className="memberships">
				<h1> Users </h1>
				<Table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Username</th>
							<th>Email</th>
							<th>Type</th>
							<th>Promote</th>
							<th>Demote</th>
						</tr>
					</thead>
					<tbody>
						{this.state.users.map((user, key) => {
							const type = this.getUserType(user.type);
							return (
								<tr key={key}>
									<th scope="row">{user.id}</th>
									<td>{user.username}</td>
									<td>{user.email}</td>
									<td>{type}</td>
									<td>
										<Button color="primary" size="sm">
											Promote
										</Button>
									</td>
									<td>
										<Button color="primary" size="sm">
											Demote
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

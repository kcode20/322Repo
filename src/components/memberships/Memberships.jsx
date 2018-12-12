import React, { Component } from 'react';
import './Memberships.css';

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
	render() {
		console.log(this.state.users);
		return (
			<div className="memberships">
				<h1> Users </h1>
			</div>
		);
	}
}

export default Memberships;

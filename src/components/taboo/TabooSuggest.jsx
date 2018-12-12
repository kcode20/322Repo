import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

import './TabooSuggest.css';

class TabooSuggest extends Component {
	constructor() {
		super();
		this.state = {
			tabooSuggest: [],
		};
	}

	componentDidMount = () => {
		fetch('http://localhost:8080/tabooSuggest', {
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
				this.setState({ tabooSuggest: data });
			})
			.catch(function(err) {
				console.log(err);
			});
	};

	addTaboo = word => {
		const data = { tabooWord: word };
		fetch('http://localhost:8080/addTaboo', {
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
					const newData = { word };
					fetch('http://localhost:8080/dissmissTaboo', {
						method: 'POST',
						mode: 'cors',
						headers: {
							'Content-Type': 'application/json',
							Accept: 'application/json',
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify(newData),
					})
						.then(response => {
							if (response.status >= 400) {
								throw new Error('Bad response from server');
							}
							return response.json();
						})
						.then(data => {
							console.log(data);
							this.setState({ tabooSuggest: data });
						})
						.catch(function(err) {
							console.log(err);
						});
					alert('Word has been added to your list of Taboos');
				}
			})
			.catch(function(err) {
				console.log(err);
			});
	};

	dismissTaboo = word => {
		const data = { word };
		fetch('http://localhost:8080/dissmissTaboo', {
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
				return response.json();
			})
			.then(data => {
				console.log(data);
				this.setState({ tabooSuggest: data });
			})
			.catch(function(err) {
				console.log(err);
			});
	};

	render() {
		console.log(this.state.tabooSuggest);
		return (
			<div className="memberships">
				<h1> Taboo Suggestions </h1>
				<Table>
					<thead>
						<tr>
							<th>Taboo Suggestion</th>
							<th>Add</th>
							<th>Dissmiss</th>
						</tr>
					</thead>
					<tbody>
						{this.state.tabooSuggest.map((taboo, key) => {
							console.log(taboo);
							return (
								<tr key={key}>
									<td>{taboo.word}</td>
									<td>
										<Button
											color="primary"
											size="sm"
											onClick={() => this.addTaboo(taboo.word)}
										>
											Add
										</Button>
									</td>
									<td>
										<Button
											color="primary"
											size="sm"
											onClick={() => this.dismissTaboo(taboo.word)}
										>
											Dissmiss
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

export default TabooSuggest;

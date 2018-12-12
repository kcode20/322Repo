import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

import './Documents.css';

class TabooSuggest extends Component {
	constructor() {
		super();
		this.state = {
			taboosuggestions: [],
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
				this.setState({ tabooSuggest: data });
			})
			.catch(function(err) {
				console.log(err);
			});
	};

	render() {
		console.log(this.state.taboosuggestions);
		return (
			<div className="memberships">
				<h1> All Documents </h1>
				<Table>
					<thead>
						<tr>
							<th>Taboo Suggestion</th>
							<th>Add</th>
							<th>Dissmiss</th>
						</tr>
					</thead>
					<tbody>
						{this.state.taboosuggestions.map((taboo, key) => {
							return (
								<tr key={key}>
									<td>{taboo.word}</td>
									<td>
										<Button color="primary" size="sm">
											Add
										</Button>
									</td>
									<td>
										<Button color="primary" size="sm">
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

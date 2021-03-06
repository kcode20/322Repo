import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import '../login.css';

class SignUpForm extends Component {
	constructor() {
		super();

		this.state = {
			username: '',
			email: '',
			password: '',
			name: '',
			hasAgreed: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		let target = e.target;
		let value = target.type === 'checkbox' ? target.checked : target.value;
		let name = target.name;

		this.setState({
			[name]: value,
		});
	}

	handleSubmit(e) {
		const { history } = this.props;
		e.preventDefault();
		var data = {
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
		};
		console.log(JSON.stringify(data));
		fetch('http://localhost:8080/signup', {
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
					history.push('/document');
				}
				// return response.json();
			})
			.catch(function(err) {
				console.log(err);
			});
		console.log('The form was submitted with the following data:');
		console.log(this.state);
	}

	render() {
		return (
			<div className="App">
				<div className="App__Aside" />
				<div className="App__Form">
					<div className="PageSwitcher">
						<NavLink
							to="/signin"
							activeClassName="PageSwitcher__Item--Active"
							className="PageSwitcher__Item"
						>
							Sign In
						</NavLink>
						<NavLink
							exact
							to="/signup"
							activeClassName="PageSwitcher__Item--Active"
							className="PageSwitcher__Item"
						>
							Sign Up
						</NavLink>
					</div>

					<div className="FormTitle">
						<NavLink
							to="/signin"
							activeClassName="FormTitle__Link--Active"
							className="FormTitle__Link"
						>
							Sign In
						</NavLink>
						or
						<NavLink
							exact
							to="/signup"
							activeClassName="FormTitle__Link--Active"
							className="FormTitle__Link"
						>
							Sign Up
						</NavLink>
					</div>
					<div className="FormCenter">
						<form onSubmit={this.handleSubmit} className="FormFields">
							<div className="FormField">
								<label className="FormField__Label" htmlFor="name">
									Username
								</label>
								<input
									type="text"
									id="username"
									className="FormField__Input"
									placeholder="Enter your username"
									name="username"
									value={this.state.username}
									onChange={this.handleChange}
								/>
							</div>
							<div className="FormField">
								<label className="FormField__Label" htmlFor="password">
									Password
								</label>
								<input
									type="password"
									id="password"
									className="FormField__Input"
									placeholder="Enter your password"
									name="password"
									value={this.state.password}
									onChange={this.handleChange}
								/>
							</div>
							<div className="FormField">
								<label className="FormField__Label" htmlFor="email">
									E-Mail Address
								</label>
								<input
									type="email"
									id="email"
									className="FormField__Input"
									placeholder="Enter your email"
									name="email"
									value={this.state.email}
									onChange={this.handleChange}
								/>
							</div>

							<div className="FormField">
								<label className="FormField__CheckboxLabel">
									<input
										className="FormField__Checkbox"
										type="checkbox"
										name="hasAgreed"
										value={this.state.hasAgreed}
										onChange={this.handleChange}
									/>{' '}
									I agree all statements in{' '}
									<a href="" className="FormField__TermsLink">
										terms of service
									</a>
								</label>
							</div>

							<div className="FormField">
								<button className="FormField__Button mr-20">Sign Up</button>{' '}
								<Link to="/signin" className="FormField__Link">
									I'm already member
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
export default withRouter(SignUpForm);

import React, { Component } from 'react';
import logo from '../../img/document-icon.png';
import './home.css';

class home extends Component {
	render() {
		return (
			<div className="home">
				<header className="home-header">
					<h1> ONE DOC </h1>
					<img src={logo} className="home-logo" alt="logo" />
					<p>
						Welcome to the starting repo for 322. Edit <code>src/home.js</code>{' '}
						and save to reload.
					</p>
					<a
						className="home-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Click Here to Learn More React!
					</a>
				</header>
			</div>
		);
	}
}

export default home;

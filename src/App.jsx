import React, { Component } from 'react';
import logo from './img/document-icon.png';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1> ONE DOC </h1>
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Welcome to the starting repo for 322. Edit <code>src/App.js</code>{' '}
						and save to reload.
					</p>
					<a
						className="App-link"
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

export default App;

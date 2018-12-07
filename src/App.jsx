import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './views/home/home.jsx';
import Users from './views/users/users';
import Navbar from './components/Navbar';
import Document from './components/Document';

const About = () => <h2>About</h2>;
// const Users = () => <h2>Users</h2>; // Added users page

const AppRouter = () => (
	<Router>
		<div>
			<Navbar />
			<Route path="/" exact component={Home} />
			<Route path="/about/" component={About} />
			<Route path="/users/" component={Users} />
			<Route path="/document/" component={Document} />
		</div>
	</Router>
);

export default AppRouter;

import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './views/home/home.jsx';
import Users from './views/users/users';

const About = () => <h2>About</h2>;
// const Users = () => <h2>Users</h2>; // Added users page

const AppRouter = () => (
	<Router>
		<div>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/about/">About</Link>
					</li>
					<li>
						<Link to="/users/">Users</Link>
					</li>
				</ul>
			</nav>

			<Route path="/" exact component={Home} />
			<Route path="/about/" component={About} />
			<Route path="/users/" component={Users} />
		</div>
	</Router>
);

export default AppRouter;

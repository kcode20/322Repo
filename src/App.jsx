import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './views/home/home.jsx';
import Navbar from './components/Navbar';
import Document from './components/Document';
import SignInForm from './views/signupin/pages/SignInForm'
import SignUpForm from './views/signupin/pages/SignUpForm';

const About = () => <h2>About</h2>;
// const Users = () => <h2>Users</h2>; // Added users page

const AppRouter = () => (
	<Router>
		<div>
			<Navbar />
			<Route path="/" exact component={Home} />
			<Route path="/about/" component={About} />
			<Route path="/signup" component={SignUpForm}/>
            <Route path="/signin" component={SignInForm}/>
			<Route path="/document/" component={Document} />
		</div>
	</Router>
);

export default AppRouter;

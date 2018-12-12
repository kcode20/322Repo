import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './views/home/home.jsx';
import Navbar from './components/Navbar';
import SignInForm from './views/signupin/pages/SignInForm';
import SignUpForm from './views/signupin/pages/SignUpForm';
import Document from './views/document/Document';
// import Complain from './views/complaints/complain';
import AccDenyInvitation from './views/invitation/AccDenyInvitation'
import DocumentCollection from './views/documents/Documents';
import TabooWord from './views/tabooWord/TabooWord'
import OUApplication from './views/applications/OUApplication'
import ProcessComplain from './views/ProcessComplain/ProcessComplain'
import docInvitation from './views/docInvitation/docInvitation'
import searchFiles from './views/searchFiles/SearchFiles'
import SearchOU from './views/searchAboutOU/SearchAboutOU'

const About = () => <h2>About</h2>;
// const Users = () => <h2>Users</h2>; // Added users page

const AppRouter = () => (
	<Router>
		<div>
			<Navbar />
			<Route path="/" exact component={Home} />
			<Route path="/about/" component={About} />
			<Route path="/signup" component={SignUpForm} />
			<Route path="/signin" component={SignInForm} />
			{/* <Route path="/complain" component={Complain} /> */}
			<Route path="/docInvitation" component={docInvitation} />
			<Route path="/searchfiles" component={searchFiles} />
			<Route path="/SearchOU" component={SearchOU} />
			<Route path="/tabooword" component={TabooWord} />
			<Route path="/accordenyinv" component={AccDenyInvitation} />
			<Route path="/OUApplication" component={OUApplication} />
			<Route path="/processcomplain" component={ProcessComplain} />
			<Route path="/document/:id" component={Document} />
			<Route path="/documents" component={DocumentCollection} />
		</div>
	</Router>
);

export default AppRouter;

import React, { Component } from 'react';
import './SuperUserConsole.css';
import Memberships from '../../components/memberships/Memberships';
import Documents from '../../components/documents/Documents';

class SuperUserConsole extends Component {
	render() {
		return (
			<div className="SuperUserConsole">
				<Memberships />
				<Documents />
			</div>
		);
	}
}

export default SuperUserConsole;

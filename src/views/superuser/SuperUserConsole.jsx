import React, { Component } from 'react';
import './SuperUserConsole.css';
import Memberships from '../../components/memberships/Memberships';

class SuperUserConsole extends Component {
	render() {
		return (
			<div className="SuperUserConsole">
				<Memberships />
			</div>
		);
	}
}

export default SuperUserConsole;

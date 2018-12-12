import React, { Component } from 'react';
import './SuperUserConsole.css';
import Memberships from '../../components/memberships/Memberships';
import Documents from '../../components/documents/Documents';
import TabooWords from '../tabooWord/TabooWord';

class SuperUserConsole extends Component {
	render() {
		return (
			<div className="SuperUserConsole">
				<Memberships />
				<Documents />
				<TabooWords />
			</div>

		);
	}
}

export default SuperUserConsole;

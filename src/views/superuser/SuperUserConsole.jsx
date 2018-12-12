import React, { Component } from 'react';
import './SuperUserConsole.css';
import Memberships from '../../components/memberships/Memberships';
import Documents from '../../components/documents/Documents';
import TabooSuggest from '../../components/taboo/TabooSuggest';

class SuperUserConsole extends Component {
	render() {
		return (
			<div className="SuperUserConsole">
				<Memberships />
				<Documents />
				<TabooSuggest />
			</div>
		);
	}
}

export default SuperUserConsole;

import React, { Component } from 'react';

import { Dropdown } from 'semantic-ui-react';

export default class AccountDropDown extends Component {

	handleLogout = (e) => {
		e.preventDefault();
		e.stopPropagation();

		alert("Successfully Logged Out!");
	}

	render() {

		return(
			<Dropdown text='Account' pointing className='link item'>
				<Dropdown.Menu>
					<Dropdown.Header>Profile</Dropdown.Header>
					<Dropdown.Item>Projects</Dropdown.Item>
					<Dropdown.Item>Settings</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item onClick={this.handleLogout}>Logout</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);

	}
}
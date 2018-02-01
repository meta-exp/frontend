import React, { Component } from 'react';
import NavItem from './NavItem';
import NavHeader from './NavHeader';
import NavPoints from './NavPoints';

class Nav extends Component {

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<NavHeader applicationName={this.props.applicationName} />
				<NavPoints navPoints={this.props.navPoints} />
			</nav>
		);
	}
	
}

export default Nav;
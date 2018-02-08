import React, { Component } from 'react';
import NavHeader from './NavHeader';
import NavPoints from './NavPoints';

class Nav extends Component {

	handlePageSelection = pageTitle => {
		this.props.onClick(pageTitle);
	}

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<NavHeader applicationName={this.props.applicationName} />
				<NavPoints onClick={this.handlePageSelection} navPoints={this.props.navPoints} />
			</nav>
		);
	}
	
}

export default Nav;
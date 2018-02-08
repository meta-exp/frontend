import React, { Component } from 'react';
import NavItem from './NavItem';
import Imprint from './Imprint';

class NavPoints extends Component {

	handleNavItemClick = pageTitle => {
		this.props.onClick(pageTitle);
	}

	render() {
		let navItems;

		if(this.props.navPoints){
			navItems = this.props.navPoints.map(item => {
				return (
					<NavItem onClick={this.handleNavItemClick} key={item.title} item={item} />
				);
			});
		}
		
		return (
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav mr-auto">
					{navItems}
					<Imprint href="https://hpi.de/impressum.html" />
				</ul>
			</div>
		);
	}

}

export default NavPoints;
import React, { Component } from 'react';
import NavItem from './NavItem';

class NavPoints extends Component {

	render() {
		let navItems;

		if(this.props.navPoints){
			navItems = this.props.navPoints.map(item => {
				return (
					<NavItem key={item.title} item={item} />
				);
			});
		}
		
		return (
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav mr-auto">
					{navItems}
				</ul>
			</div>
		);
	}

}

export default NavPoints;
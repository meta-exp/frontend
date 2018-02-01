import React, { Component } from 'react';

class NavItem extends Component {

	constructor(props){
		super(props);

		let itemClasses = "nav-link";

		if(this.props.item.active){
			itemClasses += " active";
		}

		this.state = {
			itemClasses: itemClasses
		};
	}

	render() {

		return (
			<li className="nav-item">
				<a className={this.state.itemClasses} href={this.props.item.href}>
					{this.props.item.title}
				</a>
			</li>
		);
	}

}

export default NavItem;
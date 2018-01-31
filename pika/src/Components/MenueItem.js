import React, { Component } from 'react';

class MenueItem extends Component {
	render() {
		let item_classes = "nav-link";
		if(this.props.item.active){
			item_classes += " active";
		}
		return (
			<li className="nav-item">
				<a className={item_classes} href={this.props.item.href}>
					{this.props.item.title}
				</a>
			</li>
		);
	}
}

export default MenueItem;
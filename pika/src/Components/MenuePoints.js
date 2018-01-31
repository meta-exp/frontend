import React, { Component } from 'react';
import MenueItem from './MenueItem';

class Menue extends Component {
	render() {
		let menueItems;
		if(this.props.menuePoints){
			menueItems = this.props.menuePoints.map(item => {
				return (
					<MenueItem key={item.title} item={item} />
				);
			});
		}
		return (
			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav mr-auto">
					{menueItems}
				</ul>
			</div>
		);
	}
}

export default Menue;
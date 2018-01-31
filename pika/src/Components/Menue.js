import React, { Component } from 'react';
import MenueItem from './MenueItem';
import MenueHeader from './MenueHeader';
import MenuePoints from './MenuePoints';

class Menue extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<MenueHeader applicationName={this.props.applicationName} />
				<MenuePoints menuePoints={this.props.menuePoints} />
			</nav>
		);
	}
}

export default Menue;
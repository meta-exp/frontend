import React, { Component } from 'react';

class Imprint extends Component {

	render() {
		return (
			<li className="nav-item">
				<a className="nav-link" target="_blank" href={this.props.href}>
					Impressum
				</a>
			</li>
		);
	}

}

export default Imprint;
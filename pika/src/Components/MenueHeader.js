import React, { Component } from 'react';

class Menue extends Component {
	render() {
		return (
			<div>
				<a className="navbar-brand" href="#">{this.props.applicationName}</a>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
			</div>
		);
	}
}

export default Menue;
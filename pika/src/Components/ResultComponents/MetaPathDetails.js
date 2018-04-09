import React, { Component } from 'react';

class MetaPathDetails extends Component {

	constructor(){
		super();
	}

	render(){
		return(
			<div>
				<h3>{this.props.details.label}</h3>
				<ul>
					<li>{this.props.details.id}</li>
					<li>{this.props.details.value}</li>
				</ul>
			</div>
		);
	}

}

export default MetaPathDetails;
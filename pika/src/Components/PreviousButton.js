import React, { Component } from 'react';

class PreviousButton extends Component {

	constructor(props){
		super(props);

		let btnClass = "float-left btn";

		if(this.props.active)
			btnClass += " btn-primary";
		else 
			btnClass += " btn-secondary";

		this.state = {
			btnClass: btnClass
		};
	}

	render() {
		return (
			<div className="col float-left" style={{marginLeft: 20 + 'px'}}>
				<a className={this.state.btnClass} href={this.props.href}>
					<span style={{marginRight: 10 + 'px'}} className="fas fa-arrow-left"></span>
					<span>Previous</span>
				</a>
			</div>
		);
	}
	
}

export default PreviousButton;
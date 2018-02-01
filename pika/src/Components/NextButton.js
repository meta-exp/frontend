import React, { Component } from 'react';

class NextButton extends Component {

	constructor(props){
		super(props);

		let btnClass = "float-right btn";

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
			<div className="col float-right" style={{marginRight: 20 + 'px'}}>
				<a className={this.state.btnClass} href={this.props.href}>
					<span>Next</span>
					<span style={{marginLeft: 10 + 'px'}} className="fas fa-arrow-right"></span>
				</a>
			</div>
		);
	}

}

export default NextButton;
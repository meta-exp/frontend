import React, { Component } from 'react';

class NextButton extends Component {

	handleClick = e => {
		e.preventDefault();
		e.stopPropagation();

		if(this.props.active){
			this.props.onClick(this.props.href);
		}
	}

	render() {
		let btnClass = "float-right btn";

		if(this.props.active)
			btnClass += " btn-primary";
		else 
			btnClass += " btn-secondary";

		return (
			<a onClick={this.handleClick} className={btnClass} href={this.props.href}>
				<span>Next</span>
				<span style={{marginLeft: 10 + 'px'}} className="fas fa-arrow-right"></span>
			</a>
		);
	}

}

export default NextButton;
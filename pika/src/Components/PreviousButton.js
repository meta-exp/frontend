import React, { Component } from 'react';

class PreviousButton extends Component {

	handleClick = e => {
		e.preventDefault();
		e.stopPropagation();

		if(this.props.active){
			this.props.onClick(this.props.href);
		}
	}

	render() {
		let btnClass = "float-left btn";

		if(this.props.active)
			btnClass += " btn-primary";
		else 
			btnClass += " btn-secondary";

		return (
			<div className="col float-left" style={{marginLeft: 20 + 'px'}}>
				<a onClick={this.handleClick} className={btnClass} href={this.props.href}>
					<span style={{marginRight: 10 + 'px'}} className="fas fa-arrow-left"></span>
					<span>Previous</span>
				</a>
			</div>
		);
	}
	
}

export default PreviousButton;
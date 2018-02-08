import React, { Component } from 'react';

class ResultSetSection extends Component {

	handleClick = e => {
		e.preventDefault();
		e.stopPropagation();

		alert("mark all buttons. not implemented yet!");
	}

	render() {
		return (
			<div>
				<h3>
					Query Result Set
					<button onClick={this.handleClick} className="btn btn-primary mark-all-nodes-btn">
						<i className="fas fa-map-marker-alt"></i>
						Mark all Nodes
					</button>
				</h3>
			</div>
		);
	}
	
}

export default ResultSetSection;
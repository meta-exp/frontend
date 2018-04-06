import React, { Component } from 'react';

class MetaPathRater extends Component {

	constructor(props){
		super();
		this.min = 0;
		this.max = 1;
		this.step = 0.01;

		this.state = {
			value: 0.5
		};
	}


	render() {
		return (
      //<button className="btn btn-danger float-right remove-meta-path-btn">X</button>
			<div><input
												type='range'
												min={this.min}
												max={this.max}
												ref={"metapath_rating_" + this.props.id}
												step={this.step}
												value={this.props.rating}
												onChange={event => this.props.onChange(event,this.props.id)}/>{this.props.rating} </div>
		);
	}

}

export default MetaPathRater;

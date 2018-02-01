import React, { Component } from 'react';

class MetaPathRater extends Component {

	constructor(props){
		super();
		this.min = 0;
		this.max = 1;
		this.step = 0.05;
	}

	render() {
		return (
      //<button className="btn btn-danger float-right remove-meta-path-btn">X</button>
			<div>{this.min}<input type='range' min={this.min} max={this.max} ref={"metapath_rating_" + this.props.id} step={this.step}/> {this.max} </div>
		);
	}

}

export default MetaPathRater;

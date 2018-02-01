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

	handleChange(event){
		this.setState({value: event.target.value});
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
												defaultValue={this.state.value}
												onChange={this.handleChange.bind(this)}/>{this.state.value} </div>
		);
	}

}

export default MetaPathRater;

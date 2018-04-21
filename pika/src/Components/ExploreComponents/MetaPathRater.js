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
			<div className="row">
				<div className="col">
					<input type='range'
						min={this.min}
						max={this.max}
						ref={"metapath_rating_" + this.props.id}
						step={this.step}
						value={this.props.rating}
						onChange={(event) => this.props.onChange(event,this.props.id)} 
					/>
				</div>
				<div className="col">
					{this.props.rating}
				</div>
			</div>
		);
	}

}

export default MetaPathRater;

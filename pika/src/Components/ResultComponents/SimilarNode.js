import React, { Component } from 'react';

class SimilarNode extends Component {

	constructor(){
		super();
	}

	render(){
		return(
			<div className="row">
				<div className="col" style={{marginRight: 10 + 'px'}}>
					<b>{this.props.similarNode.name}</b>
				</div>
				<div className="col" style={{marginLeft: 10 + 'px'}}>
					<b>Properties</b>
				</div>
			</div>
		);
	}

}

export default SimilarNode;

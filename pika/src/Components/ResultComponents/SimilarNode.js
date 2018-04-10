import React, { Component } from 'react';

class SimilarNode extends Component {

	constructor(){
		super();
	}

	render(){
		return(
			<div className="row">
				<div className="col" style={{marginRight: 10 + 'px'}}>
					<b>{this.props.similarNode.cypher_query}</b>
				</div>
				<div className="col" style={{marginLeft: 10 + 'px'}}>
					<ul>
						<li><b>Name:</b> {this.props.similarNode.properties.name}</li>
						<li><b>Node Type:</b>{this.props.similarNode.properties.label}</li>
					</ul>
				</div>
			</div>
		);
	}

}

export default SimilarNode;

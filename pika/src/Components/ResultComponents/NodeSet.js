import React, { Component } from 'react';
import { Neo4jGraphRenderer } from 'neo4j-graph-renderer';

class NodeSet extends Component {

	render() {
		return (
			<div>
				<h3>{this.props.title}</h3>
				<Neo4jGraphRenderer divId={this.props.graphId} url={this.props.dataset.url} user={this.props.dataset.username}
				password={this.props.dataset.password} query={this.props.cypherQuery} />
			</div>
		);
	}
	
}

export default NodeSet;
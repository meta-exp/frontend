import React, { Component } from 'react';
import { Neo4jGraphRenderer } from 'neo4j-graph-renderer';

class NodeSet extends Component {

	render() {
		return (
			<div>
				<h3>{this.props.title}</h3>
				<Neo4jGraphRenderer url="http://localhost:7494" user="neo4j"
				password="neo4j" query={this.props.cypherQuery} />
			</div>
		);
	}
	
}

export default NodeSet;
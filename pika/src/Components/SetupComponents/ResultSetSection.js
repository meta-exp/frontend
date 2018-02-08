import React, { Component } from 'react';

import { Button, Icon } from 'semantic-ui-react';

import { Neo4jGraphRenderer } from 'neo4j-graph-renderer';

class ResultSetSection extends Component {

	handleClick = e => {
		e.preventDefault();
		e.stopPropagation();

		alert("mark all buttons. not implemented yet!");
	}

	// TODO: Pass query to graph-render component

	render() {
		return (
			<div>
				<h3>
					Query Result Set
					<Button onClick={this.handleClick} style={{marginLeft: 20 + 'px'}} icon primary>
						<Icon name='checkmark' />
						<span style={{marginLeft: 10 + 'px'}}>Mark all Nodes</span>
					</Button>
				</h3>
				<Neo4jGraphRenderer url="http://localhost:7474" user="neo4j"
				password="neo4j2" query="MATCH (n)-[r]->(m) RETURN n,r,m"/>
			</div>
		);
	}
	
}

export default ResultSetSection;
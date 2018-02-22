import React, { Component } from 'react';

import { Button, Icon } from 'semantic-ui-react';

import { Neo4jGraphRenderer } from 'neo4j-graph-renderer';

class ResultSetSection extends Component {

	handleMarkAllNodesClick = e => {
		e.preventDefault();
		e.stopPropagation();

		var elements = document.getElementsByClassName("node");
    	
    	for (let i=0; i < elements.length; i++) {
    		elements[i].classList.add("marked");
    	}
	}

	handleResetAllNodesClick = e => {
		e.preventDefault();
		e.stopPropagation();

		var elements = document.getElementsByClassName("node");
    	
    	for (let i=0; i < elements.length; i++) {
    		elements[i].classList.remove("marked");
    	}
	}

	render() {
		return (
			<div>
				<h3>
					Query Result Set
					<Button onClick={this.handleMarkAllNodesClick} style={{marginLeft: 20 + 'px'}} icon primary>
						<Icon name='checkmark' />
						<span style={{marginLeft: 10 + 'px'}}>Mark all Nodes</span>
					</Button>
					<Button onClick={this.handleResetAllNodesClick} style={{marginLeft: 20 + 'px'}} icon primary>
						<Icon name='checkmark' />
						<span style={{marginLeft: 10 + 'px'}}>Reset all Nodes</span>
					</Button>
				</h3>
				<Neo4jGraphRenderer url="http://172.20.14.22:7474" user="neo4j"
				password="neo4j2" query={this.props.cypherQuery} />
			</div>
		);
	}
	
}

export default ResultSetSection;

//MATCH (n)-[r]->(m) RETURN n,r,m
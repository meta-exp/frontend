import React, { Component } from 'react';

import { Button, Icon } from 'semantic-ui-react';

import { Neo4jGraphRenderer } from 'neo4j-graph-renderer';

import NodeProperties from './NodeProperties';

import NodePropertyActions from '../../actions/NodePropertyActions';


class ResultSetSection extends Component {


	handleMarkAllNodesClick = e => {
		e.preventDefault();
		e.stopPropagation();

		let elements = document.getElementsByClassName("node");
    	
    	for (let i=0; i < elements.length; i++) {
    		elements[i].classList.add("marked");
    	}
	};

	handleResetAllNodesClick = e => {
		e.preventDefault();
		e.stopPropagation();

		let elements = document.getElementsByClassName("node");
    	
    	for (let i=0; i < elements.length; i++) {
    		elements[i].classList.remove("marked");
    	}
	};

    storeProps = (event, nodeProperties) => {
        NodePropertyActions.updateNodeProperties(nodeProperties);
        event.preventDefault();
        event.stopPropagation();
    };

	render() {
        window.scrollBy(100, 200);
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
				<Neo4jGraphRenderer url="http://localhost:7474" user="neo4j"
				password="neo4j1" query={this.props.cypherQuery} onClick={(event, node) => this.storeProps(event, node)}/>
    			<NodeProperties/>
			</div>
		);
	}
	
}

export default ResultSetSection;

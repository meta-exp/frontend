import React, { Component } from 'react';

import { Button, Icon } from 'semantic-ui-react';

import { Neo4jGraphRenderer } from 'neo4j-graph-renderer';

import NodeProperties from './NodeProperties';

import NodePropertyActions from '../../actions/NodePropertyActions';


import AccountStore from '../../stores/AccountStore';
import SetupStore from '../../stores/SetupStore';
import SetupActions from '../../actions/SetupActions';

class ResultSetSection extends Component {

	constructor(){
		super();

		this.handleMarkAllNodesClick = this.handleMarkAllNodesClick.bind(this);
		this.handleResetAllNodesClick = this.handleResetAllNodesClick.bind(this);
		this.getCyperQuery = this.getCyperQuery.bind(this);
		this.getDataset = this.getDataset.bind(this);
		this.addToNodeSetA = this.addToNodeSetA.bind(this);
		this.addToNodeSetB = this.addToNodeSetB.bind(this);
		this.addToNodeSetCandidates = this.addToNodeSetCandidates.bind(this);
		this.resetNodeCandidates = this.resetNodeCandidates.bind(this);

		this.nodeSetCandidates = [];

		this.state = {
			cypherQuery: 'RETURN 1',
			dataset: {}
		};
	}

	componentDidMount(){
		this.getDataset();
		SetupStore.on("change", this.getCyperQuery);
		AccountStore.on("change", this.getDataset);
	}

	componentWillUnmount(){
		SetupStore.removeListener("change", this.getCyperQuery);
		AccountStore.removeListener("change", this.getDataset);
	}

	getDataset(){
		this.setState({ dataset: AccountStore.getDataset() });
	}

	getCyperQuery(){
		this.setState({ cypherQuery: SetupStore.getCyperQuery() });
	}

	addToNodeSetA(e){
		e.preventDefault();
		e.stopPropagation();

		SetupActions.addToNodeSetA(this.nodeSetCandidates);
	}

	addToNodeSetB(e){
		e.preventDefault();
		e.stopPropagation();

		SetupActions.addToNodeSetB(this.nodeSetCandidates);
	}

	addToNodeSetCandidates(node){
		if(!this.nodeSetCandidates.includes(node.id)){
			this.nodeSetCandidates.push(node.id);
		}
		else{
			let candidate_index = this.nodeSetCandidates.indexOf(node.id);
			this.nodeSetCandidates.splice(candidate_index, 1);
		}
	}

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

    storeProps = nodeProperties => {
        NodePropertyActions.updateNodeProperties(nodeProperties);
    };

    handleNodeClickEvent = (event, nodeProperties) => {
		this.storeProps(nodeProperties);
		this.addToNodeSetCandidates(nodeProperties);
	};

	resetNodeCandidates(){
		this.nodeSetCandidates = [];
	}

	render() {
		this.resetNodeCandidates();

		return (
			<div>
				<h3>
					Query Result Set
					<Button onClick={(e) => this.addToNodeSetA(e)} style={{marginLeft: 20 + 'px'}} icon primary>
						<Icon name='add' />
						<span style={{marginLeft: 10 + 'px'}}>Add to Node Set A</span>
					</Button>
					<Button onClick={(e) => this.addToNodeSetB(e)} style={{marginLeft: 20 + 'px'}} icon primary>
						<Icon name='add' />
						<span style={{marginLeft: 10 + 'px'}}>Add to Node Set B</span>
					</Button>
					<Button floated='right' onClick={(e) => this.handleResetAllNodesClick(e)} style={{marginLeft: 20 + 'px'}} icon primary={false}>
						<Icon name='remove' />
						<span style={{marginLeft: 10 + 'px'}}>Reset all Nodes</span>
					</Button>
					<Button floated='right' onClick={(e) => this.handleMarkAllNodesClick(e)} style={{marginLeft: 20 + 'px'}} icon primary={false}>
						<Icon name='checkmark' />
						<span style={{marginLeft: 10 + 'px'}}>Mark all Nodes</span>
					</Button>
				</h3>
				<Neo4jGraphRenderer url={this.state.dataset.url} user={this.state.dataset.username} divId="1"
				password={this.state.dataset.password} query={this.state.cypherQuery} onClick={(event, node) => this.handleNodeClickEvent(event, node.propertyMap)}/>
    			<NodeProperties/>
			</div>
		);
	}
	
}

export default ResultSetSection;

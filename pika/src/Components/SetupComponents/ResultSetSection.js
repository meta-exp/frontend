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
		this.getCypherQuery = this.getCypherQuery.bind(this);
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
		SetupStore.on("change", this.getCypherQuery);
		AccountStore.on("change", this.getDataset);
	}

	componentWillUnmount(){
		SetupStore.removeListener("change", this.getCypherQuery);
		AccountStore.removeListener("change", this.getDataset);
	}

	getDataset(){
		this.setState({ dataset: AccountStore.getDataset() });
	}

	getCypherQuery(){
		this.setState({ cypherQuery: SetupStore.getCypherQuery() });
	}

	addToNodeSetA(e){
		e.preventDefault();
		e.stopPropagation();

		if(!SetupActions.addToNodeSetA(this.nodeSetCandidates)){
			this.resetNodeCandidates();
			this.handleResetAllNodesClick();
		}
	}

	addToNodeSetB(e){
		e.preventDefault();
		e.stopPropagation();

		if(!SetupActions.addToNodeSetB(this.nodeSetCandidates)){
			this.resetNodeCandidates();
			this.handleResetAllNodesClick();
		}
	}

	nodeIsOfSameType(node){
		if(this.nodeSetCandidates.length == 0){
			return true;
		}

		return node.labels[0] == this.nodeSetCandidates[0].labels[0];
	}

	addToNodeSetCandidates(e, node){
		if(!this.nodeSetCandidates.includes(node)){
			if(this.nodeIsOfSameType(node)){
				this.nodeSetCandidates.push(node);
				e.target.parentNode.classList.add("marked");
			}
			else{
				alert("Error: You can only select nodes of same type!");
			}
		}
		else{
			let candidate_index = this.nodeSetCandidates.indexOf(node);
			this.nodeSetCandidates.splice(candidate_index, 1);
			e.target.parentNode.classList.remove("marked");
		}
	}

	handleMarkAllNodesClick(){
		let elements = document.getElementsByClassName("node");
    	
    	for (let i=0; i < elements.length; i++) {
    		elements[i].classList.add("marked");
    	}
	};

	handleResetAllNodesClick(){
		let elements = document.getElementsByClassName("node");
    	
    	for (let i=0; i < elements.length; i++) {
    		elements[i].classList.remove("marked");
    	}
	};

    storeProps = nodeProperties => {
        NodePropertyActions.updateNodeProperties(nodeProperties);
    };

    handleNodeClickEvent = (event, node) => {
		this.storeProps(node.propertyMap);
		this.addToNodeSetCandidates(event, node);
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
					<Button floated='right' onClick={(e) => this.handleResetAllNodesClick()} style={{marginLeft: 20 + 'px'}} icon primary={false}>
						<Icon name='remove' />
						<span style={{marginLeft: 10 + 'px'}}>Reset all Nodes</span>
					</Button>
					<Button floated='right' onClick={(e) => this.handleMarkAllNodesClick()} style={{marginLeft: 20 + 'px'}} icon primary={false}>
						<Icon name='checkmark' />
						<span style={{marginLeft: 10 + 'px'}}>Mark all Nodes</span>
					</Button>
				</h3>
				<Neo4jGraphRenderer url={this.state.dataset.url} user={this.state.dataset.username} divId="1"
				password={this.state.dataset.password} query={this.state.cypherQuery} onClick={(event, node) => this.handleNodeClickEvent(event, node)}/>
    			<NodeProperties />
			</div>
		);
	}
	
}

export default ResultSetSection;

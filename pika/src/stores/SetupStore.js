import { EventEmitter } from "events";
import SetupDispatcher from '../dispatchers/SetupDispatcher';
import SetupActionTypes from '../actions/SetupActionTypes';

class SetupStore extends EventEmitter {

	constructor(){
		super();

		this.cypherQuery = 'RETURN 1';
		this.initialCypherQuery = null;
		this.nodeSetA = [];
		this.nodeSetB = [];
		this.nodeSetQueryA = 'RETURN 1';
		this.nodeSetQueryB = 'RETURN 1';
	}

	getNodeSetQueryA(){
		return this.nodeSetQueryA;
	}

	getNodeSetQueryB(){
		return this.nodeSetQueryB;
	}

	getNodeSetA(){
		return this.nodeSetA;
	}

	getNodeSetB(){
		return this.nodeSetB;
	}

	getCypherQuery(){
		return this.cypherQuery;
	}

	getInitialCypherQuery(){
		return this.initialCypherQuery;
	}

	setCypherQuery(query){
		this.cypherQuery = query;
		this.emit("change");
	}

	setNodeSetA(nodeSet){
		this.nodeSetA = nodeSet;
		this.emit("change");
	}

	setNodeSetB(nodeSet){
		this.nodeSetB = nodeSet;
		this.emit("change");
	}

    static constructCypherQuery(nodeList){
		return "Match (n) where ID(n) in [" + nodeList + "] return n";
	}

	extractIdList(nodeSet){
		return nodeSet.map((node) => { return node.propertyMap.id; });
	}

	extractTypeOfNodeSet(nodeSet){
		return nodeSet[0].labels[0];
	}

	static nodesAreOfSameTypeAsSet(nodes, nodeSet){
		if(nodeSet.length == 0 || nodes.length == 0){
			return true;
		}

		return nodes[0].labels[0] == nodeSet[0].labels[0];
	}

	addToNodeSetA(nodes){
		if(!SetupStore.nodesAreOfSameTypeAsSet(nodes, this.nodeSetA)){
			alert("Error: Type of nodes you want to add must be equal to type of existing nodes in set!");
			return false;
		}

		let that = this;
		nodes.forEach(function(node){
			if(!that.nodeSetA.includes(node)){
				that.nodeSetA.push(node);
			}
		});
		this.nodeSetQueryA = SetupStore.constructCypherQuery(this.extractIdList(this.nodeSetA));
		this.emit("change");
	}

	addToNodeSetB(nodes){
		if(!SetupStore.nodesAreOfSameTypeAsSet(nodes, this.nodeSetB)){
			alert("Error: Type of nodes you want to add must be equal to type of existing nodes in set!");
			return false;
		}

		let that = this;
		nodes.forEach(function(node){
			if(!that.nodeSetB.includes(node)){
				that.nodeSetB.push(node);
			}
		});
		this.nodeSetQueryB = SetupStore.constructCypherQuery(this.extractIdList(this.nodeSetB));
		this.emit("change");
	}

	removeNodeFromNodeSetA(node){
		let node_index = this.nodeSetA.indexOf(node);
		this.nodeSetA.splice(node_index, 1);
		this.nodeSetQueryA = SetupStore.constructCypherQuery(this.extractIdList(this.nodeSetA));
		this.emit("change");
	}

	removeNodeFromNodeSetB(node){
		let node_index = this.nodeSetB.indexOf(node);
		this.nodeSetB.splice(node_index, 1);
		this.nodeSetQueryB = SetupStore.constructCypherQuery(this.extractIdList(this.nodeSetB));
		this.emit("change");
	}

	setInitialCypherQuery(nodeTypes){
		this.initialCypherQuery = 'MATCH (n:' + nodeTypes[0][0] + ') RETURN n LIMIT 10';
		this.emit("change");
	}

	handleActions(action){
		switch(action.type){
			case SetupActionTypes.EXECUTE_CYPHER_QUERY: {
				this.setCypherQuery(action.payload.query);
				return this.cypherQuery;
			};
			case SetupActionTypes.ADD_NODES_TO_NODE_SET_A: {
				this.addToNodeSetA(action.payload.nodes);
				return this.nodeSetA;
			};
			case SetupActionTypes.ADD_NODES_TO_NODE_SET_B: {
				this.addToNodeSetB(action.payload.nodes);
				return this.nodeSetB;
			};
			case SetupActionTypes.REMOVE_NODE_FROM_NODE_SET_A: {
				this.removeNodeFromNodeSetA(action.payload.node);
				return this.nodeSetA;
			};
			case SetupActionTypes.REMOVE_NODE_FROM_NODE_SET_B: {
				this.removeNodeFromNodeSetB(action.payload.node);
				return this.nodeSetA;
			};
			case SetupActionTypes.UPDATE_INITIAL_CYPHER_QUERY: {
				this.setInitialCypherQuery(action.payload.nodeTypes);
				return this.initialCypherQuery;
			};
			default: {
				return this.state;
			}
		}
	}

}

const setupStore = new SetupStore ;
SetupDispatcher.register(setupStore.handleActions.bind(setupStore));

export default setupStore;
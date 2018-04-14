import { EventEmitter } from "events";
import SetupDispatcher from '../dispatchers/SetupDispatcher';
import SetupActionTypes from '../actions/SetupActionTypes';

class SetupStore extends EventEmitter {

	constructor(){
		super();

		this.cypherQuery = 'RETURN 1';
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

	addToNodeSetA(nodes){
		let that = this;
		nodes.forEach(function(node){
			if(!that.nodeSetA.includes(node)){
				that.nodeSetA.push(node);
			}
		});
		this.nodeSetQueryA = SetupStore.constructCypherQuery(this.nodeSetA);
		this.emit("change");
	}

	addToNodeSetB(nodes){
		let that = this;
		nodes.forEach(function(node){
			if(!that.nodeSetB.includes(node)){
				that.nodeSetB.push(node);
			}
		});
		this.nodeSetQueryB = SetupStore.constructCypherQuery(this.nodeSetB);
		this.emit("change");
	}

	removeNodeFromNodeSetA(node){
		let node_index = this.nodeSetA.indexOf(node);
		this.nodeSetA.splice(node_index, 1);
		this.nodeSetQueryA = SetupStore.constructCypherQuery(this.nodeSetA);
		this.emit("change");
	}

	removeNodeFromNodeSetB(node){
		let node_index = this.nodeSetB.indexOf(node);
		this.nodeSetB.splice(node_index, 1);
		this.nodeSetQueryB = SetupStore.constructCypherQuery(this.nodeSetB);
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
			default: {
				return this.state;
			}
		}
	}

}

const setupStore = new SetupStore ;
SetupDispatcher.register(setupStore.handleActions.bind(setupStore));

export default setupStore;
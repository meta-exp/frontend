import { EventEmitter } from "events";
import SetupDispatcher from '../dispatchers/SetupDispatcher';
import SetupActionTypes from '../actions/SetupActionTypes';

class SetupStore extends EventEmitter {

	constructor(){
		super();

		this.cyperQuery = 'RETURN 1';
		this.nodeSetA = [];
		this.nodeSetB = [];
		this.nodeSetQueryA = 'match (n) return n limit 10';
		this.nodeSetQueryB = 'match (n) return n limit 5';
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

	getCyperQuery(){
		return this.cyperQuery;
	}

	setCyperQuery(query){
		this.cyperQuery = query;
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

	addToNodeSetA(nodes){
		let that = this;
		nodes.forEach(function(node){
			if(!that.nodeSetA.includes(node)){
				that.nodeSetA.push(node);
			}
		});
        console.log(this.nodeSetA);
		this.emit("change");
	}

	addToNodeSetB(nodes){
		let that = this;
		nodes.forEach(function(node){
			if(!that.nodeSetB.includes(node)){
				that.nodeSetB.push(node);
			}
		});
		console.log(this.nodeSetB);
		this.emit("change");
	}

	handleActions(action){
		switch(action.type){
			case SetupActionTypes.EXECUTE_CYPHER_QUERY: {
				this.setCyperQuery(action.payload.query);
				return this.cyperQuery;
			};
			case SetupActionTypes.ADD_NODES_TO_NODE_SET_A: {
				this.addToNodeSetA(action.payload.nodes);
				return this.nodeSetA;
			};
			case SetupActionTypes.ADD_NODES_TO_NODE_SET_B: {
				this.addToNodeSetB(action.payload.nodes);
				return this.nodeSetB;
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
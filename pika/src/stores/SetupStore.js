import { EventEmitter } from "events";
import SetupDispatcher from '../dispatchers/SetupDispatcher';
import SetupActionTypes from '../actions/SetupActionTypes';

class SetupStore extends EventEmitter {

	constructor(){
		super();

		this.cyperQuery = 'RETURN 1';
		this.nodeSetA = [];
		this.nodeSetB = [];
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

	handleActions(action){
		switch(action.type){
			case SetupActionTypes.EXECUTE_CYPHER_QUERY: {
				this.setCyperQuery(action.payload.query);
				return this.cyperQuery;
			};
			case SetupActionTypes.UPDATE_NODE_SET_A: {
				this.setNodeSetA(action.payload.nodeSet);
				return this.nodeSetA;
			};
			case SetupActionTypes.UPDATE_NODE_SET_A: {
				this.setNodeSetB(action.payload.nodeSet);
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
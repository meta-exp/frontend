import { EventEmitter } from "events";
import ConfigDispatcher from '../dispatchers/ConfigDispatcher';
import ConfigActionTypes from '../actions/ConfigActionTypes';

class ConfigStore extends EventEmitter {

	constructor(){
		super();

		this.nodeTypes = [];
		this.edgeTypes = [];
	}

	getNodeTypes(){
		return this.nodeTypes;
	}

	getEdgeTypes(){
		return this.edgeTypes;
	}

	receiveNodeTypes(nodeTypes){
		this.nodeTypes = nodeTypes;
		this.emit("change");
	}

	receiveEdgeTypes(edgeTypes){
		this.edgeTypes = edgeTypes;
		this.emit("change");
	}

	handleActions(action){
		switch(action.type){
			case ConfigActionTypes.RECEIVE_NODE_TYPES: {
				this.receiveNodeTypes(action.payload.nodeTypes);
				return this.nodeTypes;
			};
			case ConfigActionTypes.RECEIVE_EDGE_TYPES: {
				this.receiveEdgeTypes(action.payload.edgeTypes);
				return this.edgeTypes;
			};
		}
	}

}

const configStore = new ConfigStore;
ConfigDispatcher.register(configStore.handleActions.bind(configStore));

export default configStore;
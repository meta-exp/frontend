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

	changeNodeTypeState(index){
		this.nodeTypes[index][1] = !this.nodeTypes[index][1];
		this.emit("change");
	}

	changeEdgeTypeState(index){
		this.edgeTypes[index][1] = !this.edgeTypes[index][1];
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
			case ConfigActionTypes.CHANGE_NODE_TYPE_STATE: {
				this.changeNodeTypeState(action.payload.nodeIndex);
				return this.nodeTypes[action.payload.nodeIndex];
			};
			case ConfigActionTypes.CHANGE_EDGE_TYPE_STATE: {
				this.changeEdgeTypeState(action.payload.edgeIndex);
				return this.nodeTypes[action.payload.edgeIndex];
			};
		}
	}

}

const configStore = new ConfigStore;
ConfigDispatcher.register(configStore.handleActions.bind(configStore));

export default configStore;
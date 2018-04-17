import SetupActionTypes from './SetupActionTypes';
import SetupDispatcher from '../dispatchers/SetupDispatcher';
import MetaPathAPI from '../utils/MetaPathAPI';

const SetupActions = {
	executeQuery(query){
		SetupDispatcher.dispatch({
			type: SetupActionTypes.EXECUTE_CYPHER_QUERY,
			payload: {query: query}
		});
	},

	addToNodeSetA(nodes){
		SetupDispatcher.dispatch({
			type: SetupActionTypes.ADD_NODES_TO_NODE_SET_A,
			payload: {nodes: nodes}
		});
	},

	addToNodeSetB(nodes){
		SetupDispatcher.dispatch({
			type: SetupActionTypes.ADD_NODES_TO_NODE_SET_B,
			payload: {nodes: nodes}
		});
	},

	sendNodeSets(nodeSetA, nodeSetB, nodeSetTypeA, nodeSetTypeB){
		SetupDispatcher.dispatch({
			type: SetupActionTypes.SAVE_NODE_SETS
		});
		MetaPathAPI.sendNodeSets(nodeSetA, nodeSetB);
		MetaPathAPI.sendNodeSetTypes(nodeSetTypeA, nodeSetTypeB);
	},

	removeNodeFromNodeSetA(node){
		SetupDispatcher.dispatch({
			type: SetupActionTypes.REMOVE_NODE_FROM_NODE_SET_A,
			payload: {node: node}
		});
	},

	removeNodeFromNodeSetB(node){
		SetupDispatcher.dispatch({
			type: SetupActionTypes.REMOVE_NODE_FROM_NODE_SET_B,
			payload: {node: node}
		});
	},

	updateInitialCypherQuery(nodeTypes){
		SetupDispatcher.dispatch({
			type: SetupActionTypes.UPDATE_INITIAL_CYPHER_QUERY,
			payload: {nodeTypes: nodeTypes}
		});
	}

}

export default SetupActions;
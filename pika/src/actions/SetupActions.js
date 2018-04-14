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

	sendNodeSets(nodeSetA, nodeSetB){
		SetupDispatcher.dispatch({
			type: SetupActionTypes.SAVE_NODE_SETS
		});
		MetaPathAPI.sendNodeSets(nodeSetA, nodeSetB);
	}

}

export default SetupActions;
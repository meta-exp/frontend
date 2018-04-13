import SetupActionTypes from './SetupActionTypes';
import SetupDispatcher from '../dispatchers/SetupDispatcher';

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
	}

}

export default SetupActions;
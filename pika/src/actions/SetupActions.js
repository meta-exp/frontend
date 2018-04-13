import SetupActionTypes from './SetupActionTypes';
import SetupDispatcher from '../dispatchers/SetupDispatcher';

const SetupActions = {
	executeQuery(query){
		SetupDispatcher.dispatch({
			type: SetupActionTypes.EXECUTE_CYPHER_QUERY,
			payload: {query: query}
		});
	},

	updateNodeSetA(nodeSet){
		SetupDispatcher.dispatch({
			type: SetupActionTypes.UPDATE_NODE_SET_A,
			payload: {nodeSet: nodeSet}
		});
	},

	updateNodeSetB(nodeSet){
		SetupDispatcher.dispatch({
			type: SetupActionTypes.UPDATE_NODE_SET_B,
			payload: {nodeSet: nodeSet}
		});
	}

}

export default SetupActions;
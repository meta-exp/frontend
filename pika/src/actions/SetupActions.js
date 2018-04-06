import SetupActionTypes from './SetupActionTypes';
import SetupDispatcher from '../dispatchers/SetupDispatcher';

const SetupActions = {
	executeQuery(query){
		SetupDispatcher.dispatch({
			type: SetupActionTypes.EXECUTE_CYPHER_QUERY,
			payload: {
				query: query
			}
		});
	}
}

export default SetupActions;
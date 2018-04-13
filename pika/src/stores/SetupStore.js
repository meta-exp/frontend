import { EventEmitter } from "events";
import SetupDispatcher from '../dispatchers/SetupDispatcher';
import SetupActionTypes from '../actions/SetupActionTypes';

class SetupStore extends EventEmitter {

	constructor(){
		super();

		this.cyperQuery = 'RETURN 1';
	}

	getCyperQuery(){
		return this.cyperQuery;
	}

	setCyperQuery(query){
		this.cyperQuery = query;
		this.emit("change");
	}

	handleActions(action){
		switch(action.type){
			case SetupActionTypes.EXECUTE_CYPHER_QUERY: {
				this.setCyperQuery(action.payload.query);
				return this.cyperQuery;
			};
		}
	}

}

const setupStore = new SetupStore ;
SetupDispatcher.register(setupStore.handleActions.bind(setupStore));

export default setupStore;
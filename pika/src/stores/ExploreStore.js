import { EventEmitter } from "events";
import ExploreDispatcher from '../dispatchers/ExploreDispatcher';
import ExploreActionTypes from '../actions/ExploreActionTypes';

class ExploreStore extends EventEmitter {

	constructor(){
		super();
		this.metapaths = [];
	}

	getMetaPaths(){
		return this.metapaths;
	}

	receiveMetaPaths(metapaths){
		this.metapaths = metapaths;
		this.emit("change");
	}

	handleActions(action){
		switch(action.type){
			case ExploreActionTypes.RECEIVE_METAPATHS: {
				this.receiveMetaPaths(action.payload.metapaths);
			}
		}
	}

}

const exploreStore = new ExploreStore;
ExploreDispatcher.register(exploreStore.handleActions.bind(exploreStore));

export default exploreStore;
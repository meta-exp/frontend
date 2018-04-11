import { EventEmitter } from "events";
import ExploreDispatcher from '../dispatchers/ExploreDispatcher';
import ExploreActionTypes from '../actions/ExploreActionTypes';

class ExploreStore extends EventEmitter {

	constructor(){
		super();
		this.metapaths = [];
		this.ratedMetapaths = [];
		this.batchSize=5;
        this.interfaceState=true;
	}

	getMetaPaths(){
		return this.metapaths;
	}

	getRatedMetaPaths(){
		return this.ratedMetapaths;
	}

	getBatchSize(){
		return this.batchSize;
	}

	getInterfaceState(){
		return this.interfaceState;
	}

	receiveMetaPaths(metapaths){
		this.ratedMetapaths = this.ratedMetapaths.concat(this.metapaths);
		this.metapaths = metapaths;
		this.emit("change");
	}

	changeRating(id, rating){
        const metapaths = this.metapaths.slice();
        let index = this.metapaths.findIndex(x => x.id === id);
        metapaths[index].rating =  parseFloat(rating);
        this.metapaths = metapaths;
	}

	handleActions(action){
		switch(action.type){
			case ExploreActionTypes.RECEIVE_METAPATHS: {
				this.receiveMetaPaths(action.payload.metapaths);
				return this.metapaths;
			}
			case ExploreActionTypes.CHANGE_BATCH_SIZE: {
				this.batchSize = action.payload.batchSize;
				this.emit("change");
				return this.batchSize;
			}
			case ExploreActionTypes.TOGGLE_INTERFACE:{
				this.interfaceState = !this.interfaceState;
				this.emit("change");
				return this.interfaceState;
			}
			case ExploreActionTypes.CHANGE_RATING:{
				this.changeRating(action.payload.id, action.payload.rating);
				this.emit("change");
				return action.payload.rating;
			}
		}
	}

}

const exploreStore = new ExploreStore;
ExploreDispatcher.register(exploreStore.handleActions.bind(exploreStore));

export default exploreStore;
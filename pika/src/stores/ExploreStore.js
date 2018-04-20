import { EventEmitter } from "events";
import ExploreDispatcher from '../dispatchers/ExploreDispatcher';
import ExploreActionTypes from '../actions/ExploreActionTypes';

class ExploreStore extends EventEmitter {

	constructor(){
		super();
		this.metapaths = [];
		this.batchSize=5;
        this.interfaceState=true;
        this.minPath={};
        this.maxPath={};
        this.stepsize=0.01;
	}

	getStepsize(){
	    return this.stepsize;
    }

	getMetaPaths(){
		return this.metapaths;
	}

	getBatchSize(){
		return this.batchSize;
	}

	getInterfaceState(){
		return this.interfaceState;
	}

	getMinPath(){
		return this.minPath;
	}

	getMaxPath(){
		return this.maxPath;
	}

	receiveMetaPaths(metapaths, next_batch_available, minPath, maxPath){
		this.metapaths = metapaths;
        if(minPath !== undefined){
            this.minPath = minPath;
            this.maxPath = maxPath;
        }
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
				this.receiveMetaPaths(action.payload.metapaths, action.payload.nextBatchAvailable,action.payload.minPath,action.payload.maxPath);

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
			case ExploreActionTypes.CHANGE_MAXPATH_RATING:{
				this.maxPath.rating = Math.max(action.payload.rating,this.minPath.rating+ this.stepsize);
				this.emit("change");
				return this.maxPath.rating;
			}
			case ExploreActionTypes.CHANGE_MINPATH_RATING:{
				this.minPath.rating = Math.min(this.maxPath.rating - this.stepsize, action.payload.rating);
				this.emit("change");
				return this.minPath.rating;
			}
		}
	}

}

const exploreStore = new ExploreStore;
ExploreDispatcher.register(exploreStore.handleActions.bind(exploreStore));

export default exploreStore;
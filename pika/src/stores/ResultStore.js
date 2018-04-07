import { EventEmitter } from "events";
import ResultDispatcher from '../dispatchers/ResultDispatcher';
import ResultActionTypes from '../actions/ResultActionTypes';

class ResultStore extends EventEmitter {

	constructor(){
		super();
		this.similarityScore = 0.0;
	}

	getSimilarityScore(){
		return this.similarityScore;
	}

	receiveSimilarityScore(similarityScore){
		this.similarityScore = similarityScore;
		this.emit("change");
	}

	handleActions(action){
		switch(action.type){
			case ResultActionTypes.RECEIVE_SIMILARITY_SCORE: {
				this.receiveSimilarityScore(action.payload.similarityScore);
				return this.similarityScore;
			};
		}
	}

}

const resultStore = new ResultStore;
ResultDispatcher.register(resultStore.handleActions.bind(resultStore));

export default resultStore;
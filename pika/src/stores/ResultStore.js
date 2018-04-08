import { EventEmitter } from "events";
import ResultDispatcher from '../dispatchers/ResultDispatcher';
import ResultActionTypes from '../actions/ResultActionTypes';

class ResultStore extends EventEmitter {

	constructor(){
		super();
		this.similarityScore = 0.0;
		this.firstNodeSetQuery = 'MATCH (n) RETURN n';
		this.secondNodeSetQuery = 'MATCH (n) RETURN n';
	}

	getSimilarityScore(){
		return this.similarityScore;
	}

	receiveSimilarityScore(similarityScore){
		this.similarityScore = similarityScore;
		this.emit("change");
	}

	getFirstNodeSetQuery(){
		return this.firstNodeSetQuery;
	}

	getSecondNodeSetQuery(){
		return this.secondNodeSetQuery;
	}

	receiveFirstNodeSetQuery(nodeSetQuery){
		this.firstNodeSetQuery = nodeSetQuery;
	}

	receiveSecondNodeSetQuery(nodeSetQuery){
		this.secondNodeSetQuery = nodeSetQuery;
	}

	handleActions(action){
		switch(action.type){
			case ResultActionTypes.RECEIVE_SIMILARITY_SCORE: {
				this.receiveSimilarityScore(action.payload.similarityScore);
				return this.similarityScore;
			};
			case ResultActionTypes.RECEIVE_FIRST_NODE_SET_QUERY: {
				this.receiveFirstNodeSetQuery(action.payload.nodeSetQuery);
				return this.firstNodeSetQuery;
			};
			case ResultActionTypes.RECEIVE_SECOND_NODE_SET_QUERY: {
				this.receiveSecondNodeSetQuery(action.payload.nodeSetQuery);
				return this.secondNodeSetQuery;
			};
		}
	}

}

const resultStore = new ResultStore;
ResultDispatcher.register(resultStore.handleActions.bind(resultStore));

export default resultStore;

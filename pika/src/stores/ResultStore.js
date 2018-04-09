import { EventEmitter } from "events";
import ResultDispatcher from '../dispatchers/ResultDispatcher';
import ResultActionTypes from '../actions/ResultActionTypes';

class ResultStore extends EventEmitter {

	constructor(){
		super();
		this.similarityScore = 0.0;
		this.firstNodeSetQuery = 'MATCH (n) RETURN n';
		this.secondNodeSetQuery = 'MATCH (n) RETURN n';
		this.contributingMetaPaths = [];
		this.metaPathDetails = {
			"id": 0,
			"name": "Meta-Path 0",
			"structural_value": 0,
			"contribution_ranking": 0,
			"contribution_value": 0,
			"meta_path": "---"
		};
	}

	getMetaPathDetails(){
		return this.metaPathDetails;
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
		this.emit("change");
	}

	receiveSecondNodeSetQuery(nodeSetQuery){
		this.secondNodeSetQuery = nodeSetQuery;
		this.emit("change");
	}

	getContributingMetaPaths(){
		return this.contributingMetaPaths;
	}

	receiveContributingMetaPaths(metaPaths){
		this.contributingMetaPaths = metaPaths;
		this.emit("change");
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
			case ResultActionTypes.RECEIVE_CONTRIBUTING_META_PATHS: {
				this.receiveContributingMetaPaths(action.payload.metaPaths);
				return this.contributingMetaPaths;
			};
		}
	}

}

const resultStore = new ResultStore;
ResultDispatcher.register(resultStore.handleActions.bind(resultStore));

export default resultStore;

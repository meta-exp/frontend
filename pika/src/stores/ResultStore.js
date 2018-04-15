import { EventEmitter } from "events";
import ResultDispatcher from '../dispatchers/ResultDispatcher';
import ResultActionTypes from '../actions/ResultActionTypes';

class ResultStore extends EventEmitter {

	constructor(){
		super();
		this.similarityScore = 0.0;
		this.contributingMetaPaths = [];
		this.metaPathDetails = {};
		this.similarNodes = [];
	}

	getSimilarNodes(){
		return this.similarNodes;
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

	getContributingMetaPaths(){
		return this.contributingMetaPaths;
	}

	receiveContributingMetaPaths(metaPaths){
		this.contributingMetaPaths = metaPaths;
		this.emit("change");
	}

	receiveMetaPathDetails(metaPath){
		this.metaPathDetails = metaPath;
		this.emit("change");
	}

	receiveSimilarNodes(similarNodes){
		this.similarNodes = similarNodes;
		this.emit("change");
	}

	handleActions(action){
		switch(action.type){
			case ResultActionTypes.RECEIVE_SIMILARITY_SCORE: {
				this.receiveSimilarityScore(action.payload.similarityScore);
				return this.similarityScore;
			};
			case ResultActionTypes.RECEIVE_CONTRIBUTING_META_PATHS: {
				this.receiveContributingMetaPaths(action.payload.metaPaths);
				return this.contributingMetaPaths;
			};
			case ResultActionTypes.RECEIVE_META_PATH_DETAILS: {
				this.receiveMetaPathDetails(action.payload.metaPath);
				return this.metaPathDetails;
			};
			case ResultActionTypes.RECEIVE_SIMILAR_NODES: {
				this.receiveSimilarNodes(action.payload.similarNodes);
				return this.similarNodes;
			};
		}
	}

}

const resultStore = new ResultStore;
ResultDispatcher.register(resultStore.handleActions.bind(resultStore));

export default resultStore;

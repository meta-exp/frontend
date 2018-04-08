import ResultActionTypes from './ResultActionTypes';
import ResultDispatcher from '../dispatchers/ResultDispatcher';
import MetaPathAPI from '../utils/MetaPathAPI';

const ResultActions = {

  fetchSimilarityScore(){
    ResultDispatcher.dispatch({
      type: ResultActionTypes.FETCH_SIMILARITY_SCORE
    });
    MetaPathAPI.fetchSimilarityScore();
  },

  receiveSimilarityScore(similarityScore){
    ResultDispatcher.dispatch({
      type: ResultActionTypes.RECEIVE_SIMILARITY_SCORE,
      payload: {similarityScore: similarityScore}
    });
  },

  fetchFirstNodeSetQuery(){
    ResultDispatcher.dispatch({
      type: ResultActionTypes.FETCH_FIRST_NODE_SET_QUERY
    });
    MetaPathAPI.fetchFirstNodeSetQuery();
  },

  fetchSecondNodeSetQuery(){
    ResultDispatcher.dispatch({
      type: ResultActionTypes.FETCH_SECOND_NODE_SET_QUERY
    });
    MetaPathAPI.fetchSecondNodeSetQuery();
  },

  receiveFirstNodeSetQuery(nodeSetQuery){
    ResultDispatcher.dispatch({
      type: ResultActionTypes.RECEIVE_FIRST_NODE_SET_QUERY,
      payload: {nodeSetQuery: nodeSetQuery}
    });
  },

  receiveSecondNodeSetQuery(nodeSetQuery){
    ResultDispatcher.dispatch({
      type: ResultActionTypes.RECEIVE_SECOND_NODE_SET_QUERY,
      payload: {nodeSetQuery: nodeSetQuery}
    });
  },

  fetchContributingMetaPaths(){
    ResultDispatcher.dispatch({
      type: ResultActionTypes.FETCH_CONTRIBUTING_META_PATHS
    });
    MetaPathAPI.fetchContributingMetaPaths();
  },

  receiveContributingMetaPaths(metaPaths){
    ResultDispatcher.dispatch({
      type: ResultActionTypes.RECEIVE_CONTRIBUTING_META_PATHS,
      payload: {metaPaths: metaPaths}
    });
  },

};

export default ResultActions;

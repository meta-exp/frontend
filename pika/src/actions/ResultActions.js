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

  fetchMetaPathDetails(metaPathId){
    ResultDispatcher.dispatch({
      type: ResultActionTypes.FETCH_META_PATH_DETAILS,
      payload: {metaPathId: metaPathId}
    });
    MetaPathAPI.fetchMetaPathDetails(metaPathId);
  },

  receiveMetaPathDetails(metaPath){
    ResultDispatcher.dispatch({
      type: ResultActionTypes.RECEIVE_META_PATH_DETAILS,
      payload: {metaPath: metaPath}
    });
  },

  fetchSimilarNodes(){
    ResultDispatcher.dispatch({
      type: ResultActionTypes.FETCH_SIMILAR_NODES
    });
    MetaPathAPI.fetchSimilarNodes();
  },

  receiveSimilarNodes(similarNodes){
    ResultDispatcher.dispatch({
      type: ResultActionTypes.RECEIVE_SIMILAR_NODES,
      payload: {similarNodes: similarNodes}
    });
  }

};

export default ResultActions;

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
  }

};

export default ResultActions;

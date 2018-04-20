import ExploreActionTypes from './ExploreActionTypes';
import ExploreDispatcher from '../dispatchers/ExploreDispatcher';
import MetaPathAPI from '../utils/MetaPathAPI';

const ExploreActions = {

  fetchMetaPaths(batchSize){
    ExploreDispatcher.dispatch({
      type: ExploreActionTypes.FETCH_METAPATHS
    });
    MetaPathAPI.fetchMetaPaths(batchSize);
  },


  toggleInterface(){
  ExploreDispatcher.dispatch({
      type: ExploreActionTypes.TOGGLE_INTERFACE
  })
  },
  changeRating(id, rating){
  ExploreDispatcher.dispatch({
      type: ExploreActionTypes.CHANGE_RATING,
      payload: {id: id,
                rating: rating}
  })
  },
  changeMinPathRating(rating){
    ExploreDispatcher.dispatch({
        type: ExploreActionTypes.CHANGE_MINPATH_RATING,
        payload: {rating: rating}
    })
    },

  changeMaxPathRating(rating){
      ExploreDispatcher.dispatch({
          type: ExploreActionTypes.CHANGE_MAXPATH_RATING,
          payload: {rating: rating}
      })
  },

  receiveMetaPaths(metapaths,nextBatchAvailable,minPath,maxPath){
    ExploreDispatcher.dispatch({
      type: ExploreActionTypes.RECEIVE_METAPATHS,
      payload: {metapaths: metapaths,
                nextBatchAvailable: nextBatchAvailable,
                maxPath: maxPath,
                minPath: minPath}
    });
  },

  changeBatchSize(batchSize){
  ExploreDispatcher.dispatch({
      type: ExploreActionTypes.CHANGE_BATCH_SIZE,
      payload: {batchSize: batchSize}
  })
  },

  sendRatedMetaPaths(ratedMetaPaths, minPath, maxPath){
    ExploreDispatcher.dispatch({
        type: ExploreActionTypes.SEND_RATED_METAPATHS,
        payload: {ratedMetaPaths: ratedMetaPaths}
    });
    MetaPathAPI.sendRatedMetaPaths(ratedMetaPaths, minPath, maxPath);
  }

};

export default ExploreActions;

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

  receiveMetaPaths(metapaths){
    ExploreDispatcher.dispatch({
      type: ExploreActionTypes.RECEIVE_METAPATHS,
      payload: {metapaths: metapaths}
    });
  },

    changeBatchSize(batchSize){
    ExploreDispatcher.dispatch({
        type: ExploreActionTypes.CHANGE_BATCH_SIZE,
        payload: {batchSize: batchSize}
    })
    },

  sendRatedMetaPaths(ratedMetaPaths){
    ExploreDispatcher.dispatch({
        type: ExploreActionTypes.SEND_RATED_METAPATHS,
        payload: {ratedMetaPaths: ratedMetaPaths}
    });
    MetaPathAPI.sendRatedMetaPaths(ratedMetaPaths);
  }

};

export default ExploreActions;

import ExploreActionTypes from './ExploreActionTypes';
import ExploreDispatcher from '../dispatchers/ExploreDispatcher';
import MetaPathAPI from '../utils/MetaPathAPI';

const ExploreActions = {

  fetchMetaPaths(){
    ExploreDispatcher.dispatch({
      type: ExploreActionTypes.FETCH_METAPATHS
    });
    MetaPathAPI.fetchMetaPaths();
  },

  receiveMetaPaths(metapaths){
    ExploreDispatcher.dispatch({
      type: ExploreActionTypes.RECEIVE_METAPATHS,
      payload: {metapaths: metapaths}
    });
  }

};

export default ExploreActions;

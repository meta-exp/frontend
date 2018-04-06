import ConfigActionTypes from './ConfigActionTypes';
import ConfigDispatcher from '../dispatchers/ConfigDispatcher';
import MetaPathAPI from '../utils/MetaPathAPI';

const ConfigActions = {

  fetchNodeTypes(){
    ConfigDispatcher.dispatch({
      type: ConfigActionTypes.FETCH_NODE_TYPES
    });
    MetaPathAPI.fetchNodeTypes();
  },

  fetchEdgeTypes(){
    ConfigDispatcher.dispatch({
      type: ConfigActionTypes.FETCH_EDGE_TYPES
    });
    MetaPathAPI.fetchEdgeTypes();
  },

  receiveNodeTypes(nodeTypes){
    ConfigDispatcher.dispatch({
      type: ConfigActionTypes.RECEIVE_NODE_TYPES,
      payload: {nodeTypes: nodeTypes}
    });
  },

  receiveEdgeTypes(edgeTypes){
    ConfigDispatcher.dispatch({
      type: ConfigActionTypes.RECEIVE_EDGE_TYPES,
      payload: {edgeTypes: edgeTypes}
    });
  }

};

export default ConfigActions;

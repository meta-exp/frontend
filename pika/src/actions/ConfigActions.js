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
  },

  sendNodeTypes(nodeTypes){
    ConfigDispatcher.dispatch({
      type: ConfigActionTypes.SEND_NODE_TYPES,
      payload: {nodeTypes: nodeTypes}
    });
    MetaPathAPI.sendNodeTypes(nodeTypes);
  },

  sendEdgeTypes(edgeTypes){
    ConfigDispatcher.dispatch({
      type: ConfigActionTypes.SEND_EDGE_TYPES,
      payload: {edgeTypes: edgeTypes}
    });
    MetaPathAPI.sendEdgeTypes(edgeTypes);
  },

  changeNodeTypeState(index){
    ConfigDispatcher.dispatch({
      type: ConfigActionTypes.CHANGE_NODE_TYPE_STATE,
      payload: {nodeIndex: index}
    });
  },

  changeEdgeTypeState(index){
    ConfigDispatcher.dispatch({
      type: ConfigActionTypes.CHANGE_EDGE_TYPE_STATE,
      payload: {edgeIndex: index}
    });
  }

};

export default ConfigActions;

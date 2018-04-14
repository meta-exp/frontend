import NodePropertyActionTypes from './NodePropertyActionTypes';
import SetupDispatcher from '../dispatchers/SetupDispatcher';

const NodePropertyActions = {
    updateNodeProperties(nodeProperties){
        SetupDispatcher.dispatch({
            type: NodePropertyActionTypes.UPDATE_NODE_PROPS,
            payload: {
                nodeProperties: nodeProperties
            }
        });
    }
};

export default NodePropertyActions;
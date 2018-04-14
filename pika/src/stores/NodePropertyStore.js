import { EventEmitter } from "events";
import SetupDispatcher from '../dispatchers/SetupDispatcher';
import NodePropertyActionTypes from '../actions/NodePropertyActionTypes';

class NodePropertyStore extends EventEmitter {

    constructor(){
        super();
        this.nodeProps = null;
    }

    getNodeProperties(){
        return this.nodeProps;
    }

    setNodeProperties(nodeProps){
        this.nodeProps = nodeProps;
        this.emit("change");
    }

    handleActions(action){
        switch(action.type){
            case NodePropertyActionTypes.UPDATE_NODE_PROPS: {
                this.setNodeProperties(action.payload.nodeProperties);
                return this.nodeProps;
            }
        }
    }

}

const nodePropertyStore = new NodePropertyStore ;
SetupDispatcher.register(nodePropertyStore.handleActions.bind(nodePropertyStore));

export default nodePropertyStore;
import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import NodePropertyStore from '../../stores/NodePropertyStore';

class NodeProperties extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentProperties: null,
        };
    }

    componentDidMount(){
        NodePropertyStore.on("change", this.getNodeProperties)
    }

    getNodeProperties = () => {
        this.setState({currentProperties: NodePropertyStore.getNodeProperties()});
    };

    componentWillUnmount(){
        NodePropertyStore.removeListener("change", this.getNodeProperties);
    }

    formPropString(propObject){
        let propText = "";
        for (let key in propObject) {
            if(propObject.hasOwnProperty(key)) {
                propText += key + ': ' + propObject[key] + ", ";
            }
        }
        return propText;
    }

    render() {
        if (!this.state.currentProperties) {
            return null;
        }
        let propText = this.formPropString(this.state.currentProperties);
        return (<div id="node-properties">
            <Segment> <b>Properties:</b> {propText} </Segment>
        </div>)
    }
}

export default NodeProperties;

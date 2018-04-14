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
        console.log(propObject);
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
        let propText = this.formPropString(this.state.currentProperties.propertyMap);
        return (<div id="node-properties">
            <Segment> <b>Properties:</b> {propText} </Segment>
        </div>)
    }
}

export default NodeProperties;

/*            <Table celled>
                <Table.Body>
                    {Object.keys(data).map((key, index) => (
                        <Table.Row key={index}>
                            <Table.Cell>{key}</Table.Cell>
                            <Table.Cell>{data[key]}</Table.Cell>
                        </Table.Row>))}
                </Table.Body>
            </Table>*/
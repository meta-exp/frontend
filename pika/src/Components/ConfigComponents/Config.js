import React, { Component } from 'react';
import SelectorList from './SelectorList';
import { Checkbox } from 'semantic-ui-react';

import ConfigStore from '../../stores/ConfigStore';
import ConfigActions from '../../actions/ConfigActions';

class Config extends Component {

  constructor(props){
    super(props);

    this.getEntityTypes = this.getEntityTypes.bind(this);

    this.state = {
      node_types: ConfigStore.getNodeTypes(),
      edge_types: ConfigStore.getEdgeTypes(),
    }
  }

  componentWillMount(){
    ConfigActions.fetchEdgeTypes();
    ConfigActions.fetchNodeTypes();
  }

  componentDidMount(){
    ConfigStore.on("change", this.getEntityTypes);
  }

  componentWillUnmount(){
    ConfigStore.removeListener("change", this.getEntityTypes);
  }

  getEntityTypes(){
    this.setState({ 
      node_types: ConfigStore.getNodeTypes(),
      edge_types: ConfigStore.getEdgeTypes()
    });
  }

  changeSelection(index, stateKey, stateValue){
    var newState = {};
    newState[stateKey] = this.switchValue(index, stateValue.slice());
    this.setState(newState);
    this.saveToServer();
  }

  switchValue(index, list){
    list[index][1] = !list[index][1];
    return list;
  }

  render() {
    return (
      <div>
        <h1>Config</h1>
        <div className='row' style={{marginTop:30+'px'}}>
          <div className="col">
            <SelectorList
              item_names='Node type'
              items={this.state.node_types}
              onChange={(index) => {this.changeSelection(index, 'node_types', this.state.node_types)}} />
          </div>
          <div className="col">
            <SelectorList
              item_names='Edge type'
              items={this.state.edge_types}
              onChange={(index) => {this.changeSelection(index, 'edge_types', this.state.edge_types)}} />
          </div>
        </div>
      </div>
    );
  }

  saveToServer(){
    this.saveEdgeTypes();
    this.saveNodeTypes();
  }

  saveEdgeTypes(state) {
    this.postJsonToBackend('set-edge-types', this.state.edge_types);
  }

  saveNodeTypes(state) {
    this.postJsonToBackend('set-node-types', this.state.node_types);
  }

  postJsonToBackend(endpoint, data) {
      fetch('http://localhost:8000/' + endpoint, {
          method: 'POST',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
          credentials: "include"
      }).then((response) => {
          if (!(response.status === 200)) {
              console.log(response);
              console.log(response.json());
              alert('Could not send data to server.');
          }
      }).catch((error) => {
          console.error(error);
      });
  }

}

export default Config;

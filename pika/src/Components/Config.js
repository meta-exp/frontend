import React, { Component } from 'react';
import SelectorList from './ConfigComponents/SelectorList';
import { Checkbox } from 'semantic-ui-react';

class Config extends Component {

  constructor(props){
    super(props);
    this.state = {
      node_types: [],
      edge_types: [],
    }
    this.loadFromServer();
  }

  changeSelection(newState){
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
          <div className="col" style={{marginLeft:15+'px'}}>
            <SelectorList
              item_names='Node type'
              check_note='Include?'
              items={this.state.node_types}
              onChange={(index) => {this.changeSelection({nodeTypes: this.switchValue(index, this.state.node_types.slice())})}}/>
          </div>
          <div className="col" style={{marginRight:15+'px'}}>
            <SelectorList
              item_names='Edge type'
              check_note='Include?'
              items={this.state.edge_types}
              onChange={(index) => {this.changeSelection({edgeTypes: this.switchValue(index, this.state.edge_types.slice())})}}/>
          </div>
        </div>
      </div>
    );
  }

  /*
      Backend Interaction
  */

  loadFromServer(){
    this.loadEdgeTypes();
    this.loadNodeTypes();
  }

  saveToServer(){
    this.saveEdgeTypes();
    this.saveNodeTypes();
  }

  loadEdgeTypes() {
    this.getJsonFromBackend('get-edge-types', (fetched) => this.setState({edge_types: fetched}));
  }

  loadNodeTypes() {
    this.getJsonFromBackend('get-node-types', (fetched) => this.setState({node_types: fetched}));
  }

  saveEdgeTypes(state) {
    this.postJsonToBackend('set-edge-types', this.state.edge_types);
  }

  saveNodeTypes(state) {
    this.postJsonToBackend('set-node-types', this.state.node_types);
  }

  // TODO Move those methods into a utils package?
  getJsonFromBackend(endpoint, callback) {
      fetch('http://172.20.14.22:8000/' + endpoint, {
          method: 'GET',
          credentials: "include"
      }).then((response) => {
        console.log(response);
        return response.json();
      }
      ).then(callback).catch((error) => {
          console.error(error);
      });
  }

  postJsonToBackend(endpoint, data) {
      fetch('http://172.20.14.22:8000/' + endpoint, {
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

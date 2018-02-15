import React, { Component } from 'react';
import SelectorList from './ConfigComponents/SelectorList';
import { Checkbox } from 'semantic-ui-react';

class Config extends Component {

  constructor(props){
    super(props);
    this.state = {
      node_types: [['Merkur', true], ['Venus', true], ['Erde', false], ['Mars', true]],
      edge_types: [['ISS', true], ['MIR', false]],
    }
    this.loadFromServer()
  }

  setState(state){
    super.setState(state);
    this.saveToServer();
  }

  switchValue(index, list){
    list[index][1] = !list[index][1];
    return list
  }

  render() {
    return (
      <div>
        <h1>Config</h1>
        <h2>Welcome, it's so nice to have you here</h2>
        <div class='row' style={{marginTop:30+'px'}}>
          <div class="col" style={{marginLeft:15+'px'}}>
            <SelectorList
              item_names='Gurkenliste'
              check_note='Dabei oder nicht dabei?'
              items={this.state.node_types}
              onChange={(index) => {this.setState({nodeTypes: this.switchValue(index, this.state.node_types.slice())})}}/>
          </div>
          <div class="col" style={{marginRight:15+'px'}}>
            <SelectorList
              item_names='Zuchiniliste'
              check_note='Dabei oder nicht dabei?'
              items={this.state.edge_types}
              onChange={(index) => {this.setState({edgeTypes: this.switchValue(index, this.state.edge_types.slice())})}}/>
          </div>
        </div>
          <Checkbox toggle />
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

  saveEdgeTypes() {
    this.postJsonToBackend('set-edge-types', this.state.edgeTypes);
  }

  saveNodeTypes() {
    this.postJsonToBackend('set-node-types', this.state.nodeTypes);
  }

  // TODO Move those methods into a utils package?
  getJsonFromBackend(endpoint, callback) {
      fetch('http://localhost:8000/' + endpoint, {
          method: 'GET',
          credentials: "include"
      }).then((response) => {
        console.log(response);
        return response.json();
      }
      ).then(callback).catch((error) => {
          console.error(error);
      })
      ;
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
          if (!(response.status === 200)
          ) {
              console.log(response);
              console.log(response.json());
              alert('Could not send data to server.');
          }
      }).catch((error) => {
          console.error(error);
      })
      ;
  }

}

export default Config;

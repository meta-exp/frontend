import React, { Component } from 'react';
import SelectorList from './SelectorList';
import { Checkbox } from 'semantic-ui-react';

class Config extends Component {

  constructor(props){
    super(props);
    this.state = {
      node_types: [['Merkur', true], ['Venus', true], ['Erde', false], ['Mars', true]],
      edge_types: [['ISS', true], ['MIR', false]],
    }
  }

  setNodeTypes(node_types){
    this.state.node_types = node_types;
  }

  getNodeTypes(){
    return this.state.node_types.slice;
  }

  setEdgeTypes(edge_types){
    this.state.edge_types = edge_types;
  }

  getEdgeTypes(){
    return this.state.edge_types.slice;
  }

  switchValue(event, index, list){
    // alert('I sense a smell of change in list '+getter()+' at index '+index)
    // let list = getter();
    alert(list);
    list[index][1] = !list[index][1];
    event.target.checked = list[index][1];
    // setter(list);
    alert(this.state.node_types);
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
              onChange={(index) => {this.state.node_types[index][1] = !this.state.node_types[index][1]}}/>
          </div>
          <div class="col" style={{marginRight:15+'px'}}>
            <SelectorList
              item_names='Zuchiniliste'
              check_note='Dabei oder nicht dabei?'
              items={this.state.edge_types}
              onChange={(index) => {this.state.edge_types[index][1] = !this.state.edge_types[index][1]}}/>
          </div>
        </div>
          <Checkbox toggle />
      </div>
    );
  }

  /*
      Backend Interaction
  */

  loadEdgeTypes() {
    this.getJsonFromBackend('get-edge-types', (edge_types) => this.setEdgeTypes(edge_types));
  }

  loadNodeTypes() {
    this.getJsonFromBackend('get-node-types', (node_types) => this.setNodeTypes(node_types));
  }

  saveEdgeTypes() {
    this.postJsonToBackend('set-edge-types', this.getEdgeTypes());
  }

  saveNodeTypes() {
    this.postJsonToBackend('set-node-types', this.getNodeTypes());
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
